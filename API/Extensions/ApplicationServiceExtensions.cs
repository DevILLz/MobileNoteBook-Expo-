//#define UseSQLite
using Application.Interfaces;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Diagnostics;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
#if UseSQLite
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
#endif
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers();
#if UseSQLite
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddScoped<ITodoRepository, TodoRepository>();
#else
            services.AddSingleton<ITodoRepository, TodoRepositoryWithoutDB>();
#endif
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://192.168.1.61:19000", "http://localhost:19006", "http://localhost:19000");
                });
            });
            
            return services;
        }
    }
}