/**
 * @format
 * @flow
 */

import { Pressable, StyleSheet, View } from 'react-native'
import { UIBaloon, UIHeader, UIIcon, UIModal, UIText } from 'ui-elements'
import { contactOptions } from 'utils/litten'
import { translate } from 'utils/i18n'
import { getFromListByKey } from 'utils/functions'
import { veryElevated as veryElevatedStyle } from 'styles/common'
import colors from 'styles/colors'

const LittenContactOptions: (args: any) => React$Node = ({
  litten,
  user: { displayName, contactPreferences = [] },
  ...otherProps
}) => {
  const handleContact = (contactOption) => console.log(contactOption)

  const renderContactOptions = () => {
    if (!contactPreferences.length) {
      return (
        <UIBaloon type="info" style={styles.contactOptionsEmpty}>
          {translate('screens.littenPost.emptyContactOptions', {
            name: displayName,
          })}
        </UIBaloon>
      )
    }

    return contactPreferences.map((contactOption) => {
      const { key, label, icon } = getFromListByKey(
        contactOptions,
        contactOption,
      )

      return (
        <Pressable
          onPress={() => handleContact(contactOption)}
          style={[veryElevatedStyle, styles.contactOptionContainer]}
          key={key}>
          <UIText noPadding>{label}</UIText>
          <UIIcon icon={icon} circle selected />
        </Pressable>
      )
    })
  }

  return (
    <UIModal {...otherProps}>
      <UIHeader subheader>
        {translate('screens.littenPost.contactOptionsHeader', {
          name: displayName,
        })}
      </UIHeader>
      <View style={styles.contactOptionsContainer}>
        {renderContactOptions()}
      </View>
    </UIModal>
  )
}

export default LittenContactOptions

const styles = StyleSheet.create({
  contactOptionsContainer: {
    justifyContent: 'center',
  },
  contactOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 22,
    borderRadius: 12,
    marginTop: 7,
    marginBottom: 7,
    backgroundColor: colors.white,
  },
  contactOptionsEmpty: {
    marginTop: 14,
  },
})
