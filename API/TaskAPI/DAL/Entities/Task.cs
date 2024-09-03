namespace DAL.Entities;

public class Task
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public DateTime? DueDate { get; set; }
    public Status Status { get; set; }
    public Priority Priority { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
public enum Status
{
    Pedning,
    InProgress,
    Completed
}
public enum Priority
{
    Low,
    Medium,
    High
}
