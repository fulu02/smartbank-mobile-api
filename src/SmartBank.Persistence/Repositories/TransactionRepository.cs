using SmartBank.Application.Interfaces.Repositories;
using SmartBank.Domain.Entities;
using SmartBank.Persistence.Context;

namespace SmartBank.Persistence.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly SmartBankDbContext _context;

    public TransactionRepository(SmartBankDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Transaction transaction)
    {
        await _context.Transactions.AddAsync(transaction);
        await _context.SaveChangesAsync();
    }
}