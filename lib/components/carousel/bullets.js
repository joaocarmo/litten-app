/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import { iterateTimes } from 'utils/functions'
import colors from 'styles/colors'

const bulletSize = 6
const bulletSizeBig = bulletSize + 2

const Bullet: (args: any) => React$Node = ({
  active = false,
  contrast = false,
  style,
}) => (
  <View
    style={[
      StyleSheet.compose(styles.bullet, style),
      active ? styles.bulletActive : styles.bulletInactive,
      contrast ? styles.bulletContrast : undefined,
    ]}
  />
)

const Bullets: (args: any) => React$Node = ({
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
  bullet: {
    height: bulletSize,
    width: bulletSize,
    borderRadius: bulletSize / 2,
    marginHorizontal: 5,
    opacity: 0.5,
    backgroundColor: colors.black,
  },
  bulletActive: {
    opacity: 0.6,
  },
  bulletInactive: {
    opacity: 0.2,
  },
  bulletContrast: {
    height: bulletSizeBig,
    width: bulletSizeBig,
    borderRadius: bulletSizeBig / 2,
    borderColor: colors.white,
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
  },
})

export default Bullets
