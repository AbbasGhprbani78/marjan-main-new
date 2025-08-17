"use client";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastContainerCustom({
  position = "top-left",
  autoClose = 3000,
  theme = "light",
}) {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
      transition={Slide}
    />
  );
}

export function errorMessage(text) {
  toast.error(text);
}
export function warningMessage(text) {
  toast.warning(text);
}
export function successMessage(text) {
  toast.success(text);
}
export function infoMessage(text) {
  toast.info(text);
}
export function defaultMessage(text) {
  toast(`🦄 ${text}`);
}
