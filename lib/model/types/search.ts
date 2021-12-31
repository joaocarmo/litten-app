import type { SearchFilters } from 'store/types'
import type { BasicUser } from 'model/types/user'

export interface SearchClass {
  homeFeed(): void
}

export interface SearchSettings {
  query?: string
  filters?: SearchFilters
  user?: BasicUser
}
