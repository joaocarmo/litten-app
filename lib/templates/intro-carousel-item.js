/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { UIImage } from 'ui-elements'
import { vh, vw } from 'react-native-expo-viewport-units'
import { fontSize, fontWeight } from 'styles/typography'

const IntroCarouselItemTemplate: (args: any) => Node = ({
  header,
  image,
  footer,
}) => (
  <View style={styles.item}>
    <Text style={styles.textHeader}>{header}</Text>
    <UIImage source={image} style={styles.image} />
    <Text style={styles.textFooter}>{footer}</Text>
  </View>
)

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: vh(50),
    width: vw(90),
  },
  textHeader: {
    width: 210,
    fontSize: fontSize.xxxxlarge,
    fontWeight: fontWeight.light,
    textAlign: 'center',
    padding: 10,
  },
  textFooter: {
    width: 210,
    fontSize: fontSize.base,
    fontWeight: fontWeight.lighter,
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

export default IntroCarouselItemTemplate
