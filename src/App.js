import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
