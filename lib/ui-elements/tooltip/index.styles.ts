import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  uiTooltipContainer: {
    position: 'absolute',
    top: 0,
    opacity: 0,
    zIndex: 1,
  },
  uiTooltip: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 16,
    backgroundColor: colors.secondaryLight,
  },
  uiTooltipPressed: {
    backgroundColor: colors.secondaryLighter,
  },
  uiTooltipText: {
    fontWeight: typography.fontWeight.bolder,
    color: colors.textAlt,
  },
})

export default styles
