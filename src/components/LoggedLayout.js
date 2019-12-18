import React from 'react';
import Header from './header/NavBarHeader';

const LoggedLayout = ({children}) => (
  <>
    <Header/>
    <section className="container-fluid h-100 px-4 px-md-5 py-md-5">
      <div className="row justify-content-sm-center mt-4 mb-5">
        <div className="col-lg-12 bg-light rounded p-3 p-md-5 text-center">
          <div className="mb-5">
            {children}
          </div>
        </div>
      </div>
    </section>
  </> 
);
export default LoggedLayout;