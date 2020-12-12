/**
 * @format
 * @flow
 */

import {
  GOOGLE_API_KEY,
  JIRA_API_KEY,
  JIRA_EMAIL,
  JIRA_TICKET_URL,
  SLACK_WEBHOOK_URL,
} from '@env'
import { Alert } from 'react-native'
import type { DBCoordinateObject } from 'db/schemas/location'
import type { GeoInformation } from 'utils/types/network'
import { reportTypes } from 'utils/litten'
import { createAuthHeader, getFromListByKey } from 'utils/functions'
import fetcher from 'utils/fetcher'
import { logError } from 'utils/dev'
import { translate } from 'utils/i18n'

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
  externalIP: string = '',
): Promise<GeoInformation> {
  const apiUri = `https://freegeoip.live/json/${externalIP}`
  let jsonData = {}
  try {
    const data = await fetcher(apiUri)
    jsonData = await data.json()
  } finally {
    return jsonData
  }
}

/**
 * Finds geolocation information based on the address
 * @async
 * @param {string} address
 * @param {Array<string>} components
 * @returns {Array.<{address_components: Array<{long_name: string, short_name: string, types: string[]}>, formatted_address: string, geometry: Object, place_id: string, plus_code: Object, types: string[]}>}
 */
export async function getGeoInformation(
  address: string,
  components: string[] = [],
) {
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
) {
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
 * Submits the user feedback to be recorded and returns a boolean indicating
 * whether it was successful
 * @async
 * @param {string} type - The type of feedback submitted
 * @param {string} message - The message submitted
 * @returns {boolean}
 */
export const submitUserFeedback = async (
  type: string,
  message: string,
): Promise<boolean> => {
  const serviceDeskId = 2
  const isDev = process.env.NODE_ENV === 'development'
  const { emoji = ':warning:', requestTypeId } =
    getFromListByKey(reportTypes, type) ?? {}
  let url = ''
  let postData = null
  let headers = {
    'Content-Type': 'application/json',
  }

  // Post to Jira (production)
  if (!isDev && JIRA_TICKET_URL && JIRA_EMAIL && JIRA_API_KEY) {
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
  if (isDev && SLACK_WEBHOOK_URL) {
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
      ],
    }
  }

  if (url && postData) {
    const response = await fetcher(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(postData),
    })

    return response.ok
  }

  // Mock a successful request
  return true
}
