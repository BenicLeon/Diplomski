using Microsoft.Extensions.DependencyInjection;
using Repository.Common;
using Repository;

public static class RepositoryRegistration
{
    public static void AddRepositoryLayer(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
    }
}
