import { createFileRoute } from "@tanstack/react-router";
import Home from "../components/homepage";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-screen h-screen bg-red-100">
      <Home></Home>
    </div>
  );
}
