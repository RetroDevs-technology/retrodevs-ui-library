/**
 * Minimal search result shape for presentational components.
 * Apps can extend with extra fields; use `render*` props for domain mapping.
 */
export interface SearchResultLike {
  type: string
  title: string
  description: string
  metadata?: {
    status?: string
    trackingNumber?: string
    poNumber?: string
    [key: string]: unknown
  }
}
