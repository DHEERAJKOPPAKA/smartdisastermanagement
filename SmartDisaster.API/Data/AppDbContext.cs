using SmartDisaster.API.Models;
using Microsoft.EntityFrameworkCore;
using SmartDisaster.API.DTOs;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Citizen> Citizens { get; set; }

    // Admins Table
    public DbSet<Admin> Admins { get; set; }

    // Disaster Intimations
    public DbSet<DisasterIntimation> DisasterIntimations { get; set; }

    // Alerts
    public DbSet<Alert> Alerts { get; set; }

    // Risk Assessments
    public DbSet<RiskAssessment> RiskAssessments { get; set; }

    // Evacuation Plans
    public DbSet<EvacuationPlan> EvacuationPlans { get; set; }

    // Activity Logs
    public DbSet<ActivityLog> ActivityLogs { get; set; }
    //disaster record
    public DbSet<DisasterRecord> DisasterRecords { get; set; }

    public DbSet<citizendto> CitizenAlerts { get; set; }

    //public DbSet<LoginRequest> LoginRequests { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Optional: Fluent API configuration can go here
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<UserLoginResult>().HasNoKey();
    

    }
}
