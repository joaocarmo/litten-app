import { StyleSheet } from 'react-native'
import { UI_DROPDOWN_MARGIN } from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  uiDropdownContainer: {
    flexDirection: 'row',
    marginTop: UI_DROPDOWN_MARGIN,
    marginBottom: UI_DROPDOWN_MARGIN,
  },
  uiDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
  selectedValueText: {
    fontWeight: typography.fontWeight.bolder,
    color: colors.secondary,
  },
  iconChevron: {
    transform: [
      {
        rotateZ: '90deg',
      },
    ],
  },
  optionsContainer: {
    padding: 10,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.neutral,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    backgroundColor: colors.background,
  },
  optionWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 64,
  },
  optionText: {
    padding: 2,
    fontWeight: typography.fontWeight.light,
    color: colors.neutralDark,
  },
  optionsTextActive: {
    color: colors.secondary,
  },
  optionsTextDisabled: {
    color: colors.neutral,
  },
  anchorStyle: {
    backgroundColor: 'transparent',
  },
})

export default styles
