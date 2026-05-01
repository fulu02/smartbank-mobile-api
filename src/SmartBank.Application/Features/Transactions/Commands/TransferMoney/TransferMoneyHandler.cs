using SmartBank.Application.Interfaces.Repositories;
using SmartBank.Domain.Entities;

namespace SmartBank.Application.Features.Transactions.Commands.TransferMoney;

public class TransferMoneyHandler
{
    private readonly IAccountRepository _accountRepository;
    private readonly ITransactionRepository _transactionRepository;

    public TransferMoneyHandler(
        IAccountRepository accountRepository,
        ITransactionRepository transactionRepository)
    {
        _accountRepository = accountRepository;
        _transactionRepository = transactionRepository;
    }

    public async Task HandleAsync(TransferMoneyCommand command)
    {
        if (command.Amount <= 0)
            throw new ArgumentException("Amount must be greater than zero.");

        var fromAccount = await _accountRepository.GetByIdAsync(command.FromAccountId);
        var toAccount = await _accountRepository.GetByIdAsync(command.ToAccountId);

        if (fromAccount is null)
            throw new Exception("Sender account not found.");

        if (toAccount is null)
            throw new Exception("Receiver account not found.");

        fromAccount.Withdraw(command.Amount);
        toAccount.Deposit(command.Amount);

        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            FromAccountId = command.FromAccountId,
            ToAccountId = command.ToAccountId,
            Amount = command.Amount,
            CreatedAt = DateTime.UtcNow
        };

        await _transactionRepository.AddAsync(transaction);
        await _accountRepository.UpdateAsync(fromAccount);
        await _accountRepository.UpdateAsync(toAccount);
    }
}