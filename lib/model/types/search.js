/**
 * @format
 * @flow
 */

export interface SearchClass {
  homeFeed(): void;
}

export interface SearchSettings {
  query?: string;
  filters?: any;
  user?: any;
}
