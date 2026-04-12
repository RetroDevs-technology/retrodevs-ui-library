import { Button } from "@/components/ui"
import { Input } from "@/components/ui"
import { BaseSelect } from "./base-select"
import { StickyNote, Search, Edit, Trash2, Save, X } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { formatDateTimeUTC } from "@/lib/utils"

type NoteCategory = "shipment" | "driver" | "customer" | "general"

interface Note {
  id: string
  content: string
  category: NoteCategory
  timestamp: string
  updatedAt?: string
}

const STORAGE_KEY = "admin-quick-notes"

const CATEGORY_OPTIONS = [
  { value: "shipment", label: "Shipment" },
  { value: "driver", label: "Driver" },
  { value: "customer", label: "Customer" },
  { value: "general", label: "General" },
]

const CATEGORY_COLORS = {
  shipment: "bg-blue-100 text-blue-800",
  driver: "bg-green-100 text-green-800",
  customer: "bg-purple-100 text-purple-800",
  general: "bg-gray-100 text-gray-800",
}

function loadNotesFromStorage(): Note[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored) as Note[]
  } catch (error) {
    console.error("Failed to load notes from localStorage:", error)
    return []
  }
}

function saveNotesToStorage(notes: Note[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch (error) {
    console.error("Failed to save notes to localStorage:", error)
  }
}

export function QuickNoteTaker() {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory>("general")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<NoteCategory | "all">("all")
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState("")

  // Load notes from localStorage on mount
  useEffect(() => {
    const loadedNotes = loadNotesFromStorage()
    setNotes(loadedNotes)
  }, [])

  // Filter and search notes
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesCategory = filterCategory === "all" || note.category === filterCategory
      const matchesSearch =
        searchQuery === "" || note.content.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [notes, filterCategory, searchQuery])

  const handleSaveNote = () => {
    if (!currentNote.trim()) return

    const newNote: Note = {
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: currentNote.trim(),
      category: selectedCategory,
      timestamp: new Date().toISOString(),
    }

    const updatedNotes = [newNote, ...notes]
    setNotes(updatedNotes)
    saveNotesToStorage(updatedNotes)
    setCurrentNote("")
    setSelectedCategory("general")
  }

  const handleEditNote = (note: Note) => {
    setEditingNoteId(note.id)
    setEditingContent(note.content)
  }

  const handleSaveEdit = () => {
    if (!editingNoteId || !editingContent.trim()) return

    const updatedNotes = notes.map((note) =>
      note.id === editingNoteId
        ? {
          ...note,
          content: editingContent.trim(),
          updatedAt: new Date().toISOString(),
        }
        : note,
    )

    setNotes(updatedNotes)
    saveNotesToStorage(updatedNotes)
    setEditingNoteId(null)
    setEditingContent("")
  }

  const handleCancelEdit = () => {
    setEditingNoteId(null)
    setEditingContent("")
  }

  const handleDeleteNote = (noteId: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return

    const updatedNotes = notes.filter((note) => note.id !== noteId)
    setNotes(updatedNotes)
    saveNotesToStorage(updatedNotes)
  }

  const formatTimestamp = (timestamp: string): string => {
    try {
      const date = new Date(timestamp)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)

      if (diffMins < 1) return "Just now"
      if (diffMins < 60) return `${diffMins} min ago`
      if (diffHours < 24) return `${diffHours} hr ago`
      if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
      return formatDateTimeUTC(date.toISOString())
    } catch {
      return timestamp
    }
  }

  return (
    <div className="flex flex-col h-full p-4 gap-4 overflow-y-auto overflow-x-hidden">
      <div className="flex items-center gap-2 mb-2 flex-shrink-0">
        <StickyNote className="w-5 h-5 text-primary flex-shrink-0" />
        <h3 className="font-semibold text-lg">Quick Note Taker</h3>
      </div>

      <div className="flex flex-col gap-4 min-w-0">
        {/* New Note Input */}
        <div className="flex flex-col gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg flex-shrink-0">
          <div className="flex flex-col gap-2">
            <label htmlFor="note-content" className="text-sm font-medium text-gray-700">
              New Note
            </label>
            <textarea
              id="note-content"
              placeholder="Write your note here..."
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              maxLength={5000}
            />
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{currentNote.length} / 5000 characters</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="note-category" className="text-sm font-medium text-gray-700">
              Category
            </label>
            <BaseSelect
              items={CATEGORY_OPTIONS}
              placeholder="Select category"
              value={selectedCategory}
              onChange={(value) => setSelectedCategory(value as NoteCategory)}
              className="w-full"
            />
          </div>

          <Button onClick={handleSaveNote} disabled={!currentNote.trim()} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Note
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <BaseSelect
            items={[{ value: "all", label: "All Categories" }, ...CATEGORY_OPTIONS]}
            placeholder="Filter by category"
            value={filterCategory}
            onChange={(value) => setFilterCategory(value as NoteCategory | "all")}
            className="w-full"
          />
        </div>

        {/* Notes List */}
        <div className="flex flex-col gap-3 flex-1 min-h-0">
          {filteredNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <StickyNote className="w-12 h-12 mb-3 text-gray-300" />
              <p className="font-medium text-gray-600 mb-1">
                {notes.length === 0 ? "No notes yet" : "No notes match your search"}
              </p>
              <p className="text-sm text-gray-400 text-center">
                {notes.length === 0
                  ? "Create your first note above"
                  : "Try adjusting your search or filter"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  {editingNoteId === note.id ? (
                    <div className="flex flex-col gap-3">
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full min-h-[80px] p-2 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        maxLength={5000}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          disabled={!editingContent.trim()}
                          className="flex-1">
                          <Save className="w-3 h-3 mr-1" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                          className="flex-1">
                          <X className="w-3 h-3 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${CATEGORY_COLORS[note.category]}`}>
                            {CATEGORY_OPTIONS.find((opt) => opt.value === note.category)?.label ||
                              note.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(note.timestamp)}
                            {note.updatedAt && " (edited)"}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditNote(note)}
                            className="h-7 w-7 p-0">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteNote(note.id)}
                            className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                        {note.content}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

