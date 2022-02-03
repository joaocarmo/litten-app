declare module '*.png' {
  const content: any // import('react-native').ImageSourcePropType
  export default content
}

declare module '*.svg' {
  const content: import('@ui-elements/types').IconTypeComponent
  export default content
}
