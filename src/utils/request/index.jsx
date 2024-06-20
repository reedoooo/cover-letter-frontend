import { useAuthStore } from 'contexts/AuthProvider';
import request, { setAuthToken } from './axios';

const useHttp = () => {
  const { state: authState, actions: authActions } = useAuthStore();

  const updateAuthToken = () => {
    const token = authState.token;
    const expiresIn = authState.expiresIn;
    setAuthToken(token, expiresIn);
  };

  const http = ({
    url,
    data,
    method,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest,
  }) => {
    const successHandler = res => {
      if (res.data.status === 'Success' || typeof res.data === 'string') {
        return res.data;
      }

      if (res.data.status === 'Unauthorized') {
        authActions.removeToken();
        window.location.reload();
      }

      return Promise.reject(res.data);
    };

    const failHandler = error => {
      afterRequest?.();
      throw new Error(error?.message || 'Error');
    };

    beforeRequest?.();
    updateAuthToken();

    method = method || 'GET';

    const params = Object.assign(
      typeof data === 'function' ? data() : data ?? {},
      {}
    );

    return method === 'GET'
      ? request
          .get(url, { params, signal, onDownloadProgress })
          .then(successHandler, failHandler)
      : request
          .post(url, params, { headers, signal, onDownloadProgress })
          .then(successHandler, failHandler);
  };

  const get = options => {
    return http({ ...options, method: 'GET' });
  };

  const post = options => {
    return http({ ...options, method: 'POST' });
  };

  return { get, post };
};

export default useHttp;
