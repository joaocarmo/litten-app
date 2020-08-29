/**
 * @format
 * @flow
 */

import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { vh, vw } from 'react-native-expo-viewport-units'

const IntroCarouselItemTemplate: (args: any) => React$Node = ({
  header,
  image,
  footer,
}) => (
  <View style={styles.item}>
    <Text style={styles.textHeader}>{header}</Text>
    <Image source={image} style={styles.image} resizeMode="contain" />
    <Text style={styles.textFooter}>{footer}</Text>
  </View>
)

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: vh(50),
    width: vw(90),
  },
  textHeader: {
    width: 210,
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
    padding: 10,
  },
  textFooter: {
    width: 210,
    fontSize: 14,
    fontWeight: '200',
    textAlign: 'center',
    padding: 10,
  },
  image: {
    flex: 1,
    alignSelf: 'flex-end',
    maxHeight: vh(35),
    maxWidth: vw(90),
    marginTop: 20,
    marginBottom: 20,
  },
})

export default IntroCarouselItemTemplate
