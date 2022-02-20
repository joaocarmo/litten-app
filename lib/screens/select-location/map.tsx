import { useCallback, useEffect, useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { UIButton, UILink, UILoader, UISeparator, UIText } from '@ui-elements'
import { useAppState } from '@hooks'
import Empty from '@components/empty'
import { ANIMATE_TIME, initialRegion } from '@config/location/initial-region'
import { locationSchema } from '@db/schemas/location'
import { getLocation, hasLocationPermission, openSetting } from '@utils/setup'
import { getReverseGeoInformation } from '@utils/network'
import { parseGoogleMapResponse, mapGoogleLocationKeys } from '@utils/functions'
import { UI_MAP_BORDER_RADIUS, UI_MAP_MIN_HEIGHT } from '@utils/constants'
import { translate } from '@utils/i18n'

const SelectLocationMapScreen = ({
  onLocationChange,
  initialCoordinates = {
    latitude: null,
    longitude: null,
  },
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasPermission, setHasPermission] = useState(false)
  const [goneToSettings, setGoneToSettings] = useState(false)
  const [region, setRegion] = useState({
    ...initialRegion,
    ...initialCoordinates,
  })
  const [coordinates, setCoordinates] = useState(initialCoordinates)

  const mapRef = useRef(null)

  const handleOnMapReady = useCallback(() => {
    setIsLoading(false)
  }, [])

  const setRegionCoordinate = useCallback((newRegion) => {
    const { latitude, longitude } = newRegion
    setRegion(newRegion)
    setCoordinates({
      latitude,
      longitude,
    })
  }, [])

  const setCurrentLocation = useCallback(
    async ({ forceUpdate = false, animateToRegion = false } = {}) => {
      if (
        !initialCoordinates.latitude ||
        !initialCoordinates.longitude ||
        forceUpdate
      ) {
        setIsLoading(true)
        const currentPosition = await getLocation()

        if (currentPosition?.coords) {
          const { latitude, longitude } = currentPosition?.coords ?? {}
          const newRegion = { ...initialRegion, latitude, longitude }

          setRegionCoordinate(newRegion)

          if (animateToRegion && mapRef && mapRef.current) {
            mapRef.current.animateToRegion(newRegion, ANIMATE_TIME)
          }
        }

        setIsLoading(false)
      }
    },
    [
      initialCoordinates.latitude,
      initialCoordinates.longitude,
      setRegionCoordinate,
    ],
  )

  const setLocation = useCallback(async () => {
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
  }, [coordinates, onLocationChange])

  const clearLocation = useCallback(
    () => onLocationChange(locationSchema),
    [onLocationChange],
  )

  const useCurrent = useCallback(() => {
    setCurrentLocation({
      forceUpdate: true,
      animateToRegion: true,
    })
  }, [setCurrentLocation])

  const checkPermission = useCallback(async () => {
    const isPermissionGranted = await hasLocationPermission()
    setHasPermission(isPermissionGranted)
    return isPermissionGranted
  }, [])

  const handleGoToSettings = useCallback(() => {
    setGoneToSettings(true)
    openSetting()
  }, [])

  useAppState((appState) => {
    if (goneToSettings && appState === 'active') {
      setGoneToSettings(false)

      if (checkPermission()) {
        setCurrentLocation()
      }
    }
  })

  useEffect(() => {
    setCurrentLocation()
    checkPermission()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (hasPermission === false) {
    return (
      <Empty header={translate('forms.mapHasNoPermissionsTitle')}>
        {translate('forms.mapHasNoPermissionsText')}
        <UILink onPress={handleGoToSettings}>
          {translate('feedback.system.goToSettings')}
        </UILink>
      </Empty>
    )
  }

  if (!region.latitude || !coordinates.latitude) {
    return (
      <View style={styles.mapLoaderContainer}>
        <UILoader active transparent />
      </View>
    )
  }

  return (
    <View style={styles.mapScreenContainer}>
      <UILoader active={isLoading} transparent />
      <UIText>{translate('forms.mapInstructions')}</UIText>
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={region}
          onMapReady={handleOnMapReady}
          style={styles.map}
          ref={mapRef}
        >
          <Marker
            draggable
            coordinate={coordinates}
            onDragEnd={(e) => setCoordinates(e.nativeEvent.coordinate)}
          />
        </MapView>
      </View>
      <UISeparator invisible small />
      <View style={styles.mapActions}>
        <UIButton onPress={setLocation} secondary disabled={isLoading}>
          {translate('cta.selectLocation')}
        </UIButton>
        <UISeparator invisible small />
        <UIButton onPress={useCurrent} primary disabled={isLoading}>
          {translate('cta.useCurrentLocation')}
        </UIButton>
        <UISeparator invisible small />
        <UIButton onPress={clearLocation} danger disabled={isLoading}>
          {translate('cta.clearLocation')}
        </UIButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapLoaderContainer: {
    flex: 1,
  },
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
