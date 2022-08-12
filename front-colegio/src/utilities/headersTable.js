export default {
    alumno: [
        {
            width: 200,
            label: 'Id',
            dataKey: 'id',
        },
        {
            width: 200,
            label: 'Nombre',
            dataKey: 'nombre',
        },
        {
            width: 200,
            label: 'Apellidos',
            dataKey: 'apellidos',
        },
        {
            width: 200,
            label: 'Genero',
            dataKey: 'genero',
        },
        {
            width: 200,
            label: 'Fecha de nacimiento',
            dataKey: 'fechaNacimiento',
        }
    ],
    profesor: [
        {
            width: 200,
            label: 'Id',
            dataKey: 'id',
        },
        {
            width: 200,
            label: 'Nombre',
            dataKey: 'nombre',
        },
        {
            width: 200,
            label: 'Apellidos',
            dataKey: 'apellidos',
        },
        {
            width: 200,
            label: 'Genero',
            dataKey: 'genero',
        },
    ],
    grado: [ 
        {
            width: 200,
            label: 'Id',
            dataKey: 'id',
        },
        {
            width: 200,
            label: 'Nombre',
            dataKey: 'nombre',
        },
        {
            width: 200,
            label: 'Id del Profesor',
            dataKey: 'profesorId',
        },
    ],
    seccion: [
        {
            width: 200,
            label: 'Id',
            dataKey: 'id',
        },
        {
            width: 200,
            label: 'Id del alumno',
            dataKey: 'alumnoId',
        },
        {
            width: 200,
            label: 'Id del grado',
            dataKey: 'gradoId',
        },
        {
            width: 200,
            label: 'Seccion',
            dataKey: 'seccion',
        },
    ],
}