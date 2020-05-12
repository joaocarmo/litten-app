/**
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { UIDropdown, UIMessagePreview } from 'ui-elements'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { translate } from 'utils/i18n'

const messageOptions = [
  {
    key: 'all',
    label: translate('screens.messages.options.all'),
    value: 'all',
  },
  {
    key: 'read',
    label: translate('screens.messages.options.read'),
    value: 'read',
  },
  {
    key: 'unread',
    label: translate('screens.messages.options.unread'),
    value: 'unread',
  },
]

const MessagesScreen: () => React$Node = () => {
  const [selectedValue, setSelectedValue] = useState('all')

  return (
    <ScreenTemplate
      header={
        <ScreenSimpleHeaderTemplate>
          {translate('screens.messages.title')}
        </ScreenSimpleHeaderTemplate>
      }>
      <View>
        <UIDropdown
          options={messageOptions}
          selectedValue={selectedValue}
          onSelect={setSelectedValue}
          placement="bottom"
        />
        <View style={styles.listContainer}>
          {[...Array(30)].map((val, idx) => (
            <UIMessagePreview
              key={idx}
              from="João Carmo"
              subject="Cat: Snowball"
              read={idx % 4}
              favourite={!(idx % 5)}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </UIMessagePreview>
          ))}
        </View>
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
  },
})

export default MessagesScreen
