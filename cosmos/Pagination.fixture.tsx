import React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../src/components/core/pagination"
import { FixtureWrapper } from "./FixtureWrapper"

export default function PaginationShowcase() {
  return (
    <FixtureWrapper title="Pagination">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive onClick={(e) => e.preventDefault()}>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
              3
            </PaginationLink>
          </PaginationItem>
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
