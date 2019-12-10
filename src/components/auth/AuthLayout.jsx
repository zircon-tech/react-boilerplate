import React from 'react';

const AuthLayout = ({header, links, children}) => (
  <section className="container-fluid h-100 px-4 px-md-5 py-md-5">
    <div className="row justify-content-sm-center mt-4 mb-5">
      <div className="col-sm-8 col-md-5 col-lg-4 bg-light rounded p-3 p-md-5 text-center">
        <div className="col-lg-12 mb-5">
          <h2>{header}</h2>
        </div>
        <div className="col-lg-10 mb-4 mx-auto">
          {children}
        </div>
        {links}
      </div>
    </div>
  </section>
);
export default AuthLayout;