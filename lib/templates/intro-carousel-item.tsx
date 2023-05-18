import { View } from 'react-native'
import { useTheme } from '@hooks'
import { UIImage, UIText } from '@ui-elements'
import introCarouselItemTemplateComponentStyles from '@templates/intro-carousel-item.styles'

const IntroCarouselItemTemplate = ({ header, image, footer }) => {
  const { createStyles } = useTheme()

  const styles = createStyles(introCarouselItemTemplateComponentStyles)

  return (
    <View style={styles.item}>
      <UIText noPadding style={styles.textHeader}>
        {header}
      </UIText>
      <UIImage source={image} style={styles.image} />
      <UIText noPadding style={styles.textFooter}>
        {footer}
      </UIText>
    </View>
  )
}

export default IntroCarouselItemTemplate
