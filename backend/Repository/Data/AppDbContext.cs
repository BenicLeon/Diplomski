using Microsoft.EntityFrameworkCore;
using Model;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = Guid.Parse("dd5eebcf-0347-4d31-b061-07c41e77833e"),
                Email = "admin@admin.com",
                Username = "admin",
                PasswordHash = "$2a$12$/mzOlopaQoDjnUGeQpmCFem.qPD5KerAjdNajdNd.cp876ToZRBEq",
                Role = "Admin"
            }
        );
    }
}
