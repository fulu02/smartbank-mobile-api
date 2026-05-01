using SmartBank.Domain.Common;

namespace SmartBank.Domain.Entities;

public class Customer : BaseEntity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string IdentityNumber { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;

    public Guid? UserId { get; set; }
    public User? User { get; set; }
}