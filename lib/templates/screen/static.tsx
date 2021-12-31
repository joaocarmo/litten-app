import { StyleSheet, View } from 'react-native'
import { useTheme } from 'hooks'
import ScreenTabularNav from 'templates/screen/tabular-nav'

const StaticScreenTemplate = ({ children, header, tabs, style }) => {
  const {
    commonStyles: { screenTemplateStyles },
  } = useTheme()
  return (
    <View style={screenTemplateStyles.contentView}>
      <View style={screenTemplateStyles.header}>{header}</View>
      <View style={screenTemplateStyles.topBar} />
      {tabs && (
        <ScreenTabularNav tabs={tabs} style={screenTemplateStyles.tabBar} />
      )}
      <View
        style={[
          screenTemplateStyles.contentCommon,
          styles.contentStatic,
          style,
        ]}
      >
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentStatic: {
    flex: 1,
  },
})
export default StaticScreenTemplate
