using Microsoft.Extensions.DependencyInjection;
using Service.Common;
using Service;

public static class ServiceRegistration
{
    public static void AddServiceLayer(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IGeometryService, GeometryService>();
    }
}
