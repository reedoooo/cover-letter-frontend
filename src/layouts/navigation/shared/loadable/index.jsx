import React, { Suspense } from 'react';

export const Loadable = Component => {
  const WrappedComponent = props => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
  WrappedComponent.displayName = `Loadable(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
};

Loadable.displayName = 'Loadable';

export default Loadable;
