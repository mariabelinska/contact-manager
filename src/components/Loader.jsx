import React from 'react';
import { ClipLoader } from 'react-spinners';

export const Loader = () => (
  <div className="clip-loader">
    <ClipLoader sizeUnit={'px'} size={150} color={'grey'} loading={true} />
  </div>
);
