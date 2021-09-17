import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../App/Authentication";

const Logout = () => {
  const { signout, isAuthed } = useAuth();
  let { from } = { from: { pathname: "/login" } };

  signout();

  return (
    <>
      {isAuthed && <Redirect to={from} />}
      <section className="section">
        <div className="container">
          <h2 className="title">Logging out</h2>
          <p className="subtitle">Please wait while we log you out.</p>
        </div>
      </section>
    </>
  );
};

export default Logout;