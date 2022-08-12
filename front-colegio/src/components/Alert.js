import React from "react";

// components
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

// redux
import { useSelector } from "react-redux";

export default function Alert() {
    const alertas = useSelector((store) => store.alert);
    return (
        <>
            {alertas.map((alerta) => {
                return <Stack key={'S' + alerta.id} spacing={2} sx={{ width: '100%' }}>
                    <Snackbar
                        key={'SN' + alerta.id}
                        open={true}
                        autoHideDuration={3000}
                    >
                        <MuiAlert
                            severity={alerta.tipo}
                            key={'MU' + alerta.id}
                            elevation={6}
                            variant="filled"
                            sx={{ width: '100%' }}>
                            {alerta.msj}
                        </MuiAlert>
                    </Snackbar>
                </Stack>
            })}

        </>
    );
}