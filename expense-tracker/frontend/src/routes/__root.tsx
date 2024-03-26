import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import NavbarLayout from "./-components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex">
        <NavbarLayout />
        <div className="w-full p-4">
          <Outlet />
        </div>
        <TanStackRouterDevtools />
      </div>
    </ThemeProvider>
  ),
});
