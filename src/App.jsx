import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { remoteConfig, getValue, fetchAndActivate } from "./firebase";
import Routing from "./routes";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useDispatch } from "react-redux";
import { handleRemoteConfig } from "./redux/slices/common.slice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAndActivate(remoteConfig).then(() => {
      const values = getValue(remoteConfig, "home_data").asString();
      const offer = getValue(remoteConfig, "offer_home").asString();
      const seo = getValue(remoteConfig, "seo_meta").asString();
      dispatch(
        handleRemoteConfig({
          ...JSON.parse(values),
          offer: JSON.parse(offer),
          seo: JSON.parse(seo),
        })
      );
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
};

export default App;
