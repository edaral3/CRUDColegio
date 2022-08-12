import axios from "axios";
import { setAlert } from "./alert";

const CREAR_SECCION = "CREAR_SECCION";

const seccion = {
  secciones: []
}

export default function seccionReducer(state = seccion, action) {
  switch (action.type) {
    case CREAR_SECCION:
      return { secciones: action.payload };
    default:
      return state;
  }
}

export const crearSeccion = (data) => async (dispatch) => {
  try {
    const seccion = {
      "AlumnoId": parseInt(data[0]),
      "GradoId": parseInt(data[1]),
      "Seccion": data[2]
    }
    await axios.post("/AlumnoGrado/", seccion);
    dispatch(setAlert({ tipo: "success", msj: "Seccion creado" }))
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error creando la seccion" }))
  }
};

export const obtenerSeccion = (id, setData) => async (dispatch) => {
  try {
    let result = await axios.get("/AlumnoGrado?id=" + id);
    if (typeof result.data === 'string') {
      dispatch(setAlert({ tipo: "warning", msj: result.data }))
      return
    }
    result = result.data;
    setData([result.alumnoId, result.gradoId, result.seccion])
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error obteniendo al seccion" }))
  }
};

export const obtenerSecciones = () => async (dispatch) => {
  try {
    const result = await axios.get("/AlumnoGrado/all");
    const newresult = result.data.map(item => {
      item.genero = item.genero ? "Femenino" : "Masculino";
      return item
    });
    dispatch({
      type: CREAR_SECCION,
      payload: newresult
    })
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error obteniendo los secciones" }))
  }
}

export const modificarSeccion = (data, id) => async (dispatch) => {
  try {
    const seccion = {
      "Id": parseInt(id),
      "AlumnoId": parseInt(data[0]),
      "GradoId": parseInt(data[1]),
      "Seccion": data[2]
    }
    const result = await axios.put("/AlumnoGrado/", seccion);
    if (typeof result.data === 'string') {
      dispatch(setAlert({ tipo: "warning", msj: result.data }))
      return
    }
    dispatch(setAlert({ tipo: "success", msj: "Seccion modificado" }))
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error modificando al seccion" }))
  }
}

export const eliminarSeccion = (id, setData) => async (dispatch) => {
  try {
    const result = await axios.delete("/AlumnoGrado?id=" + id);
    if (result.data === 'El seccion no existe') {
      dispatch(setAlert({ tipo: "warning", msj: result.data }))
      return
    }
    setData(['', '', '', ''])
    dispatch(setAlert({ tipo: "success", msj: "Seccion eliminado" }))
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error eliminando al seccion" }))
  }
}