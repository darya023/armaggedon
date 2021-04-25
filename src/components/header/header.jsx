import React from "react";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

const Header = () => {
  let history = useHistory();
  let path = history.location.pathname;

  return <header className="header">
    <div className="flex-wrapper flex-wrapper_align_top">
      <div className="header__text flex-wrapper__item">
        <Link className="link" to={AppRoute.MAIN}>
          <h1 className="title">ARMAGGEDON V</h1>
        </Link>
        <div>Сервис мониторинга и уничтожения астероидов, опасно подлетающих к Земле.</div>
      </div>
      <div className="header__nav flex-wrapper__item">
        <nav className="tabs">
          <Link className={`link tabs__item ${AppRoute.MAIN === path && `tabs__item_active`}`} to={AppRoute.MAIN}>
            Астероиды
          </Link>
          <Link className={`link tabs__item ${AppRoute.TERMINATION === path && `tabs__item_active`}`} to={AppRoute.TERMINATION}>
            Уничтожение
          </Link>
        </nav>
      </div>
    </div>
  </header>;
};

export default Header;
