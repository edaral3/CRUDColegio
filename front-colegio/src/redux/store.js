import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import alumnoReducer from "./alumno";
import profesorReducer from "./profesor";
import alertReducer from "./alert";
import gradoReducre from "./grado";
import seccionReducre from "./seccion";
import axios from "axios";

// axios configuration
axios.defaults.baseURL = "http://localhost:52966/api/";

const rootReducer = combineReducers({
  alumno: alumnoReducer,
  seccion: seccionReducre,
  profesor: profesorReducer,
  grado: gradoReducre,
  alert: alertReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
