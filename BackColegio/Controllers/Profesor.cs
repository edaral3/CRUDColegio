using Microsoft.AspNetCore.Mvc;
using BackColegio.Modelo;

namespace BackColegio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfesorController : ControllerBase
    {
        [HttpPost]
        public IActionResult AgregarProfesor(Profesor profesor)
        {
            try
            {
                SQLIndex.db.InsertAsync(profesor);
                return Ok("Profesor creado");
            }
            catch
            {
                return BadRequest("Error creando al profesor");
            }
        }

        [HttpGet("all")]
        public IActionResult ObtenerProfesores()
        {
            try
            {
                return Ok(SQLIndex.db.Table<Profesor>().ToListAsync().Result);
            }
            catch
            {
                return BadRequest("Error obteniendo profesor");
            }
        }

        private Profesor GetProfesorById(int id)
        {
            return SQLIndex.db.Table<Profesor>().Where(a => a.Id == id).FirstOrDefaultAsync().Result;
        }

        [HttpGet]
        public IActionResult ObtenerProfesor(int id)
        {
            try
            {
                var profesor = GetProfesorById(id);
                if (profesor == null)
                {
                    return Ok("El amuno no existe");
                }
                return Ok(profesor);
            }
            catch
            {
                return BadRequest("Error obteniendo profesor");
            }
        }

        [HttpPut]
        public IActionResult ModificarProfesor(Profesor profesor)
        {
            try
            {
                var profesorAux = SQLIndex.db.UpdateAsync(profesor);
                if (profesorAux.Result == 0)
                {
                    return Ok("El amuno no existe");
                }
                return Ok("Profesor actualizado");
            }
            catch
            {
                return BadRequest("Error modificando al profesor");
            }
        }

        [HttpDelete]
        public IActionResult EliminarProfesor(int id)
        {
            try
            {
                var profesor = GetProfesorById(id); 
                if (profesor == null)
                {
                    return Ok("El profesor no existe");
                }
                SQLIndex.db.DeleteAsync(profesor);
                return Ok("Profesor eliminado");
            }
            catch
            {
                return BadRequest("Error Eliminando al profesor");
            }
        }
    }
}
