using MediatR;
using Microsoft.AspNetCore.Mvc;
using SmartBank.Application.Features.Accounts.Commands.CreateAccount;

namespace SmartBank.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountsController : ControllerBase
{
    private readonly IMediator _mediator;

    public AccountsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateAccount([FromBody] CreateAccountCommand command)
    {
        var accountId = await _mediator.Send(command);
        return Ok(new { AccountId = accountId });
    }
}