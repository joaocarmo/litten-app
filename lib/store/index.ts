import setupStore from '@store/configure-store'

const { store, persistor } = setupStore()

export { store, persistor }
