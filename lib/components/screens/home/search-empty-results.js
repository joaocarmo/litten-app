/**
 * @format
 * @flow
 */

import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { UITooltip } from 'ui-elements'
import Empty from 'components/empty'
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
      <Empty
        imageSource={placeholderEmptySearches}
        header={translate('screens.searches.emptyTitle')}>
        {translate('screens.searches.emptyText')}
      </Empty>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default SearchEmptyResults
