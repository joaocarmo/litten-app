/**
 * @format
 * @flow
 */

import Toast from 'react-native-simple-toast'
import { useEffect, useState } from 'react'
import type { Node } from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native'
import {
  UIButton,
  UIHeader,
  UIImage,
  UILoader,
  UISeparator,
  UIText,
  UITextArea,
} from 'ui-elements'
import AddPhoto from 'components/add-photo'
import { Plus as PlusIcon } from 'images/components/icons'
import { getImagePath, iterateTimes } from 'utils/functions'
import { submitUserFeedback, handleNetworkError } from 'utils/network'
import {
  MAX_NUM_OF_REPORT_IMAGES,
  NUM_OF_REPORT_IMAGES,
  UI_ELEMENT_BORDER_RADIUS,
  UI_ICON_SIZE_MINI,
  USER_AVATAR_SIZE_MEDIUM,
} from 'utils/constants'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const NUM_IMAGES = Math.min(NUM_OF_REPORT_IMAGES, MAX_NUM_OF_REPORT_IMAGES)
const FLEX_BASIS = (0.95 * (1 / MAX_NUM_OF_REPORT_IMAGES) * 100).toFixed(1)

const ImageComponent: (args: any) => Node = ({ source, ...otherProps }) => (
  <Pressable style={styles.reportImageContainer} {...otherProps}>
    <UIImage source={source} style={styles.reportImage} />
  </Pressable>
)

const PlaceholderComponent: (args: any) => Node = (props) => (
  <Pressable style={styles.reportImageContainer} {...props}>
    <PlusIcon
      height={UI_ICON_SIZE_MINI}
      width={UI_ICON_SIZE_MINI}
      fill={colors.blue}
    />
  </Pressable>
)

const ReportForm: (args: any) => Node = ({
  formReport: { attachments, content: stateContent, type: stateType },
  header,
  initialContent,
  setAttachments,
  setContent,
  setType,
  type,
}) => {
  const [extraContent, setExtraContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (initialContent) {
      setExtraContent(initialContent)
    }
    if (type) {
      setType(type)
    }
  }, [initialContent, setContent, setType, type])

  const onChangeImage = (image, index) => {
    const imagePath = getImagePath(image)
    const newAttachments = [...attachments]
    newAttachments[index] = imagePath
    setAttachments(newAttachments)
  }

  const onSubmit = async () => {
    const fullContent = `${extraContent}${stateContent}`
    if (stateType && fullContent) {
      try {
        setIsLoading(true)
        const result = await submitUserFeedback(
          stateType,
          fullContent,
          attachments,
        )
        if (result) {
          setExtraContent('')
          setContent('')
          setAttachments([])
          Toast.show(translate('forms.reportErrorMessageDone'))
        } else {
          Alert.alert(translate('forms.reportErrorMessageFail'))
        }
      } catch (err) {
        handleNetworkError(err)
      } finally {
        setIsLoading(false)
      }
    } else {
      Alert.alert(translate('feedback.errorMessages.blankMessage'))
    }
  }

  return (
    <>
      <UILoader active={isLoading} transparent />
      <UIHeader subheader>{header}</UIHeader>
      <UISeparator invisible small />
      {!!extraContent && (
        <UIText>{translate('forms.reportHasExtraInfo')}</UIText>
      )}
      <UITextArea onChangeText={setContent} rows={6}>
        {stateContent}
      </UITextArea>
      {NUM_OF_REPORT_IMAGES > 0 && (
        <View style={styles.reportImagesContainer}>
          {iterateTimes(NUM_IMAGES).map((index) => (
            <AddPhoto
              key={index}
              ImageComponent={ImageComponent}
              imageSource={attachments[index]}
              onChange={(image) => onChangeImage(image, index)}
              PlaceholderComponent={PlaceholderComponent}
            />
          ))}
        </View>
      )}
      <UISeparator invisible small />
      <UIButton
        onPress={onSubmit}
        disabled={isLoading}
        secondary
        style={styles.reportButton}>
        {translate('cta.send')}
      </UIButton>
      {!extraContent && <UIText>{translate('forms.reportDisclaimer')}</UIText>}
    </>
  )
}

const styles = StyleSheet.create({
  reportButton: {
    alignSelf: 'center',
  },
  reportImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  reportImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: USER_AVATAR_SIZE_MEDIUM,
    flexBasis: `${FLEX_BASIS}%`,
    aspectRatio: 1,
    borderRadius: UI_ELEMENT_BORDER_RADIUS,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  reportImage: {
    height: '100%',
    width: '100%',
  },
})

export default ReportForm
