/**
 * @format
 * @flow
 */

import { useCallback, useContext, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { ThemeContext, type ThemeConfig } from 'components/theme'
import * as commonStylesConfig from 'styles/common'
import type { Theme } from 'styles/themes'
import type { Typography } from 'styles/typography'

type CreateStylesFn = (
  theme: Theme,
  typography: Typography,
  isDark: boolean,
) => any
type UseTheme =
  | ThemeConfig
  | {
      createStyles: (fn: CreateStylesFn) => typeof StyleSheet.create,
    }

const useTheme = (): UseTheme => {
  const themeConfig: ThemeConfig = useContext<ThemeConfig>(ThemeContext)

  const createStyles = useCallback(
    (fn: CreateStylesFn) =>
      StyleSheet.create(
        fn(themeConfig.theme, themeConfig.typography, themeConfig.isDark),
      ),
    [themeConfig.isDark, themeConfig.theme, themeConfig.typography],
  )

  const commonStyles = useMemo(() => {
    const themedCommonStyles = {}

    for (const key in commonStylesConfig) {
      if (commonStylesConfig.hasOwnProperty(key)) {
        const style = commonStylesConfig[key]
        themedCommonStyles[key] = createStyles(style)
      }
    }

    return themedCommonStyles
  }, [createStyles])

  return { ...themeConfig, createStyles, commonStyles }
}

export default useTheme
