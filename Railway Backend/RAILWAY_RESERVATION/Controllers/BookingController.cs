using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace RAILWAY_RESERVATION.Controllers
{

   

    [ApiController]
    [Route("api/Booking")]
    public class BookingController : Controller
    {
        private readonly ApplicationContext dbContext;

        public BookingController(ApplicationContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        [Route("{date}/{source}/{destination}")]
 //       [Authorize]
        public IActionResult AddBooking(string source,string destination,DateTime date)
        {

            Booking booking = new Booking()
            {
                Booking_Date = date,
                Booking_Source = source,
                Booking_Destination = destination,



            };

            dbContext.Bookings.Add(booking);
            dbContext.SaveChanges();

            return Ok(booking.BookingId);
        }









  

 


      
    }


        
    
}
