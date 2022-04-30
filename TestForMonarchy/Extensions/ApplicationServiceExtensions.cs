using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Diagnostics;

namespace TestForMonarchy.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static async void AddApplicationServicesAsync(this IServiceCollection services, IConfiguration configuration)
        {
            try // проверка и создание базы данных 
            {
                using (ServiceProvider serviceProvider = services.BuildServiceProvider())
                {
                    // Review the FormMain Singleton.
                    var context = serviceProvider.GetRequiredService<DataContext>();
                    await context.Database.MigrateAsync();
                    await Seed.SeedData(context);
                }
            }
            catch (Exception ex) { Debug.WriteLine(ex); }
        }
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers();

            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://192.168.1.61:19000", "http://localhost:19006");
                });
            });
            services.AddMediatR(typeof(Application.ToDoList.Create).Assembly);

            return services;
        }
    }
}