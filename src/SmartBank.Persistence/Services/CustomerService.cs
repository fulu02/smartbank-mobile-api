using Microsoft.EntityFrameworkCore;
using SmartBank.Application.DTOs.Customers;
using SmartBank.Application.Interfaces;
using SmartBank.Domain.Entities;
using SmartBank.Persistence.Context;
using SmartBank.Application.Exceptions;

namespace SmartBank.Persistence.Services;

public class CustomerService : ICustomerService
{
    private readonly SmartBankDbContext _context;

    public CustomerService(SmartBankDbContext context)
    {
        _context = context;
    }

    public async Task<CustomerDto> CreateAsync(CreateCustomerDto dto)
    {
        var exists = await _context.Customers
            .AnyAsync(x => x.IdentityNumber == dto.IdentityNumber);

        if (exists)
            throw new BusinessException("Bu TC kimlik numarası ile kayıt zaten var.");

        var customer = new Customer
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            IdentityNumber = dto.IdentityNumber,
            PhoneNumber = dto.PhoneNumber,
            UserId = dto.UserId
        };

        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();

        return new CustomerDto
        {
            Id = customer.Id,
            FirstName = customer.FirstName,
            LastName = customer.LastName,
            IdentityNumber = customer.IdentityNumber,
            PhoneNumber = customer.PhoneNumber,
            UserId = customer.UserId,
            CreatedAt = customer.CreatedAt
        };
    }

    public async Task<List<CustomerDto>> GetAllAsync()
    {
        return await _context.Customers
            .Select(c => new CustomerDto
            {
                Id = c.Id,
                FirstName = c.FirstName,
                LastName = c.LastName,
                IdentityNumber = c.IdentityNumber,
                PhoneNumber = c.PhoneNumber,
                UserId = c.UserId,
                CreatedAt = c.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<CustomerDto?> GetByIdAsync(Guid id)
    {
        var customer = await _context.Customers.FindAsync(id);

        if (customer == null)
            return null;

        return new CustomerDto
        {
            Id = customer.Id,
            FirstName = customer.FirstName,
            LastName = customer.LastName,
            IdentityNumber = customer.IdentityNumber,
            PhoneNumber = customer.PhoneNumber,
            UserId = customer.UserId,
            CreatedAt = customer.CreatedAt
        };
    }
}