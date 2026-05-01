using MediatR;
using SmartBank.Application.Interfaces.Repositories;
using SmartBank.Domain.Entities;

namespace SmartBank.Application.Features.Accounts.Commands.CreateAccount;

public class CreateAccountHandler : IRequestHandler<CreateAccountCommand, Guid>
{
    private readonly IAccountRepository _accountRepository;
    private readonly ICustomerRepository _customerRepository;

    public CreateAccountHandler(
        IAccountRepository accountRepository,
        ICustomerRepository customerRepository)
    {
        _accountRepository = accountRepository;
        _customerRepository = customerRepository;
    }

    public async Task<Guid> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
    {
        var customer = await _customerRepository.GetByIdAsync(request.CustomerId);

        if (customer is null)
            throw new Exception("Customer not found.");

        var account = new Account
        {
            Id = Guid.NewGuid(),
            CustomerId = request.CustomerId
        };

        if (request.InitialBalance > 0)
            account.Deposit(request.InitialBalance);

        await _accountRepository.AddAsync(account);

        return account.Id;
    }
}