using Microsoft.AspNetCore.Mvc;
using SmartBank.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace SmartBank.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly SmartBankDbContext _context;

    public TransactionsController(SmartBankDbContext context)
    {
        _context = context;
    }

   [HttpGet]
public async Task<IActionResult> GetAll()
{
    var transactions = await _context.Transactions
        .OrderByDescending(t => t.CreatedAt)
        .ToListAsync();

    return Ok(transactions);
}

[HttpGet("account/{accountId}")]
public async Task<IActionResult> GetByAccount(Guid accountId)
{
    var transactions = await _context.Transactions
        .Where(t => t.FromAccountId == accountId || t.ToAccountId == accountId)
        .OrderByDescending(t => t.CreatedAt)
        .ToListAsync();

    return Ok(transactions);
}
}