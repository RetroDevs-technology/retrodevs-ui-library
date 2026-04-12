import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils"

interface RichTextMessageProps {
  content: string
  className?: string
  isCurrentUser?: boolean
}

export function RichTextMessage({ content, className, isCurrentUser }: RichTextMessageProps) {
  return (
    <div className={cn("max-w-none", className)}>
      <ReactMarkdown
        components={{
          // Customize paragraph styling
          p: ({ children }) => (
            <p className="text-sm leading-relaxed break-words whitespace-pre-wrap m-0 last:mb-0">
              {children}
            </p>
          ),
          // Customize strong/bold text
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          // Customize emphasis/italic text
          em: ({ children }) => <em className="italic">{children}</em>,
          // Customize code blocks
          code: ({ className, children, ...props }) => {
            const isInline = !className
            return isInline ? (
              <code
                className={cn(
                  "px-1.5 py-0.5 rounded text-xs font-mono",
                  isCurrentUser
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-800",
                )}
                {...props}>
                {children}
              </code>
            ) : (
              <code
                className={cn(
                  "block p-2 rounded text-xs font-mono overflow-x-auto",
                  isCurrentUser
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-800",
                )}
                {...props}>
                {children}
              </code>
            )
          },
          // Customize links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "underline hover:opacity-80 transition-opacity",
                isCurrentUser ? "text-white" : "text-primary",
              )}>
              {children}
            </a>
          ),
          // Customize lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside my-1 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside my-1 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="text-sm">{children}</li>,
          // Customize blockquotes
          blockquote: ({ children }) => (
            <blockquote
              className={cn(
                "border-l-4 pl-3 my-2 italic",
                isCurrentUser ? "border-white/50" : "border-gray-400",
              )}>
              {children}
            </blockquote>
          ),
          // Customize headings
          h1: ({ children }) => (
            <h1 className="text-lg font-bold mb-1 mt-2 first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-bold mb-1 mt-2 first:mt-0">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold mb-1 mt-2 first:mt-0">{children}</h3>
          ),
          // Customize horizontal rule
          hr: () => (
            <hr
              className={cn(
                "my-2 border-t",
                isCurrentUser ? "border-white/30" : "border-gray-300",
              )}
            />
          ),
        }}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

