import { useToken } from '../store/useUserStore';
import { PrivateLayout } from './PrivateLayout';
import { PublicLayout } from './PublicLayout';

export const Layouts = () => {
  const token = useToken();

  if (!token) {
    return <PublicLayout />;
  }

  return <PrivateLayout />;
};
