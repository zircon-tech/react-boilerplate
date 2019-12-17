import React from 'react';

const CInput = ({onChange, ...rest}) => (
  <input
    onChange={
      (e) => onChange && onChange(e.target.value)
    }
    {...rest}
  />
);

export default CInput;
