using System;
using SQLite;

namespace BackColegio.Modelo
{
        public class Alumno
        {
            [PrimaryKey, AutoIncrement]
            public int Id { get; set; }
        
            [NotNull]
            public string Nombre { get; set; }

            [NotNull] 
            public string Apellidos { get; set; }

            [NotNull]
            public bool Genero { get; set; }

            [NotNull]
            public DateTime FechaNacimiento { get; set; }
        }
}