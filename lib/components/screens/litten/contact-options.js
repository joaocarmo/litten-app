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
  user,
  authenticatedUserUid,
  ...otherProps
}) => {
  const { id: userUid, displayName } = user.toJSON()

  const handleContact = (contactOption) => console.log(contactOption)

  const renderContactOptions = () => {
    if (!litten.contactPreferences.length) {
      return (
        <UIBaloon type="info" style={styles.contactOptionsEmpty}>
          {translate('screens.littenPost.emptyContactOptions', {
            name: displayName,
          })}
        </UIBaloon>
      )
    }

    if (userUid === authenticatedUserUid) {
      return (
        <UIBaloon type="info" style={styles.contactOptionsEmpty}>
          {translate('screens.littenPost.selfContactOptions', {
            name: displayName,
          })}
        </UIBaloon>
      )
    }

    return litten.contactPreferences.map((contactOption) => {
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
      <UIHeader numberOfLines={1} subheader>
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
    marginBottom: 14,
  },
  contactOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 22,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: colors.white,
  },
  contactOptionsEmpty: {
    marginTop: 14,
  },
})
