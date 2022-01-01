import { Children } from 'react'
import { StyleSheet, View } from 'react-native'
import { UIContainer, UIHeader, UIImage, UIText } from '@ui-elements'
import { UI_EMPTY_PLACEHOLDER_IMAGE } from '@utils/constants'

const Empty = ({ children, header, imageSource }) => (
  <View style={styles.emptyPostsContainer}>
    <UIContainer style={styles.floatContainer}>
      {imageSource && (
        <UIImage source={imageSource} style={styles.placeholderImage} />
      )}
      {typeof header === 'string' && (
        <UIHeader style={styles.centeredText}>{header}</UIHeader>
      )}
      {Children.map(children, (child) =>
        typeof child === 'string' ? (
          <UIText style={styles.centeredText}>{child}</UIText>
        ) : (
          child
        ),
      )}
    </UIContainer>
  </View>
)

const styles = StyleSheet.create({
  emptyPostsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatContainer: {
    alignItems: 'center',
  },
  centeredText: {
    textAlign: 'center',
  },
  placeholderImage: {
    height: UI_EMPTY_PLACEHOLDER_IMAGE,
    width: UI_EMPTY_PLACEHOLDER_IMAGE,
    margin: 20,
  },
})

export default Empty
