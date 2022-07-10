import { useRef } from 'react'
import LittenCardComponent from '@components/litten-card/card-component'
import Litten from '@model/litten'
import { debugLog } from '@utils/dev'

const LittenDumbCard = ({
  editable = false,
  onPressAction,
  isFavourite = false,
  item: { distance = 0, user, litten: littenProp = {} },
}) => {
  const litten = useRef(
    littenProp instanceof Litten ? littenProp : new Litten(littenProp),
  ).current

  debugLog('LittenDumbCard', litten.id)

  if (!user?.id) {
    return null
  }

  return (
    <LittenCardComponent
      distance={distance}
      editable={editable}
      isFavourite={isFavourite}
      litten={litten}
      onPressAction={onPressAction}
      user={user}
    />
  )
}

export default LittenDumbCard
