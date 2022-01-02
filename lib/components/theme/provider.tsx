import { useMemo } from 'react'
import type { FC, ReactNode } from 'react'
import { useColorScheme } from 'react-native'
import { useSelector } from 'react-redux'
import { userPreferencesSelector } from '@store/selectors'
import { ThemeContext } from '@components/theme'
import type { ThemeConfig } from '@components/theme'
import colors from '@styles/colors'
import themes from '@styles/themes'
import typography from '@styles/typography'
import { THEME_DARK, THEME_SYSTEM } from '@utils/constants'
import { debugLog } from '@utils/dev'

const ThemeProvider = ({ children }: { children: ReactNode }): FC => {
  const systemScheme = useColorScheme()
  const { theme: userScheme = THEME_SYSTEM } = useSelector(
    userPreferencesSelector,
  )

  const scheme = useMemo(() => {
    if (!userScheme || userScheme === THEME_SYSTEM) {
      return systemScheme
    }

    return userScheme
  }, [systemScheme, userScheme])

  const theme = useMemo(
    (): ThemeConfig => ({
      colors,
      isDark: scheme === THEME_DARK,
      scheme,
      theme: scheme ? themes[scheme] : themes.light,
      typography,
      userScheme,
    }),
    [scheme, userScheme],
  )

  debugLog('ThemeProvider:', theme.scheme, '| Dark:', theme.isDark)

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
