import ScreenTemplate from '@templates/screen'
import ScreenSimpleHeaderTemplate from '@templates/screen-simple-header'

const StackTemplate = ({ header, children, ...otherProps }) => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {header}
      </ScreenSimpleHeaderTemplate>
    }
    {...otherProps}
  >
    {children}
  </ScreenTemplate>
)

export default StackTemplate
