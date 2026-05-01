using SmartBank.Domain.Entities;

namespace SmartBank.Application.Interfaces.Repositories;

public interface ITransactionRepository
{
    Task AddAsync(Transaction transaction);
}