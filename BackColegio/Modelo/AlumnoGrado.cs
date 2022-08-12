using SQLite;
using SQLiteNetExtensions.Attributes;

namespace BackColegio.Modelo
{
    public class AlumnoGrado
    {
        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }

        [NotNull, ForeignKey(typeof(Alumno))]
        public int AlumnoId { get; set; }

        [NotNull, ForeignKey(typeof(Grado))]
        public int GradoId { get; set; }
        
        [NotNull]
        public string Seccion { get; set; }
    }
}