import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./utils/ThemeContext.jsx";
import { CartCounterProvider } from "./utils/CartCounter.jsx";
import { ProductProvider } from "./utils/ProductContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <CartCounterProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CartCounterProvider>
    </ThemeProvider>
  </StrictMode>
);
