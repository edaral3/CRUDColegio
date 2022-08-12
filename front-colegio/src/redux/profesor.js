import axios from "axios";
import { setAlert } from "./alert";

const CREAR_PROFESOR = "CREAR_PROFESOR";

const profesor = {
  profesores: []
}

export default function profesorReducer(state = profesor, action) {
  switch (action.type) {
    case CREAR_PROFESOR:
      return { profesores: action.payload };
    default:
      return state;
  }
}

export const crearProfesor = (data) => async (dispatch) => {
  try {
    const profesor = {
      "Nombre": data[0],
      "Apellidos": data[1],
      "Genero": data[2] ? true : false,
    }
    await axios.post("/Profesor/", profesor);
    dispatch(setAlert({ tipo: "success", msj: "Profesor creado" }))
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Profesor creado" }))
  }
};

export const obtenerProfesor = (id, setData) => async (dispatch) => {
  try {
    let result = await axios.get("/Profesor?id=" + id);
    if (typeof result.data === 'string') {
      dispatch(setAlert({ tipo: "warning", msj: result.data }))
      return
    }
    result = result.data;
    setData([result.nombre, result.apellidos, result.genero])
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error obteniendo al Profesor" }))
  }
};

export const obtenerProfesores = () => async (dispatch) => {
  try {
    const result = await axios.get("/Profesor/all");
    const newresult = result.data.map(item => {
      item.genero = item.genero ? "Femenino" : "Masculino";
      return item
    });
    dispatch({
      type: CREAR_PROFESOR,
      payload: newresult
    })
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error obteniendo los profesores" }))
  }
}

export const modificarProfesor = (data, id) => async (dispatch) => {
  try {
    const profesor = {
      "Id": parseInt(id),
      "Nombre": data[0],
      "Apellidos": data[1],
      "Genero": data[2] ? true : false,
    }
    const result = await axios.put("/Profesor/", profesor);
    if (typeof result.data === 'string') {
      dispatch(setAlert({ tipo: "warning", msj: result.data }))
      return
    }
    dispatch(setAlert({ tipo: "success", msj: "Profesor modificado" }))
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error modificando al profesor" }))
  }
}

export const eliminarProfesor = (id, setData) => async (dispatch) => {
  try {
    const result = await axios.delete("/Profesor?id=" + id);
    if (result.data === 'El profesor no existe') {
      dispatch(setAlert({ tipo: "warning", msj: result.data }))
      return
    }
    setData(['', '', '', ''])
    dispatch(setAlert({ tipo: "success", msj: "Profesor eliminado" }))
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error eliminando al profesor" }))
  }
}