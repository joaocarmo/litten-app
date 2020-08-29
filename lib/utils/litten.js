/**
 * @format
 * @flow
 */

import {} from 'images'
import {
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
} from './constants'
import { typeAdopt, typeBreed, typeLost, typeFound } from 'images'
import { translate } from './i18n'

export const littenSpeciesList = [
  {
    key: LITTEN_SPECIES_DOG,
    label: translate('litten.species.dog', { count: 0 }),
    icon: null,
    description: '',
  },
  {
    key: LITTEN_SPECIES_CAT,
    label: translate('litten.species.cat', { count: 0 }),
    icon: null,
    description: '',
  },
  {
    key: LITTEN_SPECIES_BIRD,
    label: translate('litten.species.bird', { count: 0 }),
    icon: null,
    description: '',
  },
  {
    key: LITTEN_SPECIES_RABBIT,
    label: translate('litten.species.rabbit', { count: 0 }),
    icon: null,
    description: '',
  },
  {
    key: LITTEN_SPECIES_RODENT,
    label: translate('litten.species.rodent', { count: 0 }),
    icon: null,
    description: '',
  },
  {
    key: LITTEN_SPECIES_OTHER,
    label: translate('litten.species.other', { count: 0 }),
    icon: null,
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
