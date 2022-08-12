using SQLite;

namespace BackColegio.Modelo
{
    public class Profesor
    {
        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }

        [NotNull]
        public string Nombre { get; set; }

        [NotNull]
        public string Apellidos { get; set; }

        [NotNull]
        public bool Genero { get; set; }
    }
}