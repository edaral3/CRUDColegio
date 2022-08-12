import * as React from 'react';

// Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from "@material-ui/core/Grid";
// Icons
import BoyIcon from '@mui/icons-material/Boy';
import SchoolIcon from '@mui/icons-material/School';
import HailIcon from '@mui/icons-material/Hail';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

// Components
import Form from '../components/Form'
import Table from '../components/Table'
import Alert from "../components/Alert";

// Utilities
import data from '../utilities/dataForm'
import headers from '../utilities/headersTable'

// Redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerAlumnos } from "../redux/alumno.js";
import { obtenerProfesores } from "../redux/profesor";
import { obtenerGrados } from "../redux/grado";
import { obtenerSecciones } from "../redux/seccion";

const drawerWidth = 240;

export default function General() {
    const dispatch = useDispatch();
    const alumnos = useSelector((store) => store.alumno.alumnos);
    const profesores = useSelector((store) => store.profesor.profesores);
    const grados = useSelector((store) => store.grado.grados);
    const secciones = useSelector((store) => store.seccion.secciones);

    const [title, setTitle] = React.useState("Alumno");
    const [itemsForm, setItemsForm] = React.useState(data['alumno']);

    const lists = {
        Alumno: alumnos,
        Profesor: profesores,
        Grado: grados,
    }

    const itemsMenu = [
        {
            title: 'Alumno',
            icon: BoyIcon
        },
        {
            title: 'Profesor',
            icon: HailIcon
        },
        {
            title: 'Grado',
            icon: SchoolIcon
        },
        {
            title: 'Seccion',
            icon: MeetingRoomIcon
        }
    ]
    React.useEffect(() => {
        dispatch(obtenerAlumnos());
        dispatch(obtenerProfesores());
        dispatch(obtenerGrados());
        dispatch(obtenerSecciones());
    }, [dispatch]);

    const changueForm = (title) => {
        setTitle(title)
        setItemsForm(data[title.toLowerCase()])
    }

    const getDataTable = () => {
        switch (title) {
            case 'Alumno':
                return alumnos
            case 'Profesor':
                return profesores
            case 'Grado':
                return grados
            case 'Seccion':
                return secciones
        }
    }
    const getHeaderTable = () => {
        switch (title) {
            case 'Alumno':
                return headers['alumno']
            case 'Profesor':
                return headers['profesor']
            case 'Grado':
                return headers['grado']
            case 'Seccion':
                return headers['seccion']
        }
    }
    return (
        <>
            <Alert />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Colegio
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            {itemsMenu.map((item, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton onClick={() => changueForm(item.title)}>
                                        <ListItemIcon>
                                            <item.icon />
                                        </ListItemIcon>
                                        <ListItemText primary={item.title} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Grid style={{ marginTop: '10%' }} container>
                        <Grid item={true} md={6} xs={12}>
                            <Form title={title} items={itemsForm} lists={lists} />
                        </Grid>
                        <Grid style={{paddingRight:'50px', paddingLeft:'50px'}} item={true} md={6} xs={12}>
                            <Table data={getDataTable()} header={getHeaderTable()} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}
