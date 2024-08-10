var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Retrieve frontend URI for CORS
var frontendUris = builder.Configuration.GetSection("Uri:Frontend").Get<string[]>() ?? throw new Exception("No frontend URIs configured.");

// Add CORS
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(
        name: "Frontend",
        builder =>
        {
            builder
                .WithOrigins(frontendUris)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS
app.UseCors("Frontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
