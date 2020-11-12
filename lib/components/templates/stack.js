/**
 * @format
 * @flow
 */

import ScreenTemplate from './screen'
import ScreenSimpleHeaderTemplate from './screen-simple-header'

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
