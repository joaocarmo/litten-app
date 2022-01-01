import { Pressable } from 'react-native'
import { useTheme } from '@hooks'
import { Plus as PlusIcon } from '@images/components/icons'
import {
  MAX_NUM_OF_REPORT_IMAGES,
  UI_ELEMENT_BORDER_RADIUS,
  UI_ICON_SIZE_MINI,
  USER_AVATAR_SIZE_MEDIUM,
} from '@utils/constants'

const FLEX_BASIS = (0.95 * (1 / MAX_NUM_OF_REPORT_IMAGES) * 100).toFixed(1)

const PlaceholderComponent = (props) => {
  const {
    createStyles,
    theme: { colors },
  } = useTheme()
  const styles = createStyles((theme) => ({
    reportImageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: USER_AVATAR_SIZE_MEDIUM,
      flexBasis: `${FLEX_BASIS}%`,
      aspectRatio: 1,
      borderRadius: UI_ELEMENT_BORDER_RADIUS,
      backgroundColor: theme.colors.background,
      overflow: 'hidden',
    },
  }))
  return (
    <Pressable style={styles.reportImageContainer} {...props}>
      <PlusIcon
        height={UI_ICON_SIZE_MINI}
        width={UI_ICON_SIZE_MINI}
        fill={colors.secondary}
      />
    </Pressable>
  )
}

export default PlaceholderComponent
