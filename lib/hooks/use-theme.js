/**
 * @format
 * @flow
 */

import { useCallback, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { ThemeContext, type ThemeConfig } from 'components/theme'
import * as commonStyles from 'styles/common'
import type { Theme } from 'styles/themes'
import type { Typography } from 'styles/typography'

type CreateStylesFn = (theme: Theme, typography: Typography) => any
type UseTheme =
  | ThemeConfig
  | {
      createStyles: (fn: CreateStylesFn) => typeof StyleSheet.create,
    }

const useTheme = (): UseTheme => {
  const themeConfig: ThemeConfig = useContext<ThemeConfig>(ThemeContext)

  const createStyles = useCallback(
    (fn: CreateStylesFn) =>
      StyleSheet.create(fn(themeConfig.theme, themeConfig.typography)),
    [themeConfig.theme, themeConfig.typography],
  )

  return { ...themeConfig, createStyles, commonStyles }
}

export default useTheme
