import * as React from 'react';

import Grid from "@material-ui/core/Grid";

// Components
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';

// Style
import { blue, pink, grey } from '@material-ui/core/colors';
import { makeStyles, withStyles } from "@material-ui/core/styles";

// Redux
import { useDispatch } from "react-redux";
import { crearAlumno, obtenerAlumno, modificarAlumno, eliminarAlumno } from "../redux/alumno";
import { crearProfesor, obtenerProfesor, modificarProfesor, eliminarProfesor } from "../redux/profesor";
import { crearGrado, obtenerGrado, modificarGrado, eliminarGrado } from "../redux/grado";
import { crearSeccion, obtenerSeccion, modificarSeccion, eliminarSeccion } from "../redux/seccion";

const styles = {
    container: {
        margin: "0px auto",
        marginTop: "5px",

    },
    item: {
        marginTop: "10px",
    },
    button: {
        marginTop: "0px",
    },
};

const useStyles = makeStyles(styles);
const SpecialSwitch = withStyles({
    switchBase: {
        color: blue[300],
        '&$checked': {
            color: pink[300],
        },
        '&$checked + $track': {
            backgroundColor: grey[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default function Form({ title, items, lists }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [data, setData] = React.useState(['', '', '', '1997-03-10']);
    const [id, setId] = React.useState('');

    const crear = () => {
        switch (title) {
            case 'Alumno':
                dispatch(crearAlumno(data))
                break;
            case 'Profesor':
                dispatch(crearProfesor(data))
                break;
            case 'Grado':
                dispatch(crearGrado(data))
                break;
            case 'Seccion':
                dispatch(crearSeccion(data))
                break;
        }
    }

    const obtener = () => {
        switch (title) {
            case 'Alumno':
                dispatch(obtenerAlumno(id, setData))
                break
            case 'Profesor':
                dispatch(obtenerProfesor(id, setData))
                break
            case 'Grado':
                dispatch(obtenerGrado(id, setData))
                break
            case 'Seccion':
                dispatch(obtenerSeccion(id, setData))
                break
        }
    }

    const modificar = () => {
        switch (title) {
            case 'Alumno':
                dispatch(modificarAlumno(data, id))
                break
            case 'Profesor':
                dispatch(modificarProfesor(data, id))
                break
            case 'Grado':
                dispatch(modificarGrado(data, id))
                break
            case 'Seccion':
                dispatch(modificarSeccion(data, id))
                break
        }
    }

    const eliminar = () => {
        switch (title) {
            case 'Alumno':
                dispatch(eliminarAlumno(id, setData))
                break
            case 'Profesor':
                dispatch(eliminarProfesor(id, setData))
                break
            case 'Grado':
                dispatch(eliminarGrado(id, setData))
                break
            case 'Seccion':
                dispatch(eliminarSeccion(id, setData))
                break
        }
    }

    const changueField = (e, index) => {
        const dataAux = [...data]
        dataAux[index] = e.target.value
        setData(dataAux)
    }

    const changueSwitch = (value, index) => {
        const dataAux = [...data]
        dataAux[index] = value
        setData(dataAux)
    }
    const getDefaultItemList = (index, item) => {
        if(data[index] !== ''){
            return data[index]
        }
        data[index] = lists[item[1].replace('Id', '')][0]?lists[item[1].replace('Id', '')][0].id:0
        return data[index]
    }
    const getInputs = (item, index) => {
        if (item[2] === "list") {
            return <FormControl style={{paddingTop:'30px'}} fullWidth variant="outlined">
                <InputLabel style={{paddingTop:'30px'}} htmlFor="component-outlined">{item[0]}</InputLabel>
                <NativeSelect
                    key={'NS' + item[1]}
                    defaultValue={getDefaultItemList(index, item)}
                    inputProps={{
                        value: data[index],
                    }}
                    onChange={e => changueField(e, index)}
                >
                    {lists[item[1].replace('Id', '')].map((item, index) => <option key={'NS' + item[1] + index} value={item.id}>{item.nombre}</option>)}

                </NativeSelect>
            </FormControl>
        }
        else if (item[2] === "switch") {
            return <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Masculino</Grid>
                <Grid item>
                    <SpecialSwitch
                        checked={data[index] ? true : false}
                        onChange={() => changueSwitch(data[index] ? false : true, index)}
                        key={'T' + item[1]}
                    />
                </Grid>
                <Grid item>Femenino</Grid>
            </Grid>
        }
        else {
            return <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="component-outlined">{item[0]}</InputLabel>
                <OutlinedInput
                    key={'T' + item[1]}
                    label={item[0]}
                    type={item[2]}
                    variant="filled"
                    onChange={e => changueField(e, index)}
                    value={data[index]}
                />
            </FormControl>
        }
    }

    return (
        <Grid container alignItems="center">
            <Grid className={classes.container} item={true} md={5} xs={12}>
                {items.map((item, index) => {
                    return (
                        <Grid className={classes.item} key={'G' + item[1]} item={true} xs={12}>
                            {getInputs(item, index)}
                        </Grid>
                    )
                })}

            </Grid>
            <Grid className={classes.container} item={true} md={5} xs={12}>
                <Grid style={{ marginBottom: '40px', paddingTop: '10px' }} className={classes.item} item xs={12}>
                    <Button fullWidth variant="contained" color="success" onClick={() => crear()}>
                        CREAR
                    </Button>
                </Grid>
                <Grid style={{ marginBottom: '5px' }} className={classes.item} item xs={12}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="component-outlined">{"ID " + title}</InputLabel>
                        <OutlinedInput
                            label={"ID " + title}
                            type={"number"}
                            variant="filled"
                            onChange={e => setId(e.target.value)}
                            value={id}
                        />
                    </FormControl>
                </Grid>
                <Grid className={classes.button} item xs={12}>
                    <Button fullWidth variant="contained" color="secondary" onClick={() => obtener()}>
                        OBTENER
                    </Button>
                </Grid>
                <Grid className={classes.button} item xs={12} onClick={() => modificar()}>
                    <Button fullWidth variant="contained" color="info">
                        ACTUALIZAR
                    </Button>
                </Grid>
                <Grid className={classes.button} item xs={12} onClick={() => eliminar()}>
                    <Button fullWidth variant="contained" color="warning">
                        ELIMINAR
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
