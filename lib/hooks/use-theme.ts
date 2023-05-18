import { useCallback, useContext, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'
import { setTheme as setThemeAction } from '@store/actions/authenticated-user'
import type { ThemeConfig } from '@components/theme'
import { ThemeContext } from '@components/theme'
import * as commonStylesConfig from '@styles/common'
import type { ThemeFunction } from '@styles/types'
import type { ThemePreferences } from '@store/types'

const useTheme = () => {
  const themeConfig = useContext<ThemeConfig>(ThemeContext)

  const dispatch = useDispatch()

  const createStyles = useCallback(
    (themeFn: ThemeFunction) => {
      const style = themeFn({
        colors: themeConfig.theme.colors,
        isDark: themeConfig.isDark,
        typography: themeConfig.typography,
      })

      return StyleSheet.create(style)
    },
    [themeConfig.isDark, themeConfig.theme, themeConfig.typography],
  )

  const commonStyles = useMemo<commonStylesConfig.CommonStyles>(() => {
    const themedCommonStyles = {} as commonStylesConfig.CommonStyles

    for (const key in commonStylesConfig) {
      if (Object.prototype.hasOwnProperty.call(commonStylesConfig, key)) {
        const style = commonStylesConfig[key]
        themedCommonStyles[key] = createStyles(style)
      }
    }

    return themedCommonStyles
  }, [createStyles])

  const setTheme = useCallback(
    (theme: ThemePreferences) => {
      dispatch(setThemeAction(theme))
    },
    [dispatch],
  )

  return { ...themeConfig, commonStyles, createStyles, setTheme }
}

export default useTheme
