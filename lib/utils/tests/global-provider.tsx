import ThemeProvider from '@components/theme/provider'

const GlobalProvider = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

export default GlobalProvider
