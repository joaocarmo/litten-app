const PushNotification = {
  addEventListener: jest.fn(),
  configure: jest.fn(),
  createChannel: jest.fn(),
  getApplicationIconBadgeNumber: jest.fn(),
  onNotification: jest.fn(),
  onRegister: jest.fn(),
  requestPermissions: jest.fn(),
  setApplicationIconBadgeNumber: jest.fn(),
}
export default PushNotification
