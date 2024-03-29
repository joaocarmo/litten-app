import { vh, vw } from 'react-native-expo-viewport-units'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: vh(32),
    width: vw(85),
    maxHeight: 180,
    maxWidth: 330,
    borderColor: colors.neutralLight,
    borderWidth: 2.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    margin: 5,
  },
  text: {
    color: colors.neutralDark,
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bolder,
    margin: 5,
    textAlign: 'center',
  },
  button: {
    width: vw(40),
    maxWidth: 140,
    minHeight: 32,
  },
  imageStyle: {
    maxHeight: vh(30),
    maxWidth: vh(30),
  },
})

export default styles
