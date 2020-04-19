/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { vh, vw } from 'react-native-expo-viewport-units'
import Carousel from 'components/carousel'
import { welcomeStepOne, welcomeStepTwo, welcomeStepThree } from 'images'

const messages = {
  stepOne: {
    header: 'Welcome to the litten app',
    footer: 'A space when you can find your best friend',
  },
  stepTwo: {
    header: 'Find and adopt an animal',
    footer: 'For adoption, mating, add pet at any moment',
  },
  stepThree: {
    header: 'Choose an animal to mate',
    footer: 'For adoption, mating, add pet at any moment.',
  },
}

const Intro: () => React$Node = () => (
  <View style={styles.intro}>
    <Carousel
      items={[
        {
          key: 'step-one',
          item: (
            <View style={styles.item}>
              <Text style={styles.textHeader}>{messages.stepOne.header}</Text>
              <Image
                source={welcomeStepOne}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.textFooter}>{messages.stepOne.footer}</Text>
            </View>
          ),
        },
        {
          key: 'step-two',
          item: (
            <View style={styles.item}>
              <Text style={styles.textHeader}>{messages.stepTwo.header}</Text>
              <Image
                source={welcomeStepTwo}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.textFooter}>{messages.stepTwo.footer}</Text>
            </View>
          ),
        },
        {
          key: 'step-three',
          item: (
            <View style={styles.item}>
              <Text style={styles.textHeader}>{messages.stepThree.header}</Text>
              <Image
                source={welcomeStepThree}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.textFooter}>{messages.stepThree.footer}</Text>
            </View>
          ),
        },
      ]}
      style={styles.carousel}
    />
  </View>
)

const styles = StyleSheet.create({
  intro: {
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  carousel: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    height: '100%',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    alignSelf: 'flex-end',
    maxHeight: 350,
    maxWidth: vw(90),
    marginTop: 20,
    marginBottom: 20,
  },
})

export default Intro
