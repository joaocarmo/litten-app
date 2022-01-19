declare module '@data' {
  type Country = {
    name: {
      common: string
      official: string
      native: {
        [key: string]: {
          official: string
          common: string
        }
      }
    }
    cca2: string
  }

  type Countries = Country[]

  const countries: Countries

  export { countries }
}
