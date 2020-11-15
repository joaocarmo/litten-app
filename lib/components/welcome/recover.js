/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import RegisterLoginTemplate from 'templates/register-login'
import FormRecover from 'forms/recover'
import { UI_SCREEN_NOAUTH_CTA_HEIGHT } from 'utils/constants'
import { translate } from 'utils/i18n'

const Recover: (args: any) => React$Node = () => {
  return (
    <RegisterLoginTemplate
      header={translate('welcome.screens.headers.recover')}
      footer={<View style={styles.placeholderFooter} />}>
      <FormRecover />
    </RegisterLoginTemplate>
  )
}

const styles = StyleSheet.create({
  placeholderFooter: {
    height: UI_SCREEN_NOAUTH_CTA_HEIGHT * 2,
  },
})

export default Recover
