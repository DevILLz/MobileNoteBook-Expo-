using API.Extensions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationServices(builder.Configuration);

builder.WebHost.UseUrls(urls: "http://*:5000");
var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
app.MapControllers();
app.UseRouting().UseCors("CorsPolicy");

app.Run();
