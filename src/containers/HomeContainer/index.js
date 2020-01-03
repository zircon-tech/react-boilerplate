import React from "react";
import Welcome from "./welcome";
import LoggedLayout from "../../Components/loggedLayout";

const Home = () => (
  <LoggedLayout>
    <Welcome />
  </LoggedLayout>
);

export default Home;
