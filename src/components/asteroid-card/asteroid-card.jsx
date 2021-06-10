import React from "react";
import PropTypes from 'prop-types';
import Button from "../button/button";
import {AppRoute, Measure} from "../../const";
import {humanizeDate} from "../../utils/humanize-date";
import {useDispatch, useSelector} from "react-redux";
import {getDistanceMeasure, needChangeTerminationButton, getTerminationList} from "../../store/selectors";
import {addToTerminationList, removeFromTerminationList} from "../../store/action-creator";
import {Link} from "react-router-dom";
import AsteroidDescription from "../asteroid-description/asteroid-description";

const ButtonText = {
  TERMINATE: `На уничтожение`,
  NOT_TERMINATE: `Не уничтожать`,
};
const RATIO = 0.5;
const AsteroidInfoKey = {
  DATE: `Дата`,
  DISTANCE: `Расстояние`,
  DIAMETER: `Размер`,
  TIME: `Время`,
  VELOCITY: `Скорость`,
  ORBITE: `Орбита`,
};

const getDistance = (approachData, measure) => {
  let distance;
  switch (measure) {
    case Measure.KILOMETERS:
      distance = `${approachData.distanceInKilometers.value.toFixed(0)} ${approachData.distanceInKilometers.unit}`;
      break;
    case Measure.LUNAR:
      distance = `${approachData.distanceInLunar.value.toFixed(0)} ${approachData.distanceInLunar.unit}`;
      break;
  }

  return distance;
};

const getAsteroidInfo = (approachData, distanceMeasure, diameter, detailed) => {
  if (!detailed) {
    return [
      {
        key: AsteroidInfoKey.DATE,
        value: humanizeDate(approachData.date, `D MMMM YYYY`),
      },
      {
        key: AsteroidInfoKey.DISTANCE,
        value: getDistance(approachData, distanceMeasure),
      },
      {
        key: AsteroidInfoKey.DIAMETER,
        value: `${diameter.value.toFixed(0)} ${diameter.unit}`,
      }
    ];
  }

  return [
    {
      key: AsteroidInfoKey.DATE,
      value: humanizeDate(approachData.date, `D MMMM YYYY`),
    },
    {
      key: AsteroidInfoKey.TIME,
      value: humanizeDate(approachData.date, `HH:mm`),
    },
    {
      key: AsteroidInfoKey.DISTANCE,
      value: getDistance(approachData, distanceMeasure),
    },
    {
      key: AsteroidInfoKey.DIAMETER,
      value: `${diameter.value.toFixed(0)} ${diameter.unit}`,
    },
    {
      key: AsteroidInfoKey.VELOCITY,
      value: `${approachData.velocity.value.toFixed(1)} ${approachData.velocity.unit}`,
    },
    {
      key: AsteroidInfoKey.ORBITE,
      value: `${approachData.orbite}`,
    }
  ];
};

