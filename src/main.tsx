import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Layout from "./Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
    <ToastContainer
      hideProgressBar={true}
      autoClose={5000}
      transition={Bounce}
      closeButton={false}
    />
  </StrictMode>
);
