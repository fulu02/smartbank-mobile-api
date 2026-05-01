using Microsoft.EntityFrameworkCore;
using SmartBank.Application.Interfaces.Repositories;
using SmartBank.Domain.Entities;
using SmartBank.Persistence.Context;

namespace SmartBank.Persistence.Repositories;

public class AccountRepository : IAccountRepository
{
    private readonly SmartBankDbContext _context;

    public AccountRepository(SmartBankDbContext context)
    {
        _context = context;
    }

    public async Task<Account?> GetByIdAsync(Guid id)
    {
        return await _context.Accounts.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task AddAsync(Account account)
    {
        await _context.Accounts.AddAsync(account);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Account account)
    {
        _context.Accounts.Update(account);
        await _context.SaveChangesAsync();
    }
}