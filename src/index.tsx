import ReactDOM from "react-dom/client";
import "normalize.css";
import "./styles/style.scss";
import { Provider } from "react-redux";
import store from "./store";
import AppRoutes from "routes/routes";
import { Toaster } from "react-hot-toast";
import { toasterOptions } from "./utils/toaster/toaster.utils";
import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import styles from "./index.module.scss";
import { colorFeedbackSuccessMedium } from "./styles/settings/styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

declare global {
  interface Window {
    Mercadopago: any;
  }
}

window.Mercadopago = window.Mercadopago || {};

root.render(
  <Provider store={store}>
    <Toaster toastOptions={toasterOptions} />

    <main>
      <div
        onClick={() => {
          window.open(
            "https://wa.me/message/YZRHDLUCEERKF1",
            "_blank"
          );
        }}
        className={styles["c-index__whatsapp"]}
      >
        <BsWhatsapp className={styles["c-index__whatsapp-icon"]} size={38} />
      </div>

      <AppRoutes />
    </main>
  </Provider>
);
