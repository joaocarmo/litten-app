import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import SelectLocationIndexScreen from 'screens/select-location/index'
import { translate } from 'utils/i18n'

const SelectLocationScreen = (props) => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {translate('screens.selectLocation.title')}
      </ScreenSimpleHeaderTemplate>
    }
    scrollable
  >
    <SelectLocationIndexScreen {...props} />
  </ScreenTemplate>
)

export default SelectLocationScreen
