/**
 * @format
 * @flow
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native'
import { UIHeader, UIIcon, UIText } from 'ui-elements'
import { iconHeartOutline, placeholderCat } from 'images'
import {
  UI_LITTEN_CARD_BORDER_RADIUS,
  UI_LITTEN_CARD_CONTENT_TO_CONTAINER_RATIO,
  UI_LITTEN_CARD_HEIGHT,
  UI_LITTEN_CARD_IMAGE_TO_CONTENT_RATIO,
  UI_LITTEN_CARD_SPACING,
} from 'utils/constants'
import dayjs from 'utils/day'
import { veryElevated as elevatedStyle } from 'styles/common'
import { SCREEN_LITTEN_POST } from 'utils/constants'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const LittenCard: (args: any) => React$Node = ({ litten }) => {
  const { metadata, photos, user, story, title } = litten
  const navigation = useNavigation()

  const handleOnPressLitten = () => {
    navigation.navigate(SCREEN_LITTEN_POST, {
      litten,
      user,
    })
  }

  const handleOnPressFavourite = () => {
    Alert.alert(translate('feedback.errorMessages.notImplemented'))
  }

  return (
    <Pressable onPress={handleOnPressLitten} style={styles.cardContainer}>
      <View style={[elevatedStyle, styles.cardImageContainer]}>
        {photos && photos.length ? (
          <Image
            source={{ uri: photos[0] }}
            resizeMode="cover"
            style={styles.cardImage}
          />
        ) : (
          <Image
            source={placeholderCat}
            resizeMode="contain"
            style={[styles.cardImage, styles.cardImagePlaceholder]}
          />
        )}
      </View>
      <View style={styles.cardContentContainer}>
        <View style={[elevatedStyle, styles.cardContent]}>
          <UIHeader subheader>{title}</UIHeader>
          <UIText numberOfLines={1}>{story}</UIText>
          <View style={styles.cardContentFooter}>
            <View style={styles.cardContentFooterUserInfo}>
              <UIText style={styles.cardContentFooterUserInfoText} small bold>
                {user.displayName}
              </UIText>
              <UIText style={styles.cardContentFooterUserInfoText} small>
                {dayjs(metadata?.creationTime).fromNow()}
              </UIText>
            </View>
            <Pressable onPress={handleOnPressFavourite}>
              <UIIcon
                icon={iconHeartOutline}
                size="mini"
                circle
                style={styles.cardContentFooterFavourite}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    height: UI_LITTEN_CARD_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    paddingTop: UI_LITTEN_CARD_SPACING / 2,
    paddingBottom: UI_LITTEN_CARD_SPACING / 2,
  },
  cardImageContainer: {
    height: '100%',
    width: `${UI_LITTEN_CARD_IMAGE_TO_CONTENT_RATIO * 100}%`,
    borderRadius: UI_LITTEN_CARD_BORDER_RADIUS,
    backgroundColor: colors.gray,
  },
  cardImage: {
    height: '100%',
    width: '100%',
    borderRadius: UI_LITTEN_CARD_BORDER_RADIUS,
  },
  cardImagePlaceholder: {
    backgroundColor: colors.lightBlue,
  },
  cardContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardContent: {
    justifyContent: 'space-between',
    height: `${UI_LITTEN_CARD_CONTENT_TO_CONTAINER_RATIO * 100}%`,
    padding: 12,
    paddingLeft: 18,
    backgroundColor: colors.white,
    borderTopRightRadius: UI_LITTEN_CARD_BORDER_RADIUS,
    borderBottomRightRadius: UI_LITTEN_CARD_BORDER_RADIUS,
    shadowOpacity: 0.03,
  },
  cardContentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContentFooterFavourite: {
    backgroundColor: colors.lightGray,
    shadowOpacity: 0.03,
  },
  cardContentFooterUserInfo: {
    justifyContent: 'center',
  },
  cardContentFooterUserInfoText: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  },
})

export default LittenCard
