const storage = () => ({
  ref: jest.fn(() => ({
    delete: () => Promise.resolve(true),
  })),
  putFile: jest.fn(() => Promise.resolve(true)),
  getDownloadURL: jest.fn(() => Promise.resolve(true)),
})

export default storage
