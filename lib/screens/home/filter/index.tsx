import Toast from 'react-native-simple-toast'
import { useCallback, useMemo, useState } from 'react'
import { FlatList, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  usePaddingBottom,
  useSavedFilters,
  useSearchFilters,
  useTheme,
  useUnit,
} from '@hooks'
import { UIListItem, UIPrompt } from '@ui-elements'
import {
  LITTEN_FILTER_LOCATION_RADIUS,
  LITTEN_FILTER_SPECIES,
  LITTEN_FILTER_TYPE,
  LITTEN_FILTER_USER_TYPE,
  Routes,
} from '@utils/constants'
import {
  convertLength,
  getFromListByKey,
  getListItemLayout,
  getNumOfActiveFilters,
} from '@utils/functions'
import {
  littenFilters,
  littenSpeciesList,
  littenTypes,
  userTypes,
} from '@utils/litten'
import { translate } from '@utils/i18n'
import type { HomeFilterScreenNavigationProp } from '@utils/types/routes'

const HomeFilterScreen = () => {
  const [namePromptIsOpen, setNamePromptIsOpen] = useState(false)
  const [, addFavouriteFilter] = useSavedFilters()
  const [filters, , resetFilters] = useSearchFilters()
  const [unit, useMetricUnits] = useUnit('length')
  const navigation = useNavigation<HomeFilterScreenNavigationProp>()
  const withPaddingBottom = usePaddingBottom()
  const {
    commonStyles: {
      commonStyles: { contentContainerStyle },
    },
  } = useTheme()

  const getFilterArray = useCallback((filter: string) => {
    if (filter === LITTEN_FILTER_SPECIES) {
      return littenSpeciesList
    } else if (filter === LITTEN_FILTER_TYPE) {
      return littenTypes
    }

    return []
  }, [])

  const getCaptionFor = useCallback(
    ({ key, storeKey }: { key: string; storeKey: string }): string => {
      const filter: string[] | number | string = filters[storeKey]

      if (Array.isArray(filter) && filter.length) {
        return getFilterArray(key)
          .filter(({ key: k }) => filter.includes(k))
          .map(({ label }) => label)
          .join(', ')
          .trim()
      }

      const radius = +filter

      if (key === LITTEN_FILTER_LOCATION_RADIUS) {
        if (radius > 0) {
          return translate('screens.searches.filterLocationRadiusValueShort', {
            value: convertLength(radius || 0, useMetricUnits),
            unit,
          })
        }
      }

      if (key === LITTEN_FILTER_USER_TYPE && typeof filter === 'string') {
        return getFromListByKey(userTypes, filter)?.label || ''
      }

      return ''
    },
    [filters, getFilterArray, unit, useMetricUnits],
  )

  const clearConfirm = useCallback(() => {
    Alert.alert(
      translate('cta.resetFilters'),
      translate('feedback.confirmMessages.resetFilters'),
      [
        {
          text: translate('cta.yes'),
          onPress: () => resetFilters(),
          style: 'destructive',
        },
        {
          text: translate('cta.no'),
          onPress: () => null,
        },
      ],
    )
  }, [resetFilters])

  const saveFilters = useCallback(
    (name: string) => {
      addFavouriteFilter({
        name,
        ...filters,
      })
      setNamePromptIsOpen(false)
      Toast.show(translate('screens.favourites.filtersSaved'))
    },
    [addFavouriteFilter, filters],
  )

  const saveFiltersWithName = useCallback(() => {
    if (!namePromptIsOpen) {
      const numOfActiveFilters = getNumOfActiveFilters(filters)

      if (numOfActiveFilters > 0) {
        setNamePromptIsOpen(true)
      } else {
        Toast.show(translate('screens.searches.noActiveFiltersToSave'))
      }
    }
  }, [filters, namePromptIsOpen])

  const handleCancelPrompt = useCallback(() => {
    setNamePromptIsOpen(false)
  }, [])

  const renderItem = useCallback(
    ({ item: { key, label, storeKey } }) => (
      <UIListItem
        onPress={() =>
          navigation.navigate(Routes.SCREEN_HOME_FILTER_SET, {
            title: label,
            filter: key,
          })
        }
        caption={getCaptionFor({
          key,
          storeKey,
        })}
        hasExtra
      >
        {label}
      </UIListItem>
    ),
    [getCaptionFor, navigation],
  )

  const getItemLayout = useCallback(getListItemLayout, [])

  const ListFooterComponent = useMemo(
    () => (
      <>
        <UIListItem onPress={saveFiltersWithName}>
          {translate('screens.searches.saveFilters')}
        </UIListItem>
        <UIListItem onPress={clearConfirm}>
          {translate('screens.searches.filtersReset')}
        </UIListItem>
      </>
    ),
    [clearConfirm, saveFiltersWithName],
  )

  const renderSavePrompt = useMemo(
    () => (
      <UIPrompt
        open={namePromptIsOpen}
        title={translate('cta.enterFilterName')}
        message={translate('feedback.confirmMessages.enterFilterName')}
        cancelLabel={translate('cta.cancel')}
        onCancel={handleCancelPrompt}
        confirmLabel={translate('cta.save')}
        onConfirm={saveFilters}
      />
    ),
    [handleCancelPrompt, namePromptIsOpen, saveFilters],
  )

  return (
    <>
      {renderSavePrompt}
      <FlatList
        data={littenFilters}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        getItemLayout={getItemLayout}
        contentContainerStyle={[contentContainerStyle, withPaddingBottom]}
      />
    </>
  )
}

export default HomeFilterScreen
