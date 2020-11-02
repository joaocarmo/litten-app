/**
 * @format
 * @flow
 */

import {} from 'images'
import {
  LITTEN_URI,
  LITTEN_SPECIES_DOG,
  LITTEN_SPECIES_CAT,
  LITTEN_SPECIES_BIRD,
  LITTEN_SPECIES_RABBIT,
  LITTEN_SPECIES_RODENT,
  LITTEN_SPECIES_OTHER,
  LITTEN_TYPE_ADOPT,
  LITTEN_TYPE_BREED,
  LITTEN_TYPE_LOST,
  LITTEN_TYPE_FOUND,
  LITTEN_FILTER_SPECIES,
  LITTEN_FILTER_TYPE,
  LITTEN_FILTER_LOCATION_RADIUS,
  LITTEN_FILTER_SPECIES_STORE,
  LITTEN_FILTER_TYPE_STORE,
  LITTEN_FILTER_LOCATION_RADIUS_STORE,
  USER_PREFERENCES_CONTACT_CALL,
  USER_PREFERENCES_CONTACT_EMAIL,
  USER_PREFERENCES_CONTACT_INAPP,
  USER_PREFERENCES_CONTACT_SMS,
} from './constants'
import {
  iconCall,
  menuMessages,
  typeAdopt,
  typeBreed,
  typeLost,
  typeFound,
  speciesBird,
  speciesCat,
  speciesDog,
  speciesOther,
  speciesRabbit,
  speciesRodent,
} from 'images'
import { translate } from './i18n'

export const littenSpeciesList = [
  {
    key: LITTEN_SPECIES_DOG,
    label: translate('litten.species.dog', { count: 0 }),
    icon: speciesDog,
    description: '',
  },
  {
    key: LITTEN_SPECIES_CAT,
    label: translate('litten.species.cat', { count: 0 }),
    icon: speciesCat,
    description: '',
  },
  {
    key: LITTEN_SPECIES_BIRD,
    label: translate('litten.species.bird', { count: 0 }),
    icon: speciesBird,
    description: '',
  },
  {
    key: LITTEN_SPECIES_RABBIT,
    label: translate('litten.species.rabbit', { count: 0 }),
    icon: speciesRabbit,
    description: '',
  },
  {
    key: LITTEN_SPECIES_RODENT,
    label: translate('litten.species.rodent', { count: 0 }),
    icon: speciesRodent,
    description: '',
  },
  {
    key: LITTEN_SPECIES_OTHER,
    label: translate('litten.species.other', { count: 0 }),
    icon: speciesOther,
    description: '',
  },
]

export const littenTypes = [
  {
    key: LITTEN_TYPE_ADOPT,
    label: translate('litten.type.adopt'),
    icon: typeAdopt,
    description: '',
  },
  {
    key: LITTEN_TYPE_BREED,
    label: translate('litten.type.breed'),
    icon: typeBreed,
    description: '',
  },
  {
    key: LITTEN_TYPE_LOST,
    label: translate('litten.type.lost'),
    icon: typeLost,
    description: '',
  },
  {
    key: LITTEN_TYPE_FOUND,
    label: translate('litten.type.found'),
    icon: typeFound,
    description: '',
  },
]

export const littenFilters = [
  {
    key: LITTEN_FILTER_SPECIES,
    label: translate('screens.searches.filterSpecies'),
    storeKey: LITTEN_FILTER_SPECIES_STORE,
  },
  {
    key: LITTEN_FILTER_TYPE,
    label: translate('screens.searches.filterType'),
    storeKey: LITTEN_FILTER_TYPE_STORE,
  },
  {
    key: LITTEN_FILTER_LOCATION_RADIUS,
    label: translate('screens.searches.filterLocationRadius'),
    storeKey: LITTEN_FILTER_LOCATION_RADIUS_STORE,
  },
]

export const contactOptions = [
  {
    key: USER_PREFERENCES_CONTACT_CALL,
    label: translate('screens.settings.contactCall'),
    icon: iconCall,
    urlScheme: 'tel:',
    urlValueKey: 'phoneNumber',
  },
  {
    key: USER_PREFERENCES_CONTACT_EMAIL,
    label: translate('screens.settings.contactEmail'),
    icon: null,
    urlScheme: 'mailto:',
    urlValueKey: 'email',
  },
  {
    key: USER_PREFERENCES_CONTACT_INAPP,
    label: translate('screens.settings.contactInApp'),
    icon: menuMessages,
    urlScheme: LITTEN_URI, // TODO: Enable deep linking
    urlValueKey: 'id',
  },
  {
    key: USER_PREFERENCES_CONTACT_SMS,
    label: translate('screens.settings.contactSMS'),
    icon: null,
    urlScheme: 'sms:',
    urlValueKey: 'phoneNumber',
  },
]
