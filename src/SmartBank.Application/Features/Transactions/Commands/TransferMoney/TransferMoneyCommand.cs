using MediatR;

namespace SmartBank.Application.Features.Transactions.Commands.TransferMoney;

public class TransferMoneyCommand : IRequest<Unit>
{
    public Guid FromAccountId { get; set; }
    public Guid ToAccountId { get; set; }
    public decimal Amount { get; set; }
}