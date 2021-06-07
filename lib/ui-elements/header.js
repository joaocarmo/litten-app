/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from 'styles/colors'
import { fontSize, fontWeight } from 'styles/typography'

const UIHeader: (args: any) => Node = ({
  centered = false,
  children,
  style,
  subheader = false,
  thin = false,
  ...otherProps
}) =>
  children ? (
    <Text
      {...otherProps}
      style={[
        StyleSheet.compose(styles.uiHeader, style),
        centered ? styles.uiHeaderCentered : undefined,
        subheader ? styles.uiSubHeader : undefined,
        thin ? styles.uiHeaderThin : undefined,
      ]}>
      {children}
    </Text>
  ) : null

const styles = StyleSheet.create({
  uiHeader: {
    fontSize: fontSize.xxxxlarge,
    fontWeight: fontWeight.bolder,
    color: colors.black,
    paddingTop: 2,
    paddingBottom: 2,
    marginTop: 2,
    marginBottom: 2,
  },
  uiHeaderThin: {
    fontWeight: fontWeight.lighter,
  },
  uiSubHeader: {
    fontSize: fontSize.large,
  },
  uiHeaderCentered: {
    textAlign: 'center',
  },
})

export default UIHeader
