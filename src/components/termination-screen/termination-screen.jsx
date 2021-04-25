import React, {useEffect, useState} from "react";
import Header from "../header/header";
import AsteroidCards from "../asteroid-cards/asteroid-cards";
import Footer from "../footer/footer";
import Button from "../button/button";
import {useDispatch, useSelector} from "react-redux";
import {needShowSpinner, needShowAsteroidsForTermination} from "../../store/selectors";
import {FilterType} from "../../const";
import {changeActiveFilter, clearTerminationList} from "../../store/action-creator";
import Spinner from "../spinner/spinner";

const TerminationScreen = () => {
  const isSpinnerShown = useSelector(needShowSpinner);
  const isAsteroidsForTerminationShown = useSelector(needShowAsteroidsForTermination);

  const dispatch = useDispatch();

  const onChangeActiveFilter = (filter) => {
    dispatch(changeActiveFilter(filter));
  };

  const [isToastShown, setIsToastShown] = useState(false);

  const onButtonClick = () => {
    dispatch(clearTerminationList());
    setIsToastShown(true);
  };

  useEffect(() => {
    onChangeActiveFilter(FilterType.TERMINATION_LIST);

    return () => onChangeActiveFilter(FilterType.All);
  }, []);

  if (isSpinnerShown) {
    return <Spinner />;
  }
  return <>
    <div className="container">
      <Header />
      <main>
        {
          !isToastShown
            ? <>
              <h2>Список астероидов на уничтожение</h2>
              {
                isAsteroidsForTerminationShown
                  ? `Список пуст`
                  : <>
                    <AsteroidCards />
                    <Button onClick={onButtonClick}>Уничтожить все астероиды</Button>
                  </>
              }
            </>
            : <div className="toast">
              <h2>Команда на уничтожение успешно отправлена.</h2>
              А так как сервер бы не ответил, просто зачистили список астероидов на уничтожение.
            </div>
        }
      </main>
    </div>
    <Footer />
  </>;
};

export default TerminationScreen;
