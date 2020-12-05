/**
 * @format
 * @flow
 */

import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'

const StackTemplate: (args: any) => React$Node = ({
  header,
  children,
  ...otherProps
}) => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {header}
      </ScreenSimpleHeaderTemplate>
    }
    {...otherProps}>
    {children}
  </ScreenTemplate>
)

export default StackTemplate
