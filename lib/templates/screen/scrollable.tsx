import { ScrollView, View } from 'react-native'
import type { ViewProps } from 'react-native'
import { usePaddingBottom, useTheme } from '@hooks'
import ScreenTabularNav from '@templates/screen/tabular-nav'
import {
  STRUCTURE_TAB_NAV_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
} from '@utils/constants'
import type { Tab } from '@templates/types'

export type ScrollableScreenTemplateProps = {
  children: ViewProps['children']
  header?: ViewProps['children']
  showsVerticalScrollIndicator?: boolean
  tabs?: Tab[]
}

const ScrollableScreenTemplate = ({
  children,
  header,
  showsVerticalScrollIndicator,
  tabs,
}: ScrollableScreenTemplateProps) => {
  const withPaddingBottom = usePaddingBottom()
  const {
    createStyles,
    commonStyles: { screenTemplateStyles },
  } = useTheme()

  const styles = createStyles((theme) => ({
    containerStyle: {
      backgroundColor: theme.colors.neutralLight,
    },
    contentContainerStyle: {
      flexGrow: 1,
      borderTopLeftRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
      borderTopRightRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
    },
    contentIn: {
      flexGrow: 1,
      justifyContent: 'space-between',
      paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
    },
  }))

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.contentContainerStyle}
      style={styles.containerStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    >
      <View style={screenTemplateStyles.contentView}>
        <View style={screenTemplateStyles.header}>{header}</View>
        <View style={screenTemplateStyles.topBar} />
        {tabs && (
          <ScreenTabularNav tabs={tabs} style={screenTemplateStyles.tabBar} />
        )}
        <View
          style={[
            screenTemplateStyles.contentCommon,
            styles.contentIn,
            withPaddingBottom,
          ]}
        >
          {children}
        </View>
      </View>
    </ScrollView>
  )
}

ScrollableScreenTemplate.defaultProps = {
  header: null,
  showsVerticalScrollIndicator: false,
  tabs: null,
}

export default ScrollableScreenTemplate
