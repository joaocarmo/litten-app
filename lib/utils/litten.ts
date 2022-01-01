import {
  FEEDBACK_TYPE_ABUSE,
  FEEDBACK_TYPE_BUG,
  FEEDBACK_TYPE_OTHER,
  LITTEN_FILTER_LOCATION_RADIUS_STORE,
  LITTEN_FILTER_LOCATION_RADIUS,
  LITTEN_FILTER_SPECIES_STORE,
  LITTEN_FILTER_SPECIES,
  LITTEN_FILTER_TYPE_STORE,
  LITTEN_FILTER_TYPE,
  LITTEN_FILTER_USER_TYPE_STORE,
  LITTEN_FILTER_USER_TYPE,
  LITTEN_SPECIES_BIRD,
  LITTEN_SPECIES_CAT,
  LITTEN_SPECIES_DOG,
  LITTEN_SPECIES_OTHER,
  LITTEN_SPECIES_RABBIT,
  LITTEN_SPECIES_RODENT,
  LITTEN_TYPE_ADOPT,
  LITTEN_TYPE_FOUND,
  LITTEN_TYPE_LOST,
  LITTEN_URI,
  MAILTO_URI,
  SMS_URI,
  TEL_URI,
  USER_PREFERENCES_CONTACT_CALL,
  USER_PREFERENCES_CONTACT_EMAIL,
  USER_PREFERENCES_CONTACT_INAPP,
  USER_PREFERENCES_CONTACT_SMS,
  USER_TYPE_ALL,
  USER_TYPE_INDIVIDUAL,
  USER_TYPE_ORGANIZATION,
} from '@utils/constants'
import {
  ContactEmail,
  ContactInApp,
  ContactPhoneCall,
  ContactSMS,
} from '@images/components/icons'
import {
  Adopt,
  Found,
  Lost,
  Cat,
  Dog,
  Bird,
  Rabbit,
  Reptilian as Other,
  Rodent,
} from '@images/components/litten'
import { translate } from '@utils/i18n'
import type {
  ListOfContactOptions,
  ListOfFilters,
  ListOfReportTypes,
  ListOfSpecies,
  ListOfTypes,
  ListOfUserTypes,
} from '@utils/types/litten'

export const littenSpeciesList: ListOfSpecies[] = [
  {
    key: LITTEN_SPECIES_DOG,
    label: translate('litten.species.dog', {
      count: 2,
    }),
    labelOne: translate('litten.species.dog', {
      count: 1,
    }),
    icon: Dog,
    description: '',
  },
  {
    key: LITTEN_SPECIES_CAT,
    label: translate('litten.species.cat', {
      count: 2,
    }),
    labelOne: translate('litten.species.cat', {
      count: 1,
    }),
    icon: Cat,
    description: '',
  },
  {
    key: LITTEN_SPECIES_BIRD,
    label: translate('litten.species.bird', {
      count: 2,
    }),
    labelOne: translate('litten.species.bird', {
      count: 1,
    }),
    icon: Bird,
    description: '',
  },
  {
    key: LITTEN_SPECIES_RABBIT,
    label: translate('litten.species.rabbit', {
      count: 2,
    }),
    labelOne: translate('litten.species.rabbit', {
      count: 1,
    }),
    icon: Rabbit,
    description: '',
  },
  {
    key: LITTEN_SPECIES_RODENT,
    label: translate('litten.species.rodent', {
      count: 2,
    }),
    labelOne: translate('litten.species.rodent', {
      count: 1,
    }),
    icon: Rodent,
    description: '',
  },
  {
    key: LITTEN_SPECIES_OTHER,
    label: translate('litten.species.other', {
      count: 2,
    }),
    labelOne: translate('litten.species.other', {
      count: 1,
    }),
    icon: Other,
    description: '',
  },
]

export const littenTypesKeys: Record<string, string> = {
  [LITTEN_TYPE_ADOPT]: 'adopt',
  [LITTEN_TYPE_LOST]: 'lost',
  [LITTEN_TYPE_FOUND]: 'found',
}

export const littenTypes: ListOfTypes[] = [
  {
    key: LITTEN_TYPE_ADOPT,
    label: translate('litten.type.adopt'),
    icon: Adopt,
    description: '',
  },
  {
    key: LITTEN_TYPE_LOST,
    label: translate('litten.type.lost'),
    icon: Lost,
    description: '',
  },
  {
    key: LITTEN_TYPE_FOUND,
    label: translate('litten.type.found'),
    icon: Found,
    description: '',
  },
]

export const littenFilters: ListOfFilters[] = [
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
  {
    key: LITTEN_FILTER_USER_TYPE,
    label: translate('screens.searches.filterUserType'),
    storeKey: LITTEN_FILTER_USER_TYPE_STORE,
  },
]

export const contactOptions: ListOfContactOptions[] = [
  {
    key: USER_PREFERENCES_CONTACT_INAPP,
    label: translate('screens.settings.contactInApp'),
    icon: ContactInApp,
    urlScheme: LITTEN_URI,
    urlValueKey: 'id',
  },
  {
    key: USER_PREFERENCES_CONTACT_CALL,
    label: translate('screens.settings.contactCall'),
    icon: ContactPhoneCall,
    urlScheme: TEL_URI,
    urlValueKey: 'phoneNumber',
  },
  {
    key: USER_PREFERENCES_CONTACT_EMAIL,
    label: translate('screens.settings.contactEmail'),
    icon: ContactEmail,
    urlScheme: MAILTO_URI,
    urlValueKey: 'email',
  },
  {
    key: USER_PREFERENCES_CONTACT_SMS,
    label: translate('screens.settings.contactSMS'),
    icon: ContactSMS,
    urlScheme: SMS_URI,
    urlValueKey: 'phoneNumber',
  },
]

export const reportTypes: ListOfReportTypes[] = [
  {
    key: FEEDBACK_TYPE_ABUSE,
    label: translate('screens.profile.contactUsAbuse'),
    emoji: ':rotating_light:',
    requestTypeId: 17,
  },
  {
    key: FEEDBACK_TYPE_BUG,
    label: translate('screens.profile.contactUsBroken'),
    emoji: ':bug:',
    requestTypeId: 14,
  },
  {
    key: FEEDBACK_TYPE_OTHER,
    label: translate('screens.profile.contactUsFeedback'),
    emoji: ':speech_balloon:',
    requestTypeId: 12,
  },
]

export const userTypes: ListOfUserTypes[] = [
  {
    key: USER_TYPE_ALL,
    label: translate('cta.all'),
    value: '',
  },
  {
    key: USER_TYPE_INDIVIDUAL,
    label: translate('screens.profile.viewUserTypeIndividual'),
    value: USER_TYPE_INDIVIDUAL,
  },
  {
    key: USER_TYPE_ORGANIZATION,
    label: translate('screens.profile.viewUserTypeOrganization'),
    value: USER_TYPE_ORGANIZATION,
  },
]
