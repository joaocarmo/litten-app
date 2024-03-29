import { useNavigation } from '@react-navigation/native'
import { UIButton } from '@ui-elements'
import SignInCTA from '@components/welcome/cta-sign-in'
import { translate } from '@utils/i18n'
import { Routes } from '@utils/constants'
import { ActionsNavigationProp } from '@utils/types/routes'

const Actions = () => {
  const navigation = useNavigation<ActionsNavigationProp>()

  return (
    <>
      <UIButton
        onPress={() => navigation.navigate(Routes.SCREEN_NOAUTH_REGISTER)}
      >
        {translate('cta.getStarted')}
      </UIButton>
      <SignInCTA />
    </>
  )
}

export default Actions
