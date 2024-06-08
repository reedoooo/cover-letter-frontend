import { useNavigate } from 'react-router-dom';
import routes from '@/routes';

const useNavigation = () => {
  const navigate = useNavigate();

  const getRoute = name => {
    const route = routes?.find(route => route.name === name);
    if (route) {
      return route.layout + route.path;
    }
    return null;
  };

  const navigateTo = name => {
    const path = getRoute(name);
    if (path) {
      navigate(path);
    } else {
      console.error(`Route with name ${name} not found.`);
    }
  };

  return {
    navigateTo,
    getRoute,
  };
};

export default useNavigation;
