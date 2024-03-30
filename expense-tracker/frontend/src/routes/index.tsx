import pb from "@/_pocketbase/pocketbase";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async ({ location }) => {
    if (!pb.authStore.isValid) {
      throw redirect({
        to: "/authentication",
        search: {
          redirect: location.href,
        },
      });
    }
    if (pb.authStore.isValid) {
      throw redirect({
        to: "/dashboard",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