const AsteroidCard = ({asteroid, isFullscreenMode}) => {
  const distanceMeasure = useSelector(getDistanceMeasure);
  const isTerminationButtonChanged = useSelector(needChangeTerminationButton(asteroid.id));
  const terminationList = useSelector(getTerminationList);

  const dispatch = useDispatch();

  const diameter = asteroid.diameter.value;
  const imageSize = (diameter * RATIO).toFixed(0);
  const isDangerous = asteroid.isDangerous;
  const asteroidInfo = [];
  asteroid.approachData.map((data) => {
    asteroidInfo.push(getAsteroidInfo(data, distanceMeasure, asteroid.diameter, isFullscreenMode));
    if (isFullscreenMode) {
      return;
    }
  });

  const onButtonClick = (id) => {
    if (terminationList.includes(id)) {
      dispatch(removeFromTerminationList(id));
      return;
    }
    dispatch(addToTerminationList(id));
  };

  return <div className="asteroid-cards__item">
    <div className={`asteroid-card ${isDangerous ? `asteroid-card_theme_dangerous` : ``} ${isFullscreenMode && `asteroid-card_theme_fullscreen`}`}>
      <div className="flex-wrapper">
        <div className="asteroid-card__images flex-wrapper__item">
          <div className="asteroid-card__dino">
            <svg width="100%" height="100%" viewBox="0 0 56 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.8282 7.09339C45.0758 7.09339 45.3177 7.01999 45.5235 6.88247C45.7294 6.74494 45.8898 6.54948 45.9845 6.32078C46.0792 6.09209 46.104 5.84044 46.0557 5.59767C46.0074 5.35489 45.8882 5.13188 45.7132 4.95685C45.5382 4.78181 45.3152 4.66261 45.0724 4.61432C44.8296 4.56603 44.578 4.59081 44.3493 4.68554C44.1206 4.78027 43.9251 4.94068 43.7876 5.1465C43.6501 5.35232 43.5767 5.5943 43.5767 5.84183C43.5771 6.17362 43.7091 6.49169 43.9437 6.72631C44.1784 6.96092 44.4964 7.09293 44.8282 7.09339Z" fill="black"/>
              <path d="M37.7401 46.2577C37.5071 45.4464 36.8727 44.4206 36.176 43.7082C35.4793 42.9957 34.6173 42.4696 33.668 42.1775C32.8658 41.0961 32.3683 39.8165 32.2278 38.4739C34.9748 36.908 36.9961 34.3114 37.8512 31.2502C39.0264 30.9589 41.3704 30.1548 42.5091 28.2186C42.738 28.3909 42.9322 28.6055 43.0815 28.851C43.23 29.0799 43.4623 29.2404 43.7277 29.2976C43.9932 29.3549 44.2703 29.3041 44.4988 29.1565C44.8327 28.9536 45.2196 28.8569 45.6089 28.879C45.9982 28.9011 46.3719 29.0409 46.6812 29.2802C46.8171 29.3911 46.9788 29.4652 47.1511 29.4955C47.3233 29.5257 47.5004 29.5112 47.6656 29.4533C47.8307 29.3954 47.9784 29.296 48.0948 29.1645C48.2112 29.033 48.2923 28.8737 48.3306 28.7018C48.5568 27.7294 48.4603 26.7091 48.056 25.7972C47.6516 24.8854 46.9616 24.1323 46.0918 23.6535C47.0408 21.948 47.5412 20.0264 47.5455 18.0711C49.7872 17.5808 54.5915 16.2273 55.1644 13.5344C55.4667 12.4054 55.6392 11.2452 55.6786 10.0765C55.6574 9.9283 55.6047 9.78648 55.524 9.66077C55.4434 9.53505 55.3366 9.42842 55.2112 9.3482C55.0858 9.26799 54.9446 9.21607 54.7973 9.19604C54.6501 9.17601 54.5003 9.18833 54.3582 9.23215C52.5613 9.75521 50.7167 10.0948 48.8524 10.2458C48.9914 10.1274 49.133 10.0011 49.2772 9.86688C51.2686 8.00886 52.8293 7.38833 54.8389 7.64945C54.9839 7.66858 55.1313 7.65629 55.2713 7.61341C55.4112 7.57054 55.5405 7.49805 55.6504 7.40081C55.7603 7.30356 55.8483 7.1838 55.9086 7.04952C55.9689 6.91524 56.0001 6.76953 56 6.62215C56 6.42675 55.9606 1.82254 52.5566 0.440567C50.3866 -0.441078 49.2584 0.189514 48.3523 0.696356C47.9543 0.969323 47.4916 1.13113 47.0114 1.1653C46.8286 1.16945 46.6118 1.1653 46.3709 1.1653C43.9782 1.14162 38.3842 1.08892 37.4928 6.88504C37.414 7.39662 37.3453 7.88392 37.2789 8.34813C36.6519 12.7646 36.4168 14.4178 31.4257 15.5576C24.9591 17.0349 19.1965 19.2624 14.1595 31.6173C13.8346 32.5635 13.2314 33.3876 12.4303 33.9799C11.6292 34.5722 10.6681 34.9047 9.67488 34.9331C8.55516 34.9767 7.44494 34.7107 6.46449 34.164C5.48403 33.6173 4.6707 32.8107 4.1126 31.8316C3.30523 30.2116 3.62841 28.4158 5.04807 26.6371C5.21202 26.432 5.29235 26.1718 5.27273 25.9092C5.2531 25.6466 5.135 25.4014 4.94241 25.2234C4.74983 25.0454 4.49721 24.9479 4.2359 24.9509C3.97459 24.9538 3.72418 25.0569 3.53557 25.2391C3.38279 25.3871 -0.212773 28.9102 0.00992999 33.3131C0.133327 35.7887 1.41725 38.0043 3.82526 39.8985C5.90243 41.5844 8.4914 42.5 11.1586 42.4919C14.9898 42.4919 18.6835 40.7245 21.5592 38.8208C21.5673 39.5355 21.4083 40.242 21.095 40.8831C21.0248 41.0292 20.9896 41.1899 20.9923 41.3521C20.9949 41.5144 21.0353 41.6738 21.1103 41.8175C21.7894 43.2035 22.1807 44.7146 22.2602 46.2583C22.2602 46.5331 22.0674 47.8057 22.2602 48H37.973C37.973 47.7252 37.973 47.069 37.7401 46.2577ZM5.09096 38.2643C3.1783 36.7597 2.15998 35.0622 2.06479 33.2189C2.04971 32.9253 2.05678 32.631 2.08594 32.3385C2.14882 32.4912 2.21345 32.6345 2.2775 32.7612C3.01153 34.0969 4.09936 35.2008 5.41967 35.9498C6.73997 36.6988 8.24082 37.0634 9.75479 37.0031C11.1418 36.9585 12.4839 36.4967 13.6082 35.6772C14.7326 34.8576 15.5879 33.7177 16.0639 32.4042C20.7342 20.9505 25.7765 18.9729 31.8823 17.5779C38.2543 16.1231 38.6774 13.1466 39.3173 8.64123C39.3819 8.18471 39.4501 7.70511 39.5276 7.20182C40.0988 3.48872 43.3471 3.2057 46.3539 3.23471C46.6183 3.23471 46.8551 3.23886 47.059 3.23471C47.8747 3.19985 48.6669 2.94863 49.3554 2.50642C50.0887 2.09609 50.5306 1.848 51.7927 2.36017C53.1278 2.90195 53.6361 4.44734 53.83 5.51905C51.7528 5.56346 49.9142 6.45044 47.8852 8.3434C46.1259 9.98531 45.0564 9.93024 45.0858 9.93616C44.8281 9.89234 44.5635 9.94905 44.3458 10.0948C44.1281 10.2405 43.9736 10.4642 43.9137 10.7206C43.8539 10.9769 43.8931 11.2466 44.0235 11.4749C44.1539 11.7031 44.3657 11.8727 44.6157 11.9493C47.4703 12.7913 51.3409 12.1098 53.4486 11.6112C53.3793 11.9961 53.2847 12.4828 53.1548 13.0956C52.8822 14.3775 48.9828 15.7264 46.2728 16.2071C46.0111 16.2538 45.7775 16.4007 45.6208 16.617C45.4642 16.8333 45.3967 17.1023 45.4325 17.3677C45.751 19.7201 44.7197 21.9068 44.1298 22.9335C43.173 22.6086 42.1702 22.4424 41.1606 22.4414C41.0243 22.4513 40.8913 22.4885 40.7694 22.5508C40.6476 22.6131 40.5392 22.6992 40.4508 22.8042C40.3623 22.9092 40.2955 23.0308 40.2542 23.1621C40.213 23.2934 40.1981 23.4317 40.2105 23.5688C40.2229 23.7059 40.2623 23.8392 40.3263 23.9608C40.3904 24.0825 40.4779 24.19 40.5837 24.2772C40.6895 24.3643 40.8115 24.4293 40.9425 24.4685C41.0736 24.5076 41.211 24.52 41.3469 24.5049C42.3339 24.5767 43.3056 24.7913 44.232 25.142C44.242 25.1456 44.2526 25.142 44.2626 25.1473C44.2726 25.1527 44.2919 25.1616 44.3084 25.1657C44.7545 25.2441 45.1714 25.4421 45.5153 25.7388C45.8593 26.0355 46.1177 26.42 46.2634 26.852C45.5904 26.7301 44.8978 26.782 44.2502 27.003C43.9494 26.6464 43.5687 26.3671 43.1396 26.1882C42.7104 26.0093 42.2452 25.9358 41.7823 25.9739C41.596 26.0035 41.4213 26.0841 41.2774 26.2069C41.1335 26.3297 41.0258 26.49 40.9661 26.6702C40.5465 27.9373 39.1898 28.6372 38.1491 28.9996C38.1788 27.1347 37.7279 25.2939 36.8405 23.657C36.7743 23.5381 36.6855 23.4335 36.5792 23.3492C36.4729 23.2649 36.3511 23.2025 36.2209 23.1657C36.0906 23.1288 35.9544 23.1181 35.8201 23.1342C35.6858 23.1504 35.5559 23.193 35.4379 23.2597C35.3199 23.3264 35.2161 23.4159 35.1325 23.523C35.0488 23.6302 34.9869 23.7529 34.9503 23.8841C34.9137 24.0154 34.903 24.1526 34.9191 24.2879C34.9351 24.4233 34.9774 24.5542 35.0436 24.6731C35.9312 26.3527 36.2662 28.2732 36.0002 30.1572C35.6843 31.6071 35.0488 32.9669 34.1406 34.1359C33.2325 35.3048 32.0751 36.253 30.7541 36.9101C30.5649 36.9918 30.4044 37.1288 30.2934 37.3034C30.1824 37.478 30.1259 37.6822 30.1312 37.8895C30.1628 40.0582 30.9432 42.1481 32.3383 43.7999C32.4683 43.9369 32.6331 44.0354 32.8148 44.0847C33.3883 44.2256 33.9234 44.4939 34.3808 44.8698C34.8383 45.2458 35.2067 45.7199 35.459 46.2577H30.2499C29.7493 42.4842 27.6286 39.0476 26.7513 37.7622C27.3461 36.4469 27.5851 34.9966 27.4441 33.5582C27.7814 32.1348 27.6903 30.6424 27.1823 29.2715C26.6743 27.9005 25.7724 26.7131 24.5919 25.8608C24.375 25.6978 24.103 25.6274 23.835 25.6651C23.567 25.7027 23.3245 25.8453 23.1601 26.0619C22.9957 26.2785 22.9227 26.5517 22.9568 26.8222C22.991 27.0927 23.1296 27.3387 23.3426 27.5069C24.1941 28.0993 24.8514 28.9337 25.2306 29.9038C25.6099 30.8739 25.6939 31.9358 25.4721 32.9543C24.0278 34.4387 13.4091 44.81 5.09096 38.2666V38.2643ZM23.1487 41.3177C23.6351 40.0933 23.7437 38.7495 23.4601 37.462C24.11 36.9622 24.6941 36.4791 25.19 36.0456C25.0574 36.5051 24.8771 36.9493 24.6524 37.3708C24.559 37.5461 24.5178 37.7448 24.5335 37.9432C24.5492 38.1415 24.6213 38.3311 24.7411 38.4893C24.7717 38.5295 27.5352 42.2249 28.1698 46.2553h34.3122C24.2448 44.5499 23.8497 42.8738 23.1487 41.3201V41.3177Z" fill="black"/>
            </svg>
          </div>
          <div className="asteroid-card__asteroid">
            <svg width={imageSize} height={imageSize} viewBox="0 0 71 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.13589 42.1051C2.36992 45.5191 4.20391 49.2229 6.78391 51.3813C12.5054 56.1687 13.7315 57.7414 15.8437 67.3162C17.9558 76.891 27.7641 68.8204 27.7641 68.8204C27.7641 68.8204 30.6931 66.8368 35.603 69.6107C36.9618 70.2672 38.4768 70.5279 39.9758 70.3632C44.0627 70.1577 51.7468 68.4534 58.0079 59.4511C66.9994 46.5254 72.2442 42.6952 70.7461 31.2052C69.2479 19.7153 67.5443 13.7653 54.6023 11.7816C45.7795 10.4302 38.5101 5.73854 34.7721 2.89086C34.5185 2.6968 34.2596 2.51328 33.9955 2.33854C32.4592 1.31374 30.7357 0.605214 28.9247 0.254012C27.1137 -0.0971895 25.2514 -0.0840862 23.4455 0.292564C19.9865 1.06678 16.7762 2.69983 14.1085 5.04221C12.8682 6.09499 11.738 7.27186 10.7352 8.55461C9.02245 10.7441 7.68013 13.2017 6.76205 15.8288C5.47263 19.6214 3.93348 23.3237 2.15478 26.9113C1.18373 28.7584 0.523559 30.754 0.200971 32.8174C-0.254348 35.9433 0.0668137 39.1338 1.13589 42.1051Z" fill="#828A9E"/>
              <path d="M22.1791 64.9006C22.4632 64.9004 22.736 64.7889 22.9393 64.5898C23.1427 64.3907 23.2606 64.1197 23.2679 63.8345C23.463 57.2716 19.7696 54.0701 19.6113 53.9375C19.3896 53.7621 19.1087 53.68 18.8279 53.7084C18.5471 53.7368 18.2882 53.8735 18.1057 54.0897C17.9232 54.3059 17.8314 54.5847 17.8496 54.8675C17.8678 55.1503 17.9946 55.415 18.2033 55.6059C18.338 55.7226 21.252 58.3201 21.0894 63.7669C21.0851 63.9105 21.109 64.0536 21.1597 64.188C21.2105 64.3223 21.2871 64.4453 21.3852 64.5499C21.4833 64.6545 21.601 64.7387 21.7315 64.7977C21.862 64.8566 22.0028 64.8892 22.1459 64.8935L22.1791 64.9006Z" fill="#62667C"/>
              <path d="M7.28242 38.2739C7.32539 38.2738 7.36832 38.2711 7.41098 38.266C7.69785 38.2321 7.95959 38.0853 8.13867 37.8577C8.31775 37.6302 8.39952 37.3405 8.36602 37.0525C7.70571 31.4115 9.52658 28.6157 9.54495 28.5885C9.70929 28.3497 9.77245 28.0553 9.72054 27.7698C9.66863 27.4843 9.5059 27.2313 9.26815 27.0663C9.03039 26.9013 8.7371 26.8379 8.45278 26.89C8.16846 26.9421 7.9164 27.1055 7.75207 27.3442C7.65674 27.4812 5.43531 30.7688 6.20144 37.308C6.23287 37.5738 6.36021 37.8189 6.55939 37.9969C6.75857 38.1749 7.01578 38.2734 7.28242 38.2739Z" fill="#62667C"/>
              <path d="M50.4236 38.2739C50.5879 38.274 50.7501 38.2368 50.898 38.1651C51.046 38.0934 51.1759 37.9891 51.2781 37.8599C51.3803 37.7307 51.4521 37.58 51.4881 37.4191C51.5241 37.2581 51.5235 37.0911 51.4862 36.9304C50.3352 31.9762 45.7594 30.3947 43.5004 30.2507C43.212 30.2318 42.9279 30.3288 42.7107 30.5202C42.4934 30.7117 42.3608 30.9819 42.342 31.2715C42.3232 31.5611 42.4198 31.8463 42.6105 32.0644C42.8011 32.2825 43.0703 32.4157 43.3587 32.4345C43.5704 32.4495 48.2975 32.8429 49.3627 37.4274C49.4185 37.668 49.5537 37.8825 49.7463 38.0362C49.9389 38.1898 50.1776 38.2736 50.4236 38.2739Z" fill="#62667C"/>
              <path d="M61.9592 41.3736C62.2254 41.374 62.4825 41.2762 62.6816 41.0988C66.2429 37.9314 65.7007 32.6743 65.6762 32.4521C65.6443 32.1637 65.4996 31.8998 65.2739 31.7185C65.0482 31.5372 64.76 31.4533 64.4728 31.4853C64.1855 31.5173 63.9227 31.6626 63.7421 31.8892C63.5615 32.1158 63.478 32.4052 63.5099 32.6936C63.5142 32.7366 63.941 37.0551 61.236 39.4602C61.0703 39.6075 60.9532 39.8019 60.9002 40.0176C60.8472 40.2332 60.8609 40.46 60.9394 40.6677C61.0179 40.8754 61.1576 41.0542 61.3397 41.1803C61.5219 41.3064 61.738 41.3738 61.9592 41.3736Z" fill="#62667C"/>
              <path d="M37.7999 43.3801C39.8064 43.3801 41.4329 42.0941 41.4329 40.5078C41.4329 38.9215 39.8064 37.6355 37.7999 37.6355C35.7935 37.6355 34.1669 38.9215 34.1669 40.5078C34.1669 42.0941 35.7935 43.3801 37.7999 43.3801Z" fill="#62667C"/>
              <path d="M35.5563 57.1713C37.3806 55.508 38.223 53.4558 37.4379 52.5877C36.6527 51.7196 34.5373 52.3643 32.7129 54.0276C30.8886 55.691 30.0462 57.7431 30.8314 58.6113C31.6166 59.4794 33.732 58.8347 35.5563 57.1713Z" fill="#62667C"/>
              <path d="M53.5611 54.8512C54.5034 52.931 54.0346 50.7645 52.5138 50.0121C50.993 49.2597 48.9963 50.2064 48.0539 52.1265C47.1116 54.0467 47.5805 56.2132 49.1012 56.9656C50.622 57.7179 52.6187 56.7713 53.5611 54.8512Z" fill="#62667C"/>
              <path d="M20.6939 48.9003C22.3607 47.2268 21.951 44.1021 19.7788 41.9211C17.6065 39.7401 14.4944 39.3288 12.8275 41.0023C11.1607 42.6758 11.5704 45.8005 13.7427 47.9815C15.9149 50.1625 19.0271 50.5739 20.6939 48.9003Z" fill="#62667C"/>
              <path d="M26.1423 28.2182C29.9932 27.3959 32.6326 24.452 32.0375 21.6427C31.4424 18.8335 27.8383 17.2228 23.9873 18.0451C20.1364 18.8674 17.497 21.8113 18.0921 24.6206C18.6872 27.4298 22.2914 29.0405 26.1423 28.2182Z" fill="#62667C"/>
              <path d="M10.7352 8.55197C13.1412 10.3819 16.8573 11.556 21.029 11.556C28.288 11.556 34.1678 8.00228 34.1678 3.62231C34.1672 3.18873 34.1084 2.7572 33.9929 2.33941C32.4566 1.31461 30.733 0.606084 28.9221 0.254882C27.1111 -0.0963198 25.2487 -0.0832164 23.4429 0.293434C19.9849 1.0678 16.7755 2.70053 14.1085 5.0422C12.8684 6.09416 11.7381 7.27014 10.7352 8.55197Z" fill="#62667C"/>
              <path d="M49.8008 18.14C50.2101 18.14 50.4664 18.1206 50.5136 18.1171C50.8017 18.0938 51.0688 17.9566 51.2561 17.7356C51.4434 17.5146 51.5356 17.228 51.5124 16.9387C51.4892 16.6495 51.3525 16.3813 51.1324 16.1933C50.9123 16.0052 50.6268 15.9126 50.3387 15.9359C50.2626 15.9421 45.2548 16.2872 42.2244 13.0812C42.0253 12.8708 41.751 12.7484 41.462 12.741C41.173 12.7336 40.893 12.8418 40.6834 13.0417C40.4738 13.2416 40.3519 13.517 40.3446 13.8071C40.3372 14.0973 40.4449 14.3785 40.644 14.5889C43.6841 17.8028 48.0867 18.14 49.8008 18.14Z" fill="#62667C"/>
            </svg>
          </div>
        </div>
        <div className="asteroid-card__description flex-wrapper__item">
          {// eslint-disable-next-line
          <Link className="link" to={AppRoute.ASTEROID(asteroid.id)}>
              <h3 className="asteroid-card__title">{asteroid.name}</h3>
            </Link>
          }
          {
            isFullscreenMode && <h4>Все сближения:</h4>
          }
          {
            asteroidInfo.map((info, index) => {
              return <AsteroidDescription key={index} asteroidInfo={info} />;
            })
          }
        </div>
        <div className="asteroid-card__estimate flex-wrapper__item">
          Оценка:
          <div className="asteroid-card__status">{isDangerous || `не `}опасен</div>
          <Button onClick={onButtonClick} id={asteroid.id} terminate={isTerminationButtonChanged}>{!isTerminationButtonChanged ? ButtonText.TERMINATE : ButtonText.NOT_TERMINATE}</Button>
        </div>
      </div>
    </div>
  </div>;
};
AsteroidCard.propTypes = {
  asteroid: PropTypes.object.isRequired,
  isFullscreenMode: PropTypes.bool,
};

export default AsteroidCard;
