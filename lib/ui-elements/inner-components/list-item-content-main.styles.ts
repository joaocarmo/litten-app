import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  uiListItemContentMainContainer: {
    flex: 1,
  },
  uiListItemText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    color: colors.text,
  },
  uiListItemTextSelected: {
    color: colors.textAlt,
  },
  uiListItemTextPressed: {
    color: colors.secondary,
  },
  uiListItemCaption: {
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.lighter,
    paddingTop: 3,
    color: colors.text,
  },
  uiListItemPadding: {
    paddingBottom: 3,
  },
})

export default styles
