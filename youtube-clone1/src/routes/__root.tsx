import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/navbar";
export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar></Navbar>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
