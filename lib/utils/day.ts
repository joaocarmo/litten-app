/* eslint-disable global-require */
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { locale as i18nLocale } from '@utils/i18n'

const getDayjsConfig = () => {
  const supportedLocales = {
    'en-au': require('dayjs/locale/en-au'),
    'en-ca': require('dayjs/locale/en-ca'),
    'en-gb': require('dayjs/locale/en-gb'),
    'en-ie': require('dayjs/locale/en-ie'),
    'en-il': require('dayjs/locale/en-il'),
    'en-in': require('dayjs/locale/en-in'),
    'en-nz': require('dayjs/locale/en-nz'),
    'en-sg': require('dayjs/locale/en-sg'),
    'en-tt': require('dayjs/locale/en-tt'),
    en: undefined,
    'pt-br': require('dayjs/locale/pt-br'),
    pt: require('dayjs/locale/pt'),
  }

  let locale = 'en'

  let currentLocale: unknown

  if (i18nLocale) {
    locale = i18nLocale.toLowerCase()
    currentLocale = supportedLocales[locale]

    // Fallback to alpha-2 codes
    if (!currentLocale) {
      locale = locale.substring(0, 2)
      currentLocale = supportedLocales[locale]
    }
  }

  return { currentLocale, locale }
}

const { currentLocale, locale } = getDayjsConfig()

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.locale(locale)

export default dayjs

export { currentLocale, locale }
