import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

const PageContainer = ({ title, description, children }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </div>
  );
};
PageContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default PageContainer;
