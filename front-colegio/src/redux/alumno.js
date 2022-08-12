import axios from "axios";
import { setAlert } from "./alert";

const CREAR_ALUMNO = "CREAR_USUARIO";

const alumno = {
  alumnos: []
}

export default function alumnoReducer(state = alumno, action) {
  switch (action.type) {
    case CREAR_ALUMNO:
      return { alumnos: action.payload };
    default:
      return state;
  }
}

export const crearAlumno = (data) => async (dispatch) => {
  try {
    const alumno = {
      "Nombre": data[0],
      "Apellidos": data[1],
      "Genero": data[2] ? true : false,
      "FechaNacimiento": data[3]
    }
    await axios.post("/Alumno/", alumno);
    dispatch(setAlert({ tipo: "success", msj: "Alumno creado" }))
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Alumno creado" }))
  }
};

export const obtenerAlumno = (id, setData) => async (dispatch) => {
  try {
    let result = await axios.get("/Alumno?id=" + id);
    if (typeof result.data === 'string') {
      dispatch(setAlert({ tipo: "warning", msj: result.data }))
      return
    }
    result = result.data;
    setData([result.nombre, result.apellidos, result.genero, result.fechaNacimiento.split('T')[0]])
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error obteniendo al alumno" }))
  }
};

export const obtenerAlumnos = () => async (dispatch) => {
  try {
    const result = await axios.get("/Alumno/all");
    const newresult = result.data.map(item => {
      item.genero = item.genero ? "Femenino" : "Masculino";
      return item
    });
    dispatch({
      type: CREAR_ALUMNO,
      payload: newresult
    })
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error obteniendo los alumnos" }))
  }
}

export const modificarAlumno = (data, id) => async (dispatch) => {
  try {
    const alumno = {
      "Id": parseInt(id),
      "Nombre": data[0],
      "Apellidos": data[1],
      "Genero": data[2] ? true : false,
      "FechaNacimiento": data[3]
    }
    const result = await axios.put("/Alumno/", alumno);
    if (typeof result.data === 'string') {
      dispatch(setAlert({ tipo: "warning", msj: result.data }))
      return
    }
    dispatch(setAlert({ tipo: "success", msj: "Alumno modificado" }))
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error modificando al alumno" }))
  }
}

export const eliminarAlumno = (id, setData) => async (dispatch) => {
  try {
    const result = await axios.delete("/Alumno?id=" + id);
    if (result.data === 'El alumno no existe') {
      dispatch(setAlert({ tipo: "warning", msj: result.data }))
      return
    }
    setData(['', '', '', ''])
    dispatch(setAlert({ tipo: "success", msj: "Alumno eliminado" }))
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error eliminando al alumno" }))
  }
}