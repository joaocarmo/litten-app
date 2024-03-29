import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { UILink, UIText } from '@ui-elements'
import { translate } from '@utils/i18n'
import { Routes, UI_SCREEN_NOAUTH_CTA_HEIGHT } from '@utils/constants'
import { SignInCTANavigationProp } from '@utils/types/routes'

const SignInCTA = () => {
  const navigation = useNavigation<SignInCTANavigationProp>()
  return (
    <View style={styles.cta}>
      <UIText noPadding>{`${translate('welcome.hasAccount')} `}</UIText>
      <UILink onPress={() => navigation.navigate(Routes.SCREEN_NOAUTH_LOGIN)}>
        {translate('cta.signIn')}
      </UILink>
    </View>
  )
}

const styles = StyleSheet.create({
  cta: {
    height: UI_SCREEN_NOAUTH_CTA_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: UI_SCREEN_NOAUTH_CTA_HEIGHT,
  },
})

export default SignInCTA
