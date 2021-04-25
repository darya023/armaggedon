import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";

const NotFoundScreen = () => {
  return <>
    <div className="container">
      <Header />
      <h2>Страница не найдена</h2>
    </div>
    <Footer />
  </>;
};

export default NotFoundScreen;
