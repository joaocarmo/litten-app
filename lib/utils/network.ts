import {
  APP_IS_DEV,
  GOOGLE_API_KEY,
  JIRA_API_KEY,
  JIRA_EMAIL,
  SLACK_WEBHOOK_URL,
} from '@utils/env'
import memoize from 'lodash.memoize'
import { Alert } from 'react-native'
import FormData from 'react-native/Libraries/Network/FormData'
import type { DBCoordinateObject } from '@db/schemas/location'
import type { GeoInformation } from '@utils/types/network'
import { reportTypes } from '@utils/litten'
import { createAuthHeader, getFromListByKey } from '@utils/functions'
import fetcher from '@utils/fetcher'
import {
  JIRA_APPEND_ATTACHMENT,
  JIRA_TICKET_URL,
  JIRA_UPLOAD_ATTACHMENT,
} from '@utils/constants'
import { debugLog, logError } from '@utils/dev'
import { translate } from '@utils/i18n'
import config from '../../package.json'

/**
 * Simple function to retrieve a document using a model
 * @async
 * @param {*} Model - The Model object
 * @param {string} id - The resource ID
 * @returns {*}
 */
export const getFromModel = async <T>(Model: T, id: string): Promise<T> => {
  const resource = new Model({
    id,
  })

  await resource.get()

  return resource
}

/**
 * Memoized function to retrieve a document using a model
 * @async
 * @param {*} Model - The Model object
 * @param {string} id - The resource ID
 * @returns {*}
 */
export const memoizedGetFromModel = memoize(getFromModel, (Model, id) => id)

/**
 * Handles network errors
 * @async
 * @param {Error} err - The Error object
 * @returns {void}
 */
export const handleNetworkError = (err: Error): void => {
  if (
    err.name === 'AbortError' ||
    (err.name === 'TypeError' &&
      err.message.toLocaleLowerCase().includes('network'))
  ) {
    Alert.alert(translate('feedback.errorMessages.networkProblem'))
  }

  logError(err)
}

/**
 * Finds geolocation information based on the device's IP address
 * @async
 * @param {string} externalIP - An external IP address
 * @returns {{ip: string, country_code: string, country_name: string, region_code: string, region_name: string, city: string, zip_code: string, time_zone: string, latitude: number, longitude: number, metro_code: number}}
 */
export async function getExternalGeoInformation(
  externalIP = '',
): Promise<GeoInformation> {
  const apiUri = `https://freegeoip.live/json/${externalIP}`
  let jsonData = {}

  try {
    const data = await fetcher(apiUri)
    jsonData = await data.json()
  } catch (e) {
    debugLog(e)
  }

  return jsonData
}

/**
 * Finds geolocation information based on the address
 * @async
 * @param {string} address
 * @returns {Array.<{address_components: Array<{long_name: string, short_name: string, types: string[]}>, formatted_address: string, geometry: Object, place_id: string, plus_code: Object, types: string[]}>}
 */
export async function getGeoInformation(address: string): Promise<null> {
  const apiUri = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`
  let results = null

  try {
    const data = await fetcher(apiUri)
    const jsonData = await data.json()

    if (jsonData?.status === 'OK') {
      results = jsonData?.results
    }
  } catch (err) {
    handleNetworkError(err)
  }

  return results
}

/**
 * Finds reverse geolocation information based on the coordinates
 * @async
 * @param {{latitude: string, longitude: string}} coordinates
 * @returns {Array.<{address_components: Array<{long_name: string, short_name: string, types: string[]}>, formatted_address: string, geometry: Object, place_id: string, plus_code: Object, types: string[]}>}
 */
export async function getReverseGeoInformation(
  coordinates: DBCoordinateObject,
): Promise<null> {
  const { latitude, longitude } = coordinates
  let results = null

  if (latitude && longitude) {
    const apiUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`

    try {
      const data = await fetcher(apiUri)
      const jsonData = await data.json()

      if (jsonData?.status === 'OK') {
        results = jsonData?.results
      }
    } catch (err) {
      handleNetworkError(err)
    }
  }

  return results
}

/**
 * Submits the user feedback attachments
 * @async
 * @param {object} options
 * @returns {void}
 */
