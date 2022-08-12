using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using BackColegio.Modelo;

namespace BackColegio
{
    public class Program
    {
        public static void Main(string[] args)
        {
            if (SQLIndex.db == null)
            {
                SQLIndex.createDB("./ColegioDB.db3");
            }
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
