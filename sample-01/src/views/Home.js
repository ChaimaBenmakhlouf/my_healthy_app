import React, { Fragment } from "react";
// import PrescriptionView from "./PrescriptionView";

import Hero from "../components/Hero";
import Content from "../components/Content";

const Home = () => (
  <Fragment>
    <Hero />
    <hr />
    {/* <h1>Welcome to the Prescription Manager</h1> */}
    {/* <PrescriptionView /> */}
    <Content />
  </Fragment>
);

export default Home;