export const submitUserFeedbackAttachments = async ({
  attachments,
  headers: { Authorization },
  numOfAttachments,
  response: { issueId },
  serviceDeskId,
}): Promise<void> => {
  if (
    !APP_IS_DEV &&
    JIRA_APPEND_ATTACHMENT &&
    JIRA_UPLOAD_ATTACHMENT &&
    issueId &&
    numOfAttachments > 0
  ) {
    const uploadUrl = JIRA_UPLOAD_ATTACHMENT.replace(
      '{serviceDeskId}',
      serviceDeskId,
    )
    const appendUrl = JIRA_APPEND_ATTACHMENT.replace('{issueIdOrKey}', issueId)
    const temporaryAttachmentIds = []

    const headersUpload = {
      Authorization,
      'X-ExperimentalApi': 'opt-in',
      'X-Atlassian-Token': 'no-check',
    }

    const attachmentsToUpload = []

    for (const attachment of attachments) {
      const formData = new FormData()
      const attachmentFile = {
        uri: attachment,
        name: attachment.split('/').pop(),
        type: 'image/jpeg',
      }
      formData.append('file', attachmentFile)

      attachmentsToUpload.push(
        fetcher(uploadUrl, {
          method: 'POST',
          headers: headersUpload,
          body: formData,
        }),
      )
    }

    try {
      const uploadResponses = await Promise.all(attachmentsToUpload)
      const uploadResponsesJson = await Promise.all(
        uploadResponses.map((response) => response.ok && response.json()),
      )

      uploadResponsesJson.forEach((responseBody, responseIndex) => {
        if (responseBody) {
          const { temporaryAttachments } = responseBody

          for (const temporaryAttachment of temporaryAttachments) {
            const { temporaryAttachmentId } = temporaryAttachment
            temporaryAttachmentIds.push(temporaryAttachmentId)
          }
        } else {
          debugLog(
            '[ERROR] Uploading attachment',
            uploadUrl,
            headersUpload,
            uploadResponses[responseIndex],
          )
        }
      })
    } catch (err) {
      logError(err)
    }

    if (temporaryAttachmentIds.length > 0) {
      const headersAppend = {
        Authorization,
        'Content-Type': 'application/json',
      }
      const bodyAppend = {
        temporaryAttachmentIds,
        public: true,
        additionalComment: {
          body: `Uploaded using ${config.name} v${config.version}`,
        },
      }

      try {
        const response = await fetcher(appendUrl, {
          method: 'POST',
          headers: headersAppend,
          body: JSON.stringify(bodyAppend),
        })

        if (!response.ok) {
          debugLog(appendUrl, bodyAppend, response)
        }
      } catch (err) {
        logError(err)
      }
    }
  }
}

/**
 * Submits the user feedback to be recorded and returns a boolean indicating
 * whether it was successful
 * @async
 * @param {string} type - The type of feedback submitted
 * @param {string} message - The message submitted
 * @param {string[]} attachments - The attachments submitted
 * @returns {boolean}
 */
export const submitUserFeedback = async (
  type: string,
  message: string,
  attachments: string[] = [],
): Promise<boolean> => {
  const serviceDeskId = 2
  const cleanAttachments = attachments.filter((attachment) => !!attachment)
  const numOfAttachments = cleanAttachments.length
  const { emoji = ':warning:', requestTypeId } =
    getFromListByKey(reportTypes, type) ?? {}
  let url = ''
  let postData = null
  let headers = {
    'Content-Type': 'application/json',
  }

  // Post to Jira (production)
  if (!APP_IS_DEV && JIRA_TICKET_URL && JIRA_EMAIL && JIRA_API_KEY) {
    url = JIRA_TICKET_URL
    postData = {
      serviceDeskId,
      requestTypeId,
      requestFieldValues: {
        summary: type,
        description: message,
      },
    }
    headers = {
      ...headers,
      Authorization: createAuthHeader(JIRA_EMAIL, JIRA_API_KEY),
    }
  }

  // Post to Slack (development)
  if (APP_IS_DEV && SLACK_WEBHOOK_URL) {
    url = SLACK_WEBHOOK_URL
    postData = {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Type:*\n${emoji} ${type}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message*:\n${message}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Attachments*:\n${numOfAttachments}`,
          },
        },
      ],
    }
  }

  if (url && postData) {
    const response = await fetcher(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(postData),
    })

    if (response.ok) {
      if (!APP_IS_DEV) {
        const responseBody = await response.json()
        submitUserFeedbackAttachments({
          attachments: cleanAttachments,
          headers,
          numOfAttachments,
          response: responseBody,
          serviceDeskId,
        })
      }

      return response.ok
    } else {
      debugLog(url, postData, response)
    }
  }

  // Mock a successful request
  return true
}
