// utils/admin-routes.util.ts
import { routes } from 'src/app/app-routing.module';  // adjust path if needed

export function getAdminRoutes(): { name: string; route: string }[] {
  const adminRoutes: { name: string; route: string }[] = [];

  routes.forEach(route => {
    if (route.component?.name === 'AdminComponent' && Array.isArray(route.children)) {
      route.children.forEach(child => {
        if (child.path) {
          adminRoutes.push({
            name: formatRouteName(child.path),
            route: '/' + child.path
          });
        }
      });
    }
  });

  return adminRoutes;
}

function formatRouteName(path: string): string {
  // Make path human-friendly, e.g., "myprofile" => "Myprofile"
  return path.charAt(0).toUpperCase() + path.slice(1);
}
