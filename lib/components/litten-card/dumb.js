/**
 * @format
 * @flow
 */

import { useMemo, useRef } from 'react'
import { HeartFill, HeartOutline } from 'images/components/icons'
import LittenCardComponent from 'components/litten-card/card-component'
import Litten from 'model/litten'
import { debugLog } from 'utils/dev'

const LittenDumbCard: (args: any) => React$Node = ({
  editable = false,
  handleOnPressAction,
  isFavourite = false,
  item: { distance = 0, user = {}, ...littenProp },
}) => {
  const FavIconComponent = useMemo(
    () => (isFavourite ? HeartFill : HeartOutline),
    [isFavourite],
  )
  const litten = useRef(
    littenProp instanceof Litten ? littenProp : new Litten(littenProp),
  ).current

  debugLog('LittenDumbCard', litten.id)

  return (
    <LittenCardComponent
      distance={distance}
      editable={editable}
      FavIconComponent={FavIconComponent}
      handleOnPressAction={handleOnPressAction}
      litten={litten}
      user={user}
    />
  )
}

export default LittenDumbCard
