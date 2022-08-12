using SQLite;
using SQLiteNetExtensions.Attributes;

namespace BackColegio.Modelo
{
    public class Grado
    {
        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }

        [NotNull] 
        public string Nombre { get; set; }

        [ForeignKey(typeof(Profesor))]
        public int ProfesorId { get; set; }

        [ManyToOne]
        public Profesor Profesor { get; set; }
    }
}