import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="box">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}
