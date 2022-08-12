using Microsoft.AspNetCore.Mvc;
using BackColegio.Modelo;

namespace BackColegio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradoController : ControllerBase
    {
        [HttpPost]
        public IActionResult AgregarGrado(Grado grado)
        {
            try
            {
                SQLIndex.db.InsertAsync(grado);
                return Ok("Grado creado");
            }
            catch
            {
                return BadRequest("Error creando al grado");
            }
        }

        [HttpGet("all")]
        public IActionResult ObtenerGrados()
        {
            try
            {
                return Ok(SQLIndex.db.Table<Grado>().ToListAsync().Result);
            }
            catch
            {
                return BadRequest("Error obteniendo grado");
            }
        }

        private Grado GetGradoById(int id)
        {
            return SQLIndex.db.Table<Grado>().Where(a => a.Id == id).FirstOrDefaultAsync().Result;
        }

        [HttpGet]
        public IActionResult ObtenerGrado(int id)
        {
            try
            {
                var grado = GetGradoById(id);
                if (grado == null)
                {
                    return Ok("El amuno no existe");
                }
                return Ok(grado);
            }
            catch
            {
                return BadRequest("Error obteniendo grado");
            }
        }

        [HttpPut]
        public IActionResult ModificarGrado(Grado grado)
        {
            try
            {
                var gradoAux = SQLIndex.db.UpdateAsync(grado);
                if (gradoAux.Result == 0)
                {
                    return Ok("El amuno no existe");
                }
                return Ok("Grado actualizado");
            }
            catch
            {
                return BadRequest("Error modificando al grado");
            }
        }

        [HttpDelete]
        public IActionResult EliminarGrado(int id)
        {
            try
            {
                var grado = GetGradoById(id); 
                if (grado == null)
                {
                    return Ok("El grado no existe");
                }
                SQLIndex.db.DeleteAsync(grado);
                return Ok("Grado eliminado");
            }
            catch
            {
                return BadRequest("Error Eliminando al grado");
            }
        }
    }
}
