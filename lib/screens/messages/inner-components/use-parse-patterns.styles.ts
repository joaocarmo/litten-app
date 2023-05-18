import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  link: {
    fontWeight: typography.fontWeight.light,
    color: colors.secondary,
    textDecorationLine: 'underline',
  },
  clickable: {
    fontWeight: typography.fontWeight.light,
    color: colors.secondary,
    textDecorationLine: 'none',
  },
})

export default styles
