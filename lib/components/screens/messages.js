/**
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { UIDropdown, UIMessagePreview } from 'ui-elements'
import ScreenTemplate from 'templates/screen'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

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
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {translate('screens.messages.title')}
          </Text>
        </View>
      }>
      <ScrollView>
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
      </ScrollView>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  header: {
    width: vw(85),
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'flex-end',
    paddingBottom: 24,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  listContainer: {
    marginTop: 10,
  },
})

export default MessagesScreen
