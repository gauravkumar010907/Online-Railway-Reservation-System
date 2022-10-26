using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RAILWAY_RESERVATION.Controllers
{
    [ApiController]
    [Route("api/Payment")]
    public class PaymentController : Controller
    {
        private readonly ApplicationContext dbContext;

        public PaymentController(ApplicationContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
     //   [Authorize]
        [Route("{PassengerId}/{cardHolderName}/{cardNumber}/{cvv}/{expiry}")]
        public IActionResult AddPayment(int PassengerId, string cardHolderName, long cardNumber, int cvv, DateTime expiry)
        {
            var payment = new Payment()
            {
                CardHolderName = cardHolderName,
                CardNumber = cardNumber,
                CVV = cvv,
                PassengerId = PassengerId,
                ExpiryDate = expiry
            };

            dbContext.Payments.Add(payment);
            dbContext.SaveChanges();
            return Ok();
        }
    }
}
