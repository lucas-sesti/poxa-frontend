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
            "https://api.whatsapp.com/send/?phone=5511914313468&text=Ol%C3%A1%2C+estou+com+d%C3%BAvidas+em+rela%C3%A7%C3%A3o+ao+evento+rol%C3%AA+do+poxa+e+gostaria+de+mais+informa%C3%A7%C3%B5es+dos+ingressos.&type=phone_number&app_absent=0",
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
