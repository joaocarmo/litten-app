import { STRUCTURE_TEMPLATE_SCREEN_PADDING } from '@utils/constants'

const styles = (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutralLight,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2 * STRUCTURE_TEMPLATE_SCREEN_PADDING,
    paddingRight: 2 * STRUCTURE_TEMPLATE_SCREEN_PADDING,
  },
  centeredText: {
    textAlign: 'center',
  },
})

export default styles
