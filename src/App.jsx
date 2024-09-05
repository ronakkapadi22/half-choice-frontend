import { Provider } from "react-redux";
import { persistor, store } from "./redux";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";
import { PersistGate } from "redux-persist/integration/react";

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
