import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import {createAPI} from './services/api';
import {reducer} from './store/reducer';
import './styles/styles.scss';
require.context(`./`, true, /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/);

const api = createAPI();
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
    )
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
