using SQLite;

namespace BackColegio.Modelo
{
    public static class SQLIndex
    {
        public static SQLiteAsyncConnection db;
        public static void createDB(string dbPath)
        {
            db = new SQLiteAsyncConnection(dbPath);
            db.CreateTableAsync<Alumno>().Wait();
            db.CreateTableAsync<Profesor>().Wait();
            db.CreateTableAsync<Grado>().Wait();
            db.CreateTableAsync<AlumnoGrado>().Wait();
        }
    }
}