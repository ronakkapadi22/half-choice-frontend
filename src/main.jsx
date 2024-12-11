import { createRoot } from 'react-dom/client'
import { PersistGate } from "redux-persist/integration/react";
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/index.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
)
