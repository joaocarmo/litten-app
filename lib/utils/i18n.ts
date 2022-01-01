import I18n from 'i18n-js'
import { getLocales } from 'react-native-localize'
import memoize from 'lodash.memoize'
import { en, pt } from '@translations'

const getI18nConfig = () => {
  const locales = getLocales()

  let locale: string | null = null

  if (Array.isArray(locales)) {
    const [{ languageTag }] = locales
    I18n.locale = languageTag
    locale = languageTag
  }

  I18n.fallbacks = true
  I18n.translations = {
    en,
    pt,
  }

  const translate = memoize(
    (key, config) => I18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  )

  return { locale, translate }
}

const { locale, translate } = getI18nConfig()

export default I18n

export { locale, translate }
