import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../src/components/core/pagination"
import { useFixtureSelect } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function PaginationShowcase() {
  const [activePage] = useFixtureSelect("paginationActivePage", {
    options: ["1", "2", "3", "4"],
    defaultValue: "2",
  })
  const current = Number.parseInt(activePage, 10) || 2

  return (
    <FixtureWrapper title="Pagination">
      <p className="text-sm text-muted-foreground mb-4 max-w-lg">
        Fixture panel sets which page number is active (1–4). Ellipsis previews a longer sequence.
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
          </PaginationItem>
          {[1, 2, 3, 4].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink href="#" isActive={page === current} onClick={(e) => e.preventDefault()}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </FixtureWrapper>
  )
}
