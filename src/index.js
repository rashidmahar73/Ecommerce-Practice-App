import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { ErrorPage } from "./component/error/index.jsx";
import { ErrorPage } from "./component";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ProductDetail, Cart } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },  
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/productDetail",
    element: <ProductDetail />,
  },
]);
// let persistor=persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <PersistGate persistor={persistor}> */}
      <RouterProvider router={router} />
      {/* </PersistGate> */}
    </React.StrictMode>
  </Provider>
);
