type RoutePathType = import('./const.ts').RoutePath;

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
