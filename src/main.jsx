// basic imports
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// importing app
import App from "./App";
// importing css
import "./index.css";
// importing redux
import { Provider } from "react-redux";
import store from "./app/store";
// importing toastify
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// creating a root element
const root = document.getElementById("root");
const rootInstance = createRoot(root);

// rendering the app
rootInstance.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
      <App />
    </BrowserRouter>
  </Provider>
);
