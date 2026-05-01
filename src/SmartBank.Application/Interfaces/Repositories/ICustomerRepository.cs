using SmartBank.Domain.Entities;

namespace SmartBank.Application.Interfaces.Repositories;

public interface ICustomerRepository
{
    Task<Customer?> GetByIdAsync(Guid id);
}