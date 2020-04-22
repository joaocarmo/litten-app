/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import Carousel from 'components/carousel'
import IntroCarouselItemTemplate from 'templates/intro-carousel-item'
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
            <IntroCarouselItemTemplate
              header={messages.stepOne.header}
              image={welcomeStepOne}
              footer={messages.stepOne.footer}
            />
          ),
        },
        {
          key: 'step-two',
          item: (
            <IntroCarouselItemTemplate
              header={messages.stepTwo.header}
              image={welcomeStepTwo}
              footer={messages.stepTwo.footer}
            />
          ),
        },
        {
          key: 'step-three',
          item: (
            <IntroCarouselItemTemplate
              header={messages.stepThree.header}
              image={welcomeStepThree}
              footer={messages.stepThree.footer}
            />
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
  carousel: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    height: '100%',
    overflow: 'hidden',
  },
})

export default Intro
