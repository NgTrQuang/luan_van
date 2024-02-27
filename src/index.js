import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter } from "react-router-dom";
// import { createRoot } from "react-dom/client";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { CartProvider } from "./components/context/CartContext";
import { UserProvider } from "./components/context/UserContext";

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container);
root.render(
  <UserProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </UserProvider>,
  
);

serviceWorker.unregister();