/**
 * @format
 * @flow
 */

import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { UIContainer, UIHeader, UIImage, UIText, UITooltip } from 'ui-elements'
import { placeholderEmptySearches } from 'images'
import { NO_RESULTS_REFRESH_TIMEOUT_IN } from 'utils/constants'
import { translate } from 'utils/i18n'

const SearchEmptyResults: (args: any) => React$Node = ({
  handleTooltipRefresh,
}) => {
  const [showRefresh, setShowRefresh] = useState(false)

  useEffect(() => {
    if (!showRefresh) {
      setTimeout(
        () => setShowRefresh(true),
        NO_RESULTS_REFRESH_TIMEOUT_IN * 1000,
      )
    }
  }, [showRefresh])

  const onRefresh = () => {
    setShowRefresh(false)
    handleTooltipRefresh()
  }

  return (
    <View style={styles.emptyContainer}>
      {showRefresh && (
        <UITooltip onPress={onRefresh}>{translate('cta.refresh')}</UITooltip>
      )}
      <UIContainer style={styles.floatContainer}>
        <UIImage
          source={placeholderEmptySearches}
          style={styles.placeholderImage}
        />
        <UIHeader style={styles.centeredText}>
          {translate('screens.searches.emptyTitle')}
        </UIHeader>
        <UIText style={styles.centeredText}>
          {translate('screens.searches.emptyText')}
        </UIText>
      </UIContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatContainer: {
    alignItems: 'center',
  },
  centeredText: {
    textAlign: 'center',
  },
  placeholderImage: {
    height: vw(30),
    width: vw(30),
    margin: 20,
  },
})

export default SearchEmptyResults
