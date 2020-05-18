/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import {
  ActionSheetIOS,
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  View,
} from 'react-native'
import { UIButton, UIText } from 'ui-elements'
import { vh } from 'react-native-expo-viewport-units'
import MapView, { Marker } from 'react-native-maps'
import {
  getExternalGeoInformation,
  getReverseGeoInformation,
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

const NewLocationForm: () => React$Node = ({
  authenticatedUser: { location },
  setLocation,
  setCountry,
}) => {
  const [region, setRegion] = useState(initialRegion)
  const [coordinate, setCoordinate] = useState(null)
  const [selectLocation, setSelectedLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const { latitude, longitude } = region
    setCoordinate({ latitude, longitude })
  }, [region])

  /*
  const setLocationInfo = async () => {
    setIsLoading(true)
    const data = await getReverseGeoInformation(coordinate)
    if (data) {
      const [first] = data
      setSelectedLocation(first)
    }
    setIsLoading(false)
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
        administrativeArea4: region_name,
        administrativeArea5: city,
        country: country_name,
      })
    }
    setIsLoading(false)
  }

  const setProfileLocation = () => {
    setSelectedLocation(location)
  }

  const useExistingLocation = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            translate('cta.cancel'),
            translate('screens.new.useCurrentLocation'),
            translate('screens.new.useProfileLocation'),
          ],
          destructiveButtonIndex: null,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            setCurrentLocation()
          } else if (buttonIndex === 2) {
            setProfileLocation()
          }
        },
      )
    } else {
      Alert.alert(translate('feedback.errorMessages.notImplemented'))
    }
  }

  const chooseLocation = () => {}

  return (
    <View style={styles.mapContainer}>
      <UIText>{translate('screens.new.addLocationDescription')}</UIText>
      <MapView
        onRegionChange={setRegion}
        style={styles.map}
        rotateEnabled={false}
        showsUserLocation>
        {coordinate?.latitude && (
          <Marker
            coordinate={coordinate}
            onDragEnd={(e) => setCoordinate(e.nativeEvent.coordinate)}
            draggable
          />
        )}
      </MapView>
      <View style={styles.extraContainer}>
        <UIButton onPress={useExistingLocation} disabled={isLoading} secondary>
          {translate('screens.new.useExistingLocation')}
        </UIButton>
      </View>
      <View style={styles.extraContainer}>
        <UIButton onPress={chooseLocation} disabled={isLoading}>
          {translate('cta.done')}
        </UIButton>
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
    marginTop: 14,
  },
})

export default NewLocationForm
