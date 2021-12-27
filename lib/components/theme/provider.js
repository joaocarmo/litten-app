/**
 * @format
 * @flow
 */

import { useMemo, type Node } from 'react'
import { useColorScheme } from 'react-native'
import { ThemeContext } from './'
import type { ThemeConfig } from './'
import colors from 'styles/colors'
import themes from 'styles/themes'
import typography from 'styles/typography'
import { debugLog } from 'utils/dev'

const ThemeProvider = ({ children }: { children: Node }): Node => {
  const scheme = useColorScheme()

  const theme = useMemo(
    (): ThemeConfig => ({
      colors,
      isDark: scheme === 'dark',
      scheme,
      theme: scheme ? themes[scheme] : themes.light,
      typography,
    }),
    [scheme],
  )

  debugLog('ThemeProvider:', theme.scheme, '| Dark:', theme.isDark)

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
