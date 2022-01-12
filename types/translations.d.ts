declare module '@translations' {
  type RecursiveRecord<T> = T | Record<string, T>
  export const en: RecursiveRecord<Record<string, string>>
  export const pt: RecursiveRecord<Record<string, string>>
}
