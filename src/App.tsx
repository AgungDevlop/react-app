import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "./Layout/Layout.tsx"; // Sesuaikan dengan jalur Anda

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
