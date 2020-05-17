/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { UIButton, UIText } from 'ui-elements'
import { vh } from 'react-native-expo-viewport-units'
import MapView, { Marker } from 'react-native-maps'
import {
  getExternalGeoInformation,
  // getReverseGeoInformation,
} from 'utils/network'
import { translate } from 'utils/i18n'

const { width: wWidth, height: wHeight } = Dimensions.get('window')

const ASPECT_RATIO = wWidth / wHeight
const LATITUDE_DELTA = 0.03
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const initialRegion = {
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
}

const NewLocationForm: () => React$Node = () => {
  const [region, setRegion] = useState(initialRegion)
  const [coordinate, setCoordinate] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)

  useEffect(() => {
    setCoordinate({
      latitude: region?.latitude,
      longitude: region?.longitude,
    })
  }, [region])

  /* WIP
  const setLocationInfo = async () => {
    const data = await getReverseGeoInformation(coordinate)
    if (data) {
      const [first] = data
      setSelectedLocation(first)
    }
  }
  */

  const setCurrentLocation = async () => {
    setIsLoading(true)
    const data = await getExternalGeoInformation()
    if (data) {
      const { latitude, longitude, country_name, region_name, city } = data
      setCoordinate({ latitude, longitude })
      setRegion({ ...initialRegion, latitude, longitude })
      setSelectedLocation({
        formatted_address: `${city} (${region_name}), ${country_name}`,
      })
    }
    setIsLoading(false)
  }

  const getLocationString = () => {
    const { formatted_address } = selectedLocation
    return formatted_address ?? translate('screens.new.unknownLocation')
  }

  return (
    <View style={styles.mapContainer}>
      <UIText>{translate('screens.new.addLocationDescription')}</UIText>
      <MapView
        onRegionChange={setRegion}
        style={styles.map}
        rotateEnabled={false}
        showsUserLocation>
        <Marker
          coordinate={coordinate}
          onDragEnd={(e) => setCoordinate(e.nativeEvent.coordinate)}
          draggable
        />
      </MapView>
      <View style={styles.extraContainer}>
        <UIButton onPress={setCurrentLocation} disabled={isLoading} secondary>
          {translate('screens.new.useCurrentLocation')}
        </UIButton>
        {selectedLocation && <UIText>{getLocationString()}</UIText>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    minHeight: vh(50),
    borderRadius: 20,
  },
  extraContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 28,
  },
})

export default NewLocationForm
