import { Pressable, StyleSheet, View } from 'react-native'
import type { ViewProps } from 'react-native'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { UIText } from '@ui-elements'
import { useTheme } from '@hooks'
import type { StackNavigationProp } from '@react-navigation/stack'
import type { Tab } from '@templates/types'
import type { TabularStackParamList } from '@utils/types/routes'
import screenTabularNavStyles from '@templates/screen/tabular-nav.styles'

export type ScreenTabularNavProps = {
  tabs?: Tab[]
  style?: ViewProps['style']
}

export type ScreenTabularNavNavigationProp =
  StackNavigationProp<TabularStackParamList>

const ScreenTabularNav = ({ tabs, style }: ScreenTabularNavProps) => {
  const navigation = useNavigation<ScreenTabularNavNavigationProp>()
  const { createStyles } = useTheme()

  const styles = createStyles(screenTabularNavStyles)

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
            }
          >
            <UIText noPadding style={styles.text}>
              {title}
            </UIText>
          </Pressable>
        ))}
    </View>
  )
}

ScreenTabularNav.defaultProps = {
  tabs: [],
  style: null,
}

export default ScreenTabularNav
