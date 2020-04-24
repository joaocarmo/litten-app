/**
 * @format
 * @flow strict-local
 */

import i18n from 'i18n-js'
import { getLocales } from 'react-native-localize'
import memoize from 'lodash.memoize'
import { en, pt } from 'translations'

const locales = getLocales()

if (Array.isArray(locales)) {
  const [{ languageTag }] = locales
  i18n.locale = languageTag
}

i18n.fallbacks = true
i18n.translations = {
  en,
  pt,
}

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
)

export default i18n

export { translate }
