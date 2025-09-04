// App.jsx
import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FancySpinner from "./Components/FancySpinner"; // your attractive spinner

// Lazy load pages for better performance
const Home = lazy(() => import("./Pages/Home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <Suspense fallback={<FancySpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
