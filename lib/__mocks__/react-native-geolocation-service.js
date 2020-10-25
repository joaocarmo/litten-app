// __mocks__/react-native-geolocation-service.js

const Geolocation = {
  requestAuthorization: jest.fn(),
  getCurrentPosition: jest.fn(),
}

export default Geolocation
