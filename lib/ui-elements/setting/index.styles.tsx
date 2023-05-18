import { StyleSheet } from 'react-native'
import { UI_ELEMENT_BORDER_MARGIN } from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  uiSettingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.neutral,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 12,
  },
  uiSettingText: {
    flex: 1,
    color: colors.text,
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.light,
  },
  uiSettingDescription: {
    marginTop: UI_ELEMENT_BORDER_MARGIN,
  },
})

export default styles
