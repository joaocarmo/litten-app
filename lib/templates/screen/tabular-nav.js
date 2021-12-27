/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { UIText } from 'ui-elements'
import { useTheme } from 'hooks'

const ScreenTabularNav: (args: any) => Node = ({ tabs = [], style = null }) => {
  const navigation = useNavigation()

  const { createStyles } = useTheme()

  const styles = createStyles((theme, typography) => ({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
    },
    tab: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.text,
    },
    text: {
      fontSize: typography.fontSize.small,
      fontWeight: typography.fontWeight.bolder,
    },
  }))

  const navIdx = useNavigationState((state) => state?.index)

  return (
    <View style={StyleSheet.compose(styles.container, style)}>
      {tabs &&
        tabs.map(({ key, name, title }, idx) => (
          <Pressable
            key={key}
            onPress={() => navigation.navigate(name)}
            style={
              navIdx === idx
                ? StyleSheet.compose(styles.tab, styles.activeTab)
                : styles.tab
            }>
            <UIText noPadding style={styles.text}>
              {title}
            </UIText>
          </Pressable>
        ))}
    </View>
  )
}

export default ScreenTabularNav
