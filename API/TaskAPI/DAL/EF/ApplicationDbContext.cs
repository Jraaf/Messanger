using DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAL.EF;

public class ApplicationDbContext:DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Entities.Task> Tasks { get; set; }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        :base(options)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(u => u.Username)
                .IsUnique();

            entity.HasIndex(u => u.Email)
                .IsUnique();

            entity.Property(u => u.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            entity.Property(u => u.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("GETUTCDATE()");
        });

        modelBuilder.Entity<Entities.Task>(entity =>
        {
            entity.Property(e => e.Status)
                  .HasConversion<int>()
                  .IsRequired();

            entity.Property(e => e.Priority)
                  .HasConversion<int>()
                  .IsRequired();

            entity.Property(e => e.CreatedAt)
                  .HasDefaultValueSql("GETUTCDATE()");

            entity.Property(e => e.UpdatedAt)
                  .ValueGeneratedOnAddOrUpdate()
                  .HasDefaultValueSql("GETUTCDATE()");
        });

        base.OnModelCreating(modelBuilder);
    }
}
