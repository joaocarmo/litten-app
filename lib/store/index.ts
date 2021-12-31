import setupStore from 'store/configure-store'
const { store, persistor } = setupStore() as any
export { store, persistor }
