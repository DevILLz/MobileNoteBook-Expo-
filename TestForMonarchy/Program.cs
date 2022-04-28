using TestForMonarchy.Extensions;
using TestForMonarchy.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationServices(builder.Configuration)
                .AddApplicationServicesAsync(builder.Configuration);


var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
app.MapControllers();
app.UseRouting().UseCors("CorsPolicy");

app.Run();
