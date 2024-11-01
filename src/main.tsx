import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { Contact } from "./pages/Contact.tsx";
import { Skills } from "./pages/Skills.tsx"; // Import the Skills component
import { Hobbies } from "./pages/Hobbies.tsx"; // Import the Hobbies component
import { Projects } from "./pages/Projects.tsx"; // Import the Projects component
import { Education } from "./pages/Education.tsx"; // Import the Education component
import { Testimonials } from "./pages/Testimonials.tsx"; // Import the Testimonials component
import Privacy from "./pages/Privacy.tsx"; // Import the Privacy component

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/skills",
        element: <Skills />, // Add Skills route
      },
      {
        path: "/hobbies",
        element: <Hobbies />, // Add Hobbies route
      },
      {
        path: "/projects",
        element: <Projects />, // Add Projects route
      },
      {
        path: "/education",
        element: <Education />, // Add Education route
      },
      {
        path: "/testimonials",
        element: <Testimonials />, // Add Testimonials route
      },
      {
        path: "/privacy",
        element: <Privacy />, // Add Privacy route
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
