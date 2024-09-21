// Import modules:
import React from "react";
import "./Home.scss";
import Banner from "../../components/banner/banner";
import Card from "../../components/card/Card";

const Home = () => {
  return (
    <main className="container__home">
      <Banner />
      <Card />
    </main>
  );
};

// Export Home :
export default Home;
