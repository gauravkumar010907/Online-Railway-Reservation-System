using System.ComponentModel.DataAnnotations;

namespace RAILWAY_RESERVATION.Helper
{
    public class QuotaValidationAttribute:ValidationAttribute

    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
           if (value != null)
            {
                string q = value.ToString();
                if (q.ToLower().Contains("ladies") || q.ToLower().Contains("general"))
                {
                    return ValidationResult.Success;


                }

            }

            return new ValidationResult("this is not desired entry");




        }



    }
    
}
