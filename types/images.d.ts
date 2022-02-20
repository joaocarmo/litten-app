declare module '*.png' {
  const content: number
  export default content
}

declare module '*.svg' {
  const content: import('@ui-elements/types').IconTypeComponent
  export default content
}
