/**
 * @format
 * @flow strict-local
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
