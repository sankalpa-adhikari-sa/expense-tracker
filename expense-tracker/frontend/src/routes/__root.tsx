import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import NavbarLayout from "./-components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import pb from "@/_pocketbase/pocketbase";
import Auth from "./(authentication)/authentication";
export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {pb.authStore.isValid ? (
        <div className="flex">
          <NavbarLayout />
          <div className="w-full p-4">
            <Outlet />
          </div>
          <TanStackRouterDevtools />
        </div>
      ) : (
        <Auth />
      )}
    </ThemeProvider>
  ),
});
