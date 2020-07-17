import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { UIButton } from 'ui-elements'

storiesOf('Button', module).add('primary button', () => (
  <UIButton>Primary Button</UIButton>
))

storiesOf('Button', module).add('secondary button', () => (
  <UIButton secondary>Secondary Button</UIButton>
))
