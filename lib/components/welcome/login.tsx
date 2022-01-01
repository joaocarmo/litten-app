import RegisterLoginTemplate from '@templates/register-login'
import FormLogin from '@forms/login'
import { translate } from '@utils/i18n'
import CreateNewCTA from '@components/welcome/cta-create-new'

const Register = () => (
  <RegisterLoginTemplate
    header={translate('welcome.screens.headers.login')}
    footer={<CreateNewCTA />}
  >
    <FormLogin />
  </RegisterLoginTemplate>
)

export default Register
