using Microsoft.EntityFrameworkCore;
using PostsAPI;
using Polly;
using PostsAPI.Interfaces;
using PostsAPI.RabbitMQ;

public class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var CorsSetup = "_corsSetup";

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: CorsSetup,
            policy =>
            {
                policy.WithOrigins("http://localhost:8069")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
            });
        });

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddScoped<ISubscriber, Subscriber>();


        var cs = builder.Configuration.GetConnectionString("DefaultConnection")!;
        builder.Services.AddDbContext<ApplicationContext>(options =>
        options.UseMySql(cs, ServerVersion.AutoDetect(cs)));

        var app = builder.Build();

        app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());

        // Create polly policy for database connection:
        var policy = Policy.Handle<Exception>().WaitAndRetryForever(
            sleepDurationProvider: attempt => TimeSpan.FromMilliseconds(200), // Wait 200ms between each try.
            onRetry: (exception, calculatedWaitDuration) => // Capture some info for logging.
            {
                Console.WriteLine("Could not connect to database, retrying");
            });

        // Migrate latest database changes during startup
        using (var scope = app.Services.CreateScope())
        {
            // Here is the migration executed inside the polly policy
            policy.Execute(() =>
            {
                var dbContext = scope.ServiceProvider
                .GetRequiredService<ApplicationContext>();

                dbContext.Database.Migrate();
            });
        }

        using (var scope = app.Services.CreateScope())
        {//Create subscriber that listens to the queue.
            var subscriberContext = scope.ServiceProvider
            .GetRequiredService<ISubscriber>();



            //subscriberContext.GetDeletedFromQueue();
        }
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.RoutePrefix = string.Empty;
                c.SwaggerEndpoint("/swagger/v1/swagger.json", string.Empty);
            });
        }

        app.UseRouting();

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}