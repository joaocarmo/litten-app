/**
 * @format
 * @flow
 */

import { useCallback, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { ThemeContext, type ThemeValue } from 'components/theme'
import type { Theme } from 'styles/themes'

type CreateStylesFn = (theme: Theme) => any
type UseTheme =
  | ThemeValue
  | {
      createStyles: (fn: CreateStylesFn) => typeof StyleSheet.create,
    }

const useTheme = (): UseTheme => {
  const themeValue: ThemeValue = useContext<ThemeValue>(ThemeContext)

  const createStyles = useCallback(
    (fn: CreateStylesFn) => StyleSheet.create(fn(themeValue.theme)),
    [themeValue.theme],
  )

  return { ...themeValue, createStyles }
}

export default useTheme
