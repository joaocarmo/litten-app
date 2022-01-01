import { StyleSheet, View } from 'react-native'
import Bullet from '@components/carousel/bullet'
import { iterateTimes } from '@utils/functions'

const Bullets = ({
  activeInterval,
  bulletStyle,
  intervals,
  style,
  ...otherProps
}) => (
  <View style={StyleSheet.compose(styles.bullets, style)}>
    {iterateTimes(intervals).map((n) => (
      <Bullet
        key={n}
        active={activeInterval === n}
        style={bulletStyle}
        {...otherProps}
      />
    ))}
  </View>
)

const styles = StyleSheet.create({
  bullets: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 10,
    marginBottom: 5,
  },
})
export default Bullets
