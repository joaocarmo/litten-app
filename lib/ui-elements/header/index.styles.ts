import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  uiHeader: {
    fontSize: typography.fontSize.xxxxlarge,
    fontWeight: typography.fontWeight.bolder,
    color: colors.text,
    paddingTop: 2,
    paddingBottom: 2,
    marginTop: 2,
    marginBottom: 2,
  },
  uiHeaderThin: {
    fontWeight: typography.fontWeight.lighter,
  },
  uiSubHeader: {
    fontSize: typography.fontSize.large,
  },
  uiHeaderCentered: {
    textAlign: 'center',
  },
})

export default styles
