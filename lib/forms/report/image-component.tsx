import { Pressable } from 'react-native'
import { useTheme } from '@hooks'
import { UIImage } from '@ui-elements'
import imageComponentStyles from '@forms/report/image-component.styles'

const ImageComponent = ({ source, ...otherProps }) => {
  const { createStyles } = useTheme()

  const styles = createStyles(imageComponentStyles)

  return (
    <Pressable style={styles.reportImageContainer} {...otherProps}>
      <UIImage source={source} style={styles.reportImage} />
    </Pressable>
  )
}

export default ImageComponent
