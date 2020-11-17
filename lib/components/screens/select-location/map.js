/**
 * @format
 * @flow
 */

import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { UIButton, UILoader } from 'ui-elements'
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
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [region, setRegion] = useState(initialRegion)
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  })

  const setRegionCoordinate = (newRegion) => {
    const { latitude, longitude } = newRegion
    setRegion(newRegion)
    setCoordinates({ latitude, longitude })
  }

  const setCurrentLocation = async () => {
    const currentPosition = await getLocation()
    if (currentPosition?.coords) {
      const { latitude, longitude } = currentPosition?.coords
      setRegionCoordinate({ ...region, latitude, longitude })
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
        setIsLoading(false)
        onLocationChange(newLocation)
      }
    }
  }

  const clearLocation = () => onLocationChange(locationSchema)

  return region.latitude && coordinates.latitude ? (
    <View style={styles.mapContainer}>
      <UILoader active={isLoading} transparent />
      <MapView
        region={region}
        onRegionChange={setRegionCoordinate}
        style={styles.map}
        showsUserLocations
        loadingEnabled
        loadingIndicatorColor={colors.blue}
        loadingBackgroundColor={colors.lightGray}>
        <Marker coordinate={coordinates} />
      </MapView>
      <View style={styles.mapActions}>
        <UIButton onPress={setLocation} secondary disabled={isLoading}>
          {translate('cta.done')}
        </UIButton>
        <UIButton onPress={clearLocation} danger disabled={isLoading}>
          {translate('cta.clearLocation')}
        </UIButton>
      </View>
    </View>
  ) : null
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    minHeight: UI_MAP_MIN_HEIGHT,
    borderRadius: UI_MAP_BORDER_RADIUS,
  },
  mapActions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})

export default SelectLocationMapScreen
