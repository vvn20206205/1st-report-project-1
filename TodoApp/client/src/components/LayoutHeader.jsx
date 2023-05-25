import React from 'react';
import { NavLink } from 'react-router-dom';

export default function LayoutHeader() {
  return (
    <>
      <nav id="header" className="bg-primary navbar navbar-expand-lg navbar-dark mb-4 fixed-top">
        <NavLink exact="true" to={'/'} activeclassname="active">
          <i className="fa fa-home"></i>
          Home
        </NavLink>
        <NavLink exact={true.toString()} to={'/add_job/'} activeclassname="active">
          <i className="fa-solid fa-circle-plus"></i>
          Add new job
        </NavLink>
      </nav>
      <div className="my-space"></div>
    </>
  );
}
