import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import NavbarLayout from "./-components/Navbar";
import pb from "@/_pocketbase/pocketbase";

export const Route = createFileRoute("/_private")({
  component: PrivateLayout,
  beforeLoad: async ({ location }) => {
    if (!pb.authStore.isValid) {
      throw redirect({
        to: "/authentication",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function PrivateLayout() {
  return (
    <div className="flex">
      <NavbarLayout />
      <div className="w-full p-4">
        <Outlet />
      </div>
    </div>
  );
}
