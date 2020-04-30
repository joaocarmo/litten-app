/**
 * @format
 * @flow strict-local
 */

/**
 * Finds geolocation information based on the device's IP address
 * @async
 * @param {string} externalIP - An external IP address
 * @returns {{ip: string, country_code: string, country_name: string, region_code: string, region_name: string, city: string, zip_code: string, time_zone: string, latitude: number, longitude: number, metro_code: number}}
 */
export async function getExternalGeoInformation(externalIP = '') {
  const apiUri = `https://freegeoip.live/json/${externalIP}`
  let jsonData = {}
  try {
    const data = await fetch(apiUri)
    jsonData = await data.json()
  } finally {
    return jsonData
  }
}
