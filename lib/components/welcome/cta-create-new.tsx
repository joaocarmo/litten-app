import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { UILink, UIText } from '@ui-elements'
import { translate } from '@utils/i18n'
import { Routes, UI_SCREEN_NOAUTH_CTA_HEIGHT } from '@utils/constants'
import { CreateNewCTANavigationProp } from '@utils/types/routes'

const CreateNewCTA = () => {
  const navigation = useNavigation<CreateNewCTANavigationProp>()

  return (
    <View style={styles.cta}>
      <UIText noPadding>{`${translate('welcome.newAccount')} `}</UIText>
      <UILink
        onPress={() => navigation.navigate(Routes.SCREEN_NOAUTH_REGISTER)}
      >
        {translate('cta.signUp')}
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

export default CreateNewCTA
