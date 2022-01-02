const getLocales = () => [
  {
    countryCode: 'US',
    languageTag: 'en-US',
    languageCode: 'en',
    isRTL: false,
  },
  {
    countryCode: 'PT',
    languageTag: 'pt-PT',
    languageCode: 'pt',
    isRTL: false,
  },
]

// Use a provided translation, or return undefined to test your fallback
const findBestAvailableLanguage = () => ({
  languageTag: 'en-US',
  isRTL: false,
})

const getNumberFormatSettings = () => ({
  decimalSeparator: '.',
  groupingSeparator: ',',
})

const getCalendar = () => 'gregorian'

const getCountry = () => 'PT'

const getCurrencies = () => ['EUR', 'USD']

const getTemperatureUnit = () => 'celsius'

const getTimeZone = () => 'Europe/Lisbon'

const uses24HourClock = () => true

const usesMetricSystem = () => true

const addEventListener = jest.fn()

const removeEventListener = jest.fn()

export {
  findBestAvailableLanguage,
  getLocales,
  getNumberFormatSettings,
  getCalendar,
  getCountry,
  getCurrencies,
  getTemperatureUnit,
  getTimeZone,
  uses24HourClock,
  usesMetricSystem,
  addEventListener,
  removeEventListener,
}
