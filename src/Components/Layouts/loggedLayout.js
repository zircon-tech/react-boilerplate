import React from 'react';
import Header from '../Header';

const LoggedLayout = ({children}) => (
  <>
    <Header/>
    <section className="container-fluid h-100 px-4 px-md-5 py-md-5">
      <div className="row justify-content-center">
        <div className="col-lg-12 bg-light rounded text-center">
          <div className="mb-5">
            {children}
          </div>
        </div>
      </div>
    </section>
  </> 
);
export default LoggedLayout;