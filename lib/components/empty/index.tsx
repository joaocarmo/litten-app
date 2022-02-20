import { Children, useMemo } from 'react'
import type { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { UIContainer, UIHeader, UIImage, UIText } from '@ui-elements'
import { UI_EMPTY_PLACEHOLDER_IMAGE } from '@utils/constants'
import type { ImageSource } from '@ui-elements/types'

export type EmptyProps = {
  children?: ReactNode
  header?: string
  imageSource?: ImageSource
}

const Empty = ({ children, header, imageSource }: EmptyProps) => {
  const niceChildren = useMemo(() => {
    if (Array.isArray(children)) {
      return Children.map(children, (child) =>
        typeof child === 'string' ? <UIText centered>{child}</UIText> : child,
      )
    }

    if (typeof children === 'string') {
      return <UIText centered>{children}</UIText>
    }

    return children
  }, [children])

  return (
    <View style={styles.emptyPostsContainer}>
      <UIContainer style={styles.floatContainer}>
        <UIImage source={imageSource} style={styles.placeholderImage} />
        {typeof header === 'string' && <UIHeader centered>{header}</UIHeader>}
        {niceChildren}
      </UIContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyPostsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatContainer: {
    alignItems: 'center',
  },
  placeholderImage: {
    height: UI_EMPTY_PLACEHOLDER_IMAGE,
    width: UI_EMPTY_PLACEHOLDER_IMAGE,
    margin: 20,
  },
})

Empty.defaultProps = {
  children: null,
  header: '',
  imageSource: '',
}

export default Empty
