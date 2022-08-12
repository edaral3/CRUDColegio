export default {
    alumno: [
        ['Nombre', 'Bombre', 'text'],
        ['Apellidos', 'Apellidos', 'text'],
        ['Genero', 'Genero', 'switch'],
        ['Fecha de nacimiento', 'FechaNacimiento', 'date'],
    ],
    profesor: [
        ['Nombre', 'Bombre', 'text'],
        ['Apellidos', 'Apellidos', 'text'],
        ['Genero', 'Genero', 'switch'],
    ],
    grado: [
        ['Nombre', 'Nombre', 'text'],
        ['Profesor', 'ProfesorId', 'list']
    ],
    seccion: [
        ['Alumno', 'AlumnoId', 'list'],
        ['Grado', 'GradoId', 'list'],
        ['Seccion', 'Seccion', 'text']
    ],
}