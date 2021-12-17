import React from 'react';
import ReactDOM from 'react-dom';
import './assets/tailwind.css'; //defined in package.json
import store from './store/store.js';
import { ProvideTranslation } from './hooks/useTranslation';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import App from './App';
import { ProvideDisplayedContent } from './hooks/useDisplayedContent';

const appStore = store.create();




ReactDOM.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <ProvideDisplayedContent>
      <ProvideTranslation>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProvideTranslation>
      </ProvideDisplayedContent>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
