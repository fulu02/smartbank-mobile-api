using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace SmartBank.Persistence.Context;

public class SmartBankDbContextFactory : IDesignTimeDbContextFactory<SmartBankDbContext>
{
    public SmartBankDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<SmartBankDbContext>();

        optionsBuilder.UseSqlite("Data Source=SmartBankDb.db");

        return new SmartBankDbContext(optionsBuilder.Options);
    }
}