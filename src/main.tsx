import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Layout from "./Layout/Layout.tsx"; // Pastikan import Layout, BUKAN App
import { Home } from "./pages/Home.tsx";
import { Contact } from "./pages/Contact.tsx";
import { Skills } from "./pages/Skills.tsx";
import { Hobbies } from "./pages/Hobbies.tsx";
import { Projects } from "./pages/Projects.tsx";
import { Education } from "./pages/Education.tsx";
import { Testimonials } from "./pages/Testimonials.tsx";
import Privacy from "./pages/Privacy.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout dipanggil langsung di sini
    children: [
      { index: true, element: <Home /> },
      { path: "contact", element: <Contact /> },
      { path: "skills", element: <Skills /> },
      { path: "hobbies", element: <Hobbies /> },
      { path: "projects", element: <Projects /> },
      { path: "education", element: <Education /> },
      { path: "testimonials", element: <Testimonials /> },
      { path: "privacy", element: <Privacy /> },
    ],
  },
]);

// Context kosong untuk HelmetProvider
const helmetContext = {};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);