'use client';

import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import RCFlexRoot from './RCFlexRoot';

export const RCFlex = forwardRef(function Flex(props, ref) {
  const {
    direction = 'row',
    align,
    justify,
    wrap,
    basis,
    grow,
    shrink,
    sx,
    ...rest
  } = props;

  const ownerState = {
    direction,
    align,
    justify,
    wrap,
    basis,
    grow,
    shrink,
  };

  return <RCFlexRoot ref={ref} ownerState={ownerState} sx={sx} {...rest} />;
});

RCFlex.propTypes = {
  direction: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  align: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  justify: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  wrap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  basis: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  grow: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
  shrink: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

RCFlex.displayName = 'RCFlex';
