import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { UIButton } from 'ui-elements'

const buttonStories = storiesOf('Button', module)

buttonStories.add('primary button', () => <UIButton>Primary Button</UIButton>)

buttonStories.add('secondary button', () => (
  <UIButton secondary>Secondary Button</UIButton>
))
