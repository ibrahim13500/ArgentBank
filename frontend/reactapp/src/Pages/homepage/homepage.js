import React from "react";
import Banner from "../../components/banner/banner";
import FeatureItems from "../../components/Featureitems/Featureitems";

// Features Icon
import Iconmoney from "../../designs/img/icon-money.webp";
import chatIcon from "../../designs/img/icon-chat.webp";
import Iconsecurity from "../../designs/img/icon-security.webp";

// Array of features
const features = [
  {
    iconUrl: chatIcon,
    title: "You are our #1 priority",
    text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
  },
  {
    iconUrl: Iconmoney,
    title: "More savings means higher rates",
    text: "The more you save with us, the higher your interest rate will be!",
  },
  {
    iconUrl: Iconsecurity,
    title: "Security you can trust",
    text: "We use top-of-the-line encryption to make sure your data and money is always safe.",
  },
];

export default function Home() {
  return (
    <main>
      <Banner />
      <section className="features">
        <h2 className="sr-only"></h2>
        {features.map((feature, index) => (
          <FeatureItems
            key={index}
            iconUrl={feature.iconUrl}
            title={feature.title}
            text={feature.text}
          />
        ))}
      </section>
    </main>
  );
}