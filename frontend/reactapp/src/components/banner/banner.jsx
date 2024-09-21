// Import modules:
import React from "react";
import "../banner/banner.scss";

const Banner = () => {
  const listBanner = [
    {
      id: 1,
      content: "No fees.",
    },
    {
      id: 2,
      content: "No minimum deposit.",
    },
    {
      id: 3,
      content: "High interest rates.",
    },
  ];

  return (
    <section className="banner">
      <div className="banner__content">
        <h2>Promoted Content</h2>
        <ul>
          {listBanner.map((list) => {
            return <li key={list.id}>{list.content}</li>;
          })}
        </ul>
        <p>Open a savings account with Argent Bank today!</p>
      </div>
    </section>
  );
};

// Export Banner
export default Banner;
