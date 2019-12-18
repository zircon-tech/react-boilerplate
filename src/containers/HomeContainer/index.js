import React from "react";
import Welcome from "./welcome";
import LoggedLayout from "../../components/LoggedLayout";

const Home = () => (
  <LoggedLayout>
    <Welcome />
  </LoggedLayout>
);

export default Home;
