jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }) => children,
}))
