type RoutePathType = import('./const').RoutePath;

interface NavItem {
  icon: React.ReactNode;
  text: string;
}

interface ClientRoute {
  path: RoutePathType;
  element: ReactComponent;
  isPrivate: boolean;
  navItemProps?: NavItem;
}
