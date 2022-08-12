import axios from "axios";
import { setAlert } from "./alert";

const CREAR_GRADO = "CREAR_GRADO";

const grado = {
  grados: []
}

export default function gradoReducer(state = grado, action) {
  switch (action.type) {
    case CREAR_GRADO:
      return { grados: action.payload };
    default:
      return state;
  }
}

export const crearGrado = (data) => async (dispatch) => {
  try {
    const grado = {
      "Nombre": data[0],
      "ProfesorId": parseInt(data[1]),
    }
    await axios.post("/Grado/", grado);
    dispatch(setAlert({ tipo: "success", msj: "Grado creado" }))
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error creando el grado" }))
  }
};

export const obtenerGrado = (id, setData) => async (dispatch) => {
  try {
    let result = await axios.get("/Grado?id=" + id);
    if (typeof result.data === 'string') {
      dispatch(setAlert({ tipo: "warning", msj: result.data }))
      return
    }
    result = result.data;
    setData([result.nombre, result.profesorId])
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error obteniendo al srado" }))
  }
};

export const obtenerGrados = () => async (dispatch) => {
  try {
    const result = await axios.get("/Grado/all");
    const newresult = result.data.map(item => {
      delete item.profesor
      return item
    });
    dispatch({
      type: CREAR_GRADO,
      payload: newresult
    })
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error obteniendo los grados" }))
  }
}

export const modificarGrado = (data, id) => async (dispatch) => {
  try {
    const grado = {
      "Id": parseInt(id),
      "Nombre": data[0],
      "ProfesorId": parseInt(data[1])
    }
    const result = await axios.put("/Grado/", grado);
    if (typeof result.data === 'string') {
      dispatch(setAlert({ tipo: "warning", msj: result.data }))
      return
    }
    dispatch(setAlert({ tipo: "success", msj: "Grado modificado" }))
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error modificando al grado" }))
  }
}

export const eliminarGrado = (id, setData) => async (dispatch) => {
  try {
    const result = await axios.delete("/Grado?id=" + id);
    if (result.data === 'El grado no existe') {
      dispatch(setAlert({ tipo: "warning", msj: result.data }))
      return
    }
    setData(['', '', '', ''])
    dispatch(setAlert({ tipo: "success", msj: "Grado eliminado" }))
  } catch (error) {
    dispatch(setAlert({ tipo: "error", msj: "Error eliminando al grado" }))
  }
}