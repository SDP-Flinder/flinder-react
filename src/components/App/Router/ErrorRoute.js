/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";

export const Icon = {
  QUESTION_MARK: "question-mark.png",
  EXCLAMATION_MARK: "exclamation-mark.png",
};

/**
 * Dynamic error route
 * @param {String} title The error title
 * @param {Enum} icon The error icon
 * @param {Object} children the error text
 */
const ErrorRoute = ({
  title = "Oops!",
  icon = Icon.QUESTION_MARK,
  children = "The page you are looking for does not exist.",
}) => {
  const { PUBLIC_URL } = process.env;

  return (
    <section className="hero is-bold is-medium">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-1">
              <img
                src={`${PUBLIC_URL}/images/${icon}`}
                width="100px"
                alt="Error Icon"
              />
            </div>
            <div className="column">
              <h1 className="title">{title}</h1>
              <h2 className="subtitle">{children}</h2>
              <Link className="button" to="/">
                Take me Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorRoute;