import 'wdyr';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import {loadDevTools} from 'imooc-jira-tool';
import { DevTools, loadServer } from "jira-dev-tool";
import { AppProviders } from "context";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
loadServer(() => root.render(
  <React.StrictMode>
    <AppProviders>
      <DevTools />
      <App />
    </AppProviders>
   
  </React.StrictMode>,
))


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
