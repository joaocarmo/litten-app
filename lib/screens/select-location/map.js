/**
 * @format
 * @flow
 */

import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { UIButton, UILoader, UISeparator, UIText } from 'ui-elements'
import { initialRegion } from 'config/location/initial-region'
import { locationSchema } from 'db/schemas/location'
import { getLocation } from 'utils/setup'
import { parseGoogleMapResponse, mapGoogleLocationKeys } from 'utils/functions'
import { getReverseGeoInformation } from 'utils/network'
import { UI_MAP_BORDER_RADIUS, UI_MAP_MIN_HEIGHT } from 'utils/constants'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const SelectLocationMapScreen: (args: any) => React$Node = ({
  onLocationChange,
  initialCoordinates = {
    latitude: null,
    longitude: null,
  },
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [region, setRegion] = useState({
    ...initialRegion,
    ...initialCoordinates,
  })
  const [coordinates, setCoordinates] = useState(initialCoordinates)

  const setRegionCoordinate = (newRegion) => {
    const { latitude, longitude } = newRegion
    setRegion(newRegion)
    setCoordinates({ latitude, longitude })
  }

  const setCurrentLocation = async () => {
    if (!initialCoordinates.latitude || !initialCoordinates.longitude) {
      const currentPosition = await getLocation()
      if (currentPosition?.coords) {
        const { latitude, longitude } = currentPosition?.coords
        setRegionCoordinate({ ...region, latitude, longitude })
      }
    }
  }

  useEffect(() => {
    setCurrentLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLocation = async () => {
    setIsLoading(true)
    const data = await getReverseGeoInformation(coordinates)
    if (data) {
      const [first] = data
      if (first) {
        const parsed = mapGoogleLocationKeys(parseGoogleMapResponse(first))
        const newLocation = { ...parsed, coordinates }
        onLocationChange(newLocation)
      }
    }
    setIsLoading(false)
  }

  const clearLocation = () => onLocationChange(locationSchema)

  return region.latitude && coordinates.latitude ? (
    <View style={styles.mapScreenContainer}>
      <UILoader active={isLoading} transparent />
      <UIText>{translate('forms.mapInstructions')}</UIText>
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={region}
          style={styles.map}
          showsUserLocations
          loadingEnabled
          loadingIndicatorColor={colors.blue}
          loadingBackgroundColor={colors.lightGray}>
          <Marker
            draggable
            coordinate={coordinates}
            onDragEnd={(e) => setCoordinates(e.nativeEvent.coordinate)}
          />
        </MapView>
      </View>
      <View style={styles.mapActions}>
        <UIButton onPress={setLocation} secondary disabled={isLoading}>
          {translate('cta.done')}
        </UIButton>
        <UISeparator invisible small />
        <UIButton onPress={clearLocation} danger disabled={isLoading}>
          {translate('cta.clearLocation')}
        </UIButton>
      </View>
    </View>
  ) : null
}

const styles = StyleSheet.create({
  mapScreenContainer: {
    flex: 1,
  },
  mapContainer: {
    borderRadius: UI_MAP_BORDER_RADIUS,
    overflow: 'hidden',
  },
  map: {
    minHeight: UI_MAP_MIN_HEIGHT,
  },
  mapActions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default SelectLocationMapScreen
