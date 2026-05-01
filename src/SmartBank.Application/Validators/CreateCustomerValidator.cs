using FluentValidation;
using SmartBank.Application.DTOs.Customers;

namespace SmartBank.Application.Validators;

public class CreateCustomerValidator : AbstractValidator<CreateCustomerDto>
{
    public CreateCustomerValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("FirstName boş olamaz");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("LastName boş olamaz");

        RuleFor(x => x.IdentityNumber)
            .NotEmpty().WithMessage("IdentityNumber boş olamaz")
            .Length(11).WithMessage("IdentityNumber 11 haneli olmalı");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("PhoneNumber boş olamaz");

       
    }
}