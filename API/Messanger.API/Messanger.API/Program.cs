using Messanger.API.Hubs;
using Messanger.API.Models;
using System.Net.Security;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:4200")
       .AllowAnyMethod()
       .AllowAnyHeader()
       .AllowCredentials();
    });
});

builder.Services.AddSignalR();
builder.Services.AddSingleton<IDictionary<string, UserConnection>>(
    new Dictionary<string, UserConnection>());
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ChatHub>("/chat");
});

app.MapControllers();


app.Run();
