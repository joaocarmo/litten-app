import { useCallback, useContext, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'
import { setTheme as setThemeAction } from '@store/actions/authenticated-user'
import type { ThemeConfig } from '@components/theme'
import { ThemeContext } from '@components/theme'
import * as commonStylesConfig from '@styles/common'
import type { Theme } from '@styles/themes'
import type { Typography } from '@styles/typography'

type CreateStylesFn = (
  theme: Theme,
  typography: Typography,
  isDark: boolean,
) => Record<string, unknown>

type UseTheme = ThemeConfig & {
  commonStyles: commonStylesConfig.CommonStyles
  createStyles: (fn: CreateStylesFn) => any
  setTheme: (theme: string) => void
}

const useTheme = (): UseTheme => {
  const themeConfig: ThemeConfig = useContext<ThemeConfig>(ThemeContext)

  const dispatch = useDispatch()

  const createStyles = useCallback(
    (fn: CreateStylesFn) =>
      StyleSheet.create(
        fn(themeConfig.theme, themeConfig.typography, themeConfig.isDark),
      ),
    [themeConfig.isDark, themeConfig.theme, themeConfig.typography],
  )

  const commonStyles: commonStylesConfig.CommonStyles = useMemo(() => {
    const themedCommonStyles = {}

    for (const key in commonStylesConfig) {
      if (Object.prototype.hasOwnProperty.call(commonStylesConfig, key)) {
        const style = commonStylesConfig[key]
        themedCommonStyles[key] = createStyles(style)
      }
    }

    return themedCommonStyles
  }, [createStyles])

  const setTheme = useCallback(
    (theme: string) => {
      dispatch(setThemeAction(theme))
    },
    [dispatch],
  )

  return { ...themeConfig, commonStyles, createStyles, setTheme }
}

export default useTheme
