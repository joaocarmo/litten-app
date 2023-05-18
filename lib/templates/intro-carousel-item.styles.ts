import { vh, vw } from 'react-native-expo-viewport-units'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ typography }) => ({
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: vh(50),
    width: vw(90),
  },
  textHeader: {
    width: 210,
    fontSize: typography.fontSize.xxxxlarge,
    fontWeight: typography.fontWeight.light,
    textAlign: 'center',
    padding: 10,
  },
  textFooter: {
    width: 210,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.lighter,
    textAlign: 'center',
    padding: 10,
  },
  image: {
    flex: 1,
    alignSelf: 'flex-end',
    height: vh(35),
    width: vw(90),
    marginTop: 20,
    marginBottom: 20,
  },
})

export default styles
