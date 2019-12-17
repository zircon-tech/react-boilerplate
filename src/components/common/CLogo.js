import React from 'react';


const CLogo = ({
  width, 
  height, 
  src, 
  alt
}) => (
  <img style={{width, height}} src={src} alt={alt}/>
);

export default CLogo;