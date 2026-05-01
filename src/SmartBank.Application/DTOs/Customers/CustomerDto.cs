namespace SmartBank.Application.DTOs.Customers;

public class CustomerDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string IdentityNumber { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public Guid? UserId { get; set; }
    public DateTime CreatedAt { get; set; }
}