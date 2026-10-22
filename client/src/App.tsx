import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import RetrieverEssentials from "./pages/RetrieverEssentials";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Overview },
      { path: "retriever-essentials", Component: RetrieverEssentials },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
