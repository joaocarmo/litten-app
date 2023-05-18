import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  uiText: {
    color: colors.text,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.lighter,
  },
  uiTextSpacing: {
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: 8,
    marginBottom: 8,
  },
  uiTextBold: {
    fontWeight: typography.fontWeight.bolder,
  },
  uiTextCentered: {
    textAlign: 'center',
  },
  uiTextSmall: {
    fontSize: typography.fontSize.small,
  },
})

export default styles
