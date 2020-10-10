/**
 * @format
 * @flow
 */

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { locale } from './i18n'

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
  en: require('dayjs/locale/en'),
  'pt-br': require('dayjs/locale/pt-br'),
  pt: require('dayjs/locale/pt'),
}

if (locale) {
  const lowerLocale = locale.toLowerCase()
  const defaultLocale = lowerLocale.substring(0, 2)
  const currentLocale =
    supportedLocales[lowerLocale] ?? supportedLocales[defaultLocale]
  if (currentLocale) {
    dayjs.locale(currentLocale)
  }
}

dayjs.extend(relativeTime)

export default dayjs
