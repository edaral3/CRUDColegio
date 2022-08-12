using Microsoft.AspNetCore.Mvc;
using BackColegio.Modelo;

namespace BackColegio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlumnoGradoController : ControllerBase
    {
        [HttpPost]
        public IActionResult AgregarAlumnoGrado(AlumnoGrado alumnoGrado)
        {
            try
            {
                SQLIndex.db.InsertAsync(alumnoGrado);
                return Ok("AlumnoGrado creado");
            }
            catch
            {
                return BadRequest("Error creando al alumnoGrado");
            }
        }

        [HttpGet("all")]
        public IActionResult ObtenerAlumnoGrados()
        {
            try
            {
                return Ok(SQLIndex.db.Table<AlumnoGrado>().ToListAsync().Result);
            }
            catch
            {
                return BadRequest("Error obteniendo alumnoalumnoGrado");
            }
        }

        private AlumnoGrado GetAlumnoGradoById(int id)
        {
            return SQLIndex.db.Table<AlumnoGrado>().Where(a => a.Id == id).FirstOrDefaultAsync().Result;
        }

        [HttpGet]
        public IActionResult ObtenerAlumnoGrado(int id)
        {
            try
            {
                var alumnoGrado = GetAlumnoGradoById(id);
                if (alumnoGrado == null)
                {
                    return Ok("El amuno no existe");
                }
                return Ok(alumnoGrado);
            }
            catch
            {
                return BadRequest("Error obteniendo alumnoGrado");
            }
        }

        [HttpPut]
        public IActionResult ModificarAlumnoGrado(AlumnoGrado alumnoGrado)
        {
            try
            {
                var alumnoGradoAux = SQLIndex.db.UpdateAsync(alumnoGrado);
                if (alumnoGradoAux.Result == 0)
                {
                    return Ok("El amuno no existe");
                }
                return Ok("AlumnoGrado actualizado");
            }
            catch
            {
                return BadRequest("Error modificando al alumnoGrado");
            }
        }

        [HttpDelete]
        public IActionResult EliminarAlumnoGrado(int id)
        {
            try
            {
                var alumnoGrado = GetAlumnoGradoById(id); 
                if (alumnoGrado == null)
                {
                    return Ok("El alumnoGrado no existe");
                }
                SQLIndex.db.DeleteAsync(alumnoGrado);
                return Ok("AlumnoGrado eliminado");
            }
            catch
            {
                return BadRequest("Error Eliminando al alumnoGrado");
            }
        }
    }
}
