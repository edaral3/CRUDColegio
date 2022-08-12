using Microsoft.AspNetCore.Mvc;
using BackColegio.Modelo;

namespace BackColegio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlumnoController : ControllerBase
    {
        [HttpPost]
        public IActionResult AgregarAlumno(Alumno alumno)
        {
            try
            {
                SQLIndex.db.InsertAsync(alumno);
                return Ok("Alumno creado");
            }
            catch
            {
                return BadRequest("Error creando al alumno");
            }
        }

        [HttpGet("all")]
        public IActionResult ObtenerAlumnos()
        {
            try
            {
                return Ok(SQLIndex.db.Table<Alumno>().ToListAsync().Result);
            }
            catch
            {
                return BadRequest("Error obteniendo alumno");
            }
        }

        private Alumno GetAlumnoById(int id)
        {
            return SQLIndex.db.Table<Alumno>().Where(a => a.Id == id).FirstOrDefaultAsync().Result;
        }

        [HttpGet]
        public IActionResult ObtenerAlumno(int id)
        {
            try
            {
                var alumno = GetAlumnoById(id);
                if (alumno == null)
                {
                    return Ok("El amuno no existe");
                }
                return Ok(alumno);
            }
            catch
            {
                return BadRequest("Error obteniendo alumno");
            }
        }

        [HttpPut]
        public IActionResult ModificarAlumno(Alumno alumno)
        {
            try
            {
                var alumnoAux = SQLIndex.db.UpdateAsync(alumno);
                if (alumnoAux.Result == 0)
                {
                    return Ok("El amuno no existe");
                }
                return Ok("Alumno actualizado");
            }
            catch
            {
                return BadRequest("Error modificando al alumno");
            }
        }

        [HttpDelete]
        public IActionResult EliminarAlumno(int id)
        {
            try
            {
                var alumno = GetAlumnoById(id); 
                if (alumno == null)
                {
                    return Ok("El alumno no existe");
                }
                SQLIndex.db.DeleteAsync(alumno);
                return Ok("Alumno eliminado");
            }
            catch
            {
                return BadRequest("Error Eliminando al alumno");
            }
        }
    }
}
