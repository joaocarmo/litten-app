import { render as rtlRender } from '@testing-library/react-native'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import GlobalProvider from '@utils/tests/global-provider'
import rootReducer from '@store/reducers'

const render = (
  ui,
  {
    preloadedState = {},
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = {},
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <GlobalProvider>{children}</GlobalProvider>
    </Provider>
  )

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// Re-export everything
export * from '@testing-library/react-native'

// Override render method
export { render }
