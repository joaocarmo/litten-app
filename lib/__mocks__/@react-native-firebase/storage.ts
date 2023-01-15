const storage = () => ({
  ref: jest.fn(() => ({
    delete: () => Promise.resolve(true),
  })),
  putFile: jest.fn(() => Promise.resolve(true)),
  getDownloadURL: jest.fn(() => Promise.resolve(true)),
  useEmulator: jest.fn(),
})

export default storage
