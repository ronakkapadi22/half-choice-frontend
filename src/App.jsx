<<<<<<< HEAD
import { Provider } from "react-redux";
import { store } from "./redux";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";

const App = () => {
  return (
    <Provider {...{ store }}>
      <BrowserRouter>
        <Routing />
=======
import { Provider } from "react-redux"
import { persistor, store } from "./redux"
import { BrowserRouter } from "react-router-dom"
import Routing from "./routes"
import { PersistGate } from "redux-persist/integration/react"

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routing/>
>>>>>>> 26b7274abe08c8808ba0e85b3aec95c0801d2909
      </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
