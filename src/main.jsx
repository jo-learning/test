import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./shared/utils/ThemeContext.jsx";
import { CartCounterProvider } from "./shared/utils/CartCounter.jsx";
import { ProductProvider } from "./shared/utils/ProductContext.jsx";
// import { UserProvider } from "./shared/utils/UserContext.jsx";
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
