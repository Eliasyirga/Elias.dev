import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Spinner } from "./Components/common/Spinner";
import { ErrorBoundary } from "./Components/common/ErrorBoundary";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/about",
    element: <AboutPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/projects/:slug",
    element: <ProjectDetailPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <ErrorBoundary />,
  },
]);

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<Spinner size="lg" label="INITIALIZING WORKSTATION..." className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950 text-zinc-900 dark:text-white" />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
