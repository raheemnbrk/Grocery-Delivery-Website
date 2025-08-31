import { createRoot } from "react-dom/client";
import './index.css'
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/appContext";

const root = createRoot(document.getElementById("root"))

root.render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
)