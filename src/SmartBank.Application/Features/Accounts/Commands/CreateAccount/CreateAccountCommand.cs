using MediatR;

namespace SmartBank.Application.Features.Accounts.Commands.CreateAccount;

public class CreateAccountCommand : IRequest<Guid>
{
    public Guid CustomerId { get; set; }
    public decimal InitialBalance { get; set; }
}