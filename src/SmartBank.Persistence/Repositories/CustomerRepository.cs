using Microsoft.EntityFrameworkCore;
using SmartBank.Application.Interfaces.Repositories;
using SmartBank.Domain.Entities;
using SmartBank.Persistence.Context;

namespace SmartBank.Persistence.Repositories;

public class CustomerRepository : ICustomerRepository
{
    private readonly SmartBankDbContext _context;

    public CustomerRepository(SmartBankDbContext context)
    {
        _context = context;
    }

    public async Task<Customer?> GetByIdAsync(Guid id)
    {
        return await _context.Customers.FirstOrDefaultAsync(x => x.Id == id);
    }
}