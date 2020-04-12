/**
 * @format
 * @flow strict-local
 */

export async function getExternalIPAddress() {
  const apiUri = 'https://api.ipify.org?format=json'
  let ip = ''
  try {
    const data = await fetch(apiUri)
    const jsonData = await data.json()
    ip = jsonData?.ip || ''
  } finally {
    return ip
  }
}

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
