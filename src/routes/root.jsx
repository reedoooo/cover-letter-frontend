import { useLoaderData, Link, Outlet, Navigate } from 'react-router-dom';
import { NavRouterProvider } from 'contexts/NavRouterProvider';
import pathData from './routes.json';
const validatePathInputs = inputPath => {
  const routePaths = pathData.find(item => item.id === 'route-paths').array;
  const routeLinks = Object.values(
    pathData.find(item => item.id === 'link-paths').data
  );

  return routePaths.includes(inputPath) || routeLinks.includes(inputPath);
};
// action
export async function action() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    console.log('User:', user);
    const userToken = localStorage.getItem('userToken');
    return { user, userToken };
  }
  return console.log('No user data found');
}
// loader
export async function loader(rtp) {
  // Fetchers
  const fetchers = {
    // base: () => fetcher('base'),
    // test: () => fetcher('test'),
    // admin: () => fetcher('admin'),
    // auth: () => fetcher('auth'),
  };
  const fetchData = async rt => {
    const data = await fetchers[rt]();
    return data;
  };
  const validatePath = validatePathInputs(rtp);
  if (!validatePath) {
    return {
      status: 404,
      statusText: 'Not Found',
    };
  }
  // utility function
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  const debouncedFetchLocalData = async () =>
    debounce(await fetchData(rtp), 1000);

  try {
    const data = await debouncedFetchLocalData();
    return data;
  } catch {
    throw new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
export default function Root() {
  return (
    <NavRouterProvider>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '0 2rem' }}>
          <Outlet />
        </div>
      </div>
    </NavRouterProvider>
  );
}
