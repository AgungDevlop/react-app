import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Layout from "./Layout/Layout.tsx";
import { Home } from "./pages/Home.tsx";
import { Contact } from "./pages/Contact.tsx";
import { Skills } from "./pages/Skills.tsx";
import { Hobbies } from "./pages/Hobbies.tsx";
import { Projects } from "./pages/Projects.tsx";
import { Education } from "./pages/Education.tsx";
import { Testimonials } from "./pages/Testimonials.tsx";
import Privacy from "./pages/Privacy.tsx";
import NotFound from "./pages/NotFound.tsx";

const currentPath = window.location.pathname;
if (currentPath.endsWith("index.html")) {
  const newPath = currentPath.replace(/index\.html$/, "") || "/";
  window.history.replaceState({}, "", newPath);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "contact", element: <Contact /> },
      { path: "skills", element: <Skills /> },
      { path: "hobbies", element: <Hobbies /> },
      { path: "projects", element: <Projects /> },
      { path: "education", element: <Education /> },
      { path: "testimonials", element: <Testimonials /> },
      { path: "privacy", element: <Privacy /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);