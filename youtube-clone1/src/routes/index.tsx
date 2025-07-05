import { createFileRoute } from "@tanstack/react-router";
import Home from "../components/homepage";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Home></Home>;
}
