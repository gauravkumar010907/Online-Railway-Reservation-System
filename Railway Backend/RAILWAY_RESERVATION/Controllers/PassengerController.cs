using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using RAILWAY_RESERVATION.Models;

using MailKit.Net.Smtp;

namespace RAILWAY_RESERVATION.Controllers
{

    [ApiController]
    [Route("api/Passenger")]
    public class PassengerController : Controller
    {
        private readonly ApplicationContext dbContext;

        public PassengerController(ApplicationContext dbContext)
        {
            this.dbContext = dbContext;
        }



        [HttpPost]
      
        [Route("{name}/{age}/{gender}/{email}/{quota}/{requiredseats}/{booking_id}/{trainId}")]
      //  [Authorize]
        public IActionResult AddPassenger( string name, int age, string gender, string email, string quota, int requiredseats, int booking_id, int trainId)
        {
            var fare = dbContext.Trains.Where(x => x.TrainId == trainId).Select(y => y.TrainFare).FirstOrDefault();
            var t_name = dbContext.Trains.Where(x => x.TrainId == trainId).Select(y => y.TrainName).FirstOrDefault();
            var t_number = dbContext.Trains.Where(x => x.TrainId == trainId).Select(y => y.TrainNo).FirstOrDefault();
            var t_source = dbContext.Trains.Where(x => x.TrainId == trainId).Select(y => y.Train_Source).FirstOrDefault();
            var t_destination = dbContext.Trains.Where(x => x.TrainId == trainId).Select(y => y.Train_Destination).FirstOrDefault();
            var totalFare = requiredseats * fare;

            Passenger p = new Passenger()
            {
                BookingId = booking_id,
                PassengerName = name,
                PassengerAge = age,
                PassengerGender = gender,
                PassengerQuota = quota,
                RequiredSeats = requiredseats,
                TrainId = trainId,
                TotalFare = totalFare,
                Passenger_email = email

            };

            dbContext.Passengers.Add(p);
            dbContext.SaveChanges();
            UpdateTrainSeats_Booking(booking_id);
            


            var email1 = new MimeMessage();
            email1.From.Add(MailboxAddress.Parse("gauravkumar010907@gmail.com"));
            email1.To.Add(MailboxAddress.Parse(email));


            email1.Subject = " BOOKING CONFIRMED";
            email1.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = $" 🚉 Booking Confirmed!!! ✅✅✅,Dear {name}, you confirmed your booking in Train {t_name} 🚅 with Train Number {t_number} by paying the total fare: {totalFare}.You've booked {requiredseats} seats in {quota} quota with PNR {booking_id} form {t_source} to {t_destination}.Thanks for choosing Pakistan Railway Reservation System. Enjoy Your Journey!!!🚂" };

            using var smtp = new SmtpClient();
            //  smtp.Connect("smtp.ethereal.email", 587, MailKit.Security.SecureSocketOptions.StartTls);
            // smtp.Authenticate("eleanora40@ethereal.email", "ggQ8PnyU234FcGXdfV");
            smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate("gauravkumar010907@gmail.com", "bcgmtagqoyvbseox");
            smtp.Send(email1);
            smtp.Disconnect(true);
            return Ok(p);
        }
        

            [HttpGet]
        [Route("{id}")]
     //   [Authorize]
        public IActionResult ViewPassengerBooking(int id)
        {
            var viewbooking = dbContext.Passengers.Where(x => x.BookingId == id).Select(p => new { p.PassengerId, p.BookingId, p.TrainId, p.PassengerGender, p.RequiredSeats, p.PassengerAge, p.PassengerName, p.TotalFare });

            return Ok(viewbooking);

        }

        [HttpDelete]
        [Route("{id}")]
      //  [Authorize]
        public IActionResult DeletePassengerBooking(int id)
        {
            var deleteBooking = dbContext.Passengers.Where(x => x.BookingId == id).Select(p => p.PassengerId).FirstOrDefault();
            var p = dbContext.Passengers.Find(deleteBooking);

            if (p != null)
            {
                dbContext.Passengers.Remove(p);
                UpdateTrainSeats_Cancel(id);
                dbContext.SaveChanges();
                var email1 = new MimeMessage();
                email1.From.Add(MailboxAddress.Parse("gauravkumar010907@gmail.com"));
                email1.To.Add(MailboxAddress.Parse(p.Passenger_email));
                email1.Subject = " BOOKING CANCELLED";
                email1.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = $" 🚉 Your Booking is Cancelled with PNR {id}!!!," };

                using var smtp = new SmtpClient();
                //  smtp.Connect("smtp.ethereal.email", 587, MailKit.Security.SecureSocketOptions.StartTls);
                // smtp.Authenticate("eleanora40@ethereal.email", "ggQ8PnyU234FcGXdfV");
                smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                smtp.Authenticate("gauravkumar010907@gmail.com", "bcgmtagqoyvbseox");
                smtp.Send(email1);
                smtp.Disconnect(true);
                return Ok();
            }

            return BadRequest();
        }



        [HttpPatch]
        [Route("booking_id")]
     //   [Authorize]

        public IActionResult UpdateTrainSeats_Booking(int booking_id)
        {
            var req_seats = dbContext.Passengers.Where(x => x.BookingId == booking_id).Select(y => y.RequiredSeats).FirstOrDefault();

            var trainId = dbContext.Passengers.Where(x => x.BookingId == booking_id).Select(y => y.TrainId).FirstOrDefault();

            var quota = dbContext.Passengers.Where(x => x.BookingId == booking_id).Select(y => y.PassengerQuota).FirstOrDefault();

            var tr_details = dbContext.Trains.Where(x => x.TrainId == trainId).FirstOrDefault();

            if (tr_details != null)
            {
                if (quota.ToLower() == "ladies")
                {
                    var avail_seat_ladies = dbContext.Trains.Where(x => x.TrainId == trainId).Select(y => y.Avl_Seats_Ladies).FirstOrDefault();

                    int remaining_seats_ladies = avail_seat_ladies - req_seats;

                    tr_details.Avl_Seats_Ladies = remaining_seats_ladies;


                    dbContext.SaveChanges();




                    return Ok();


                }
                else if (quota.ToLower() == "general")
                {
                    var avail_seat_general = dbContext.Trains.Where(x => x.TrainId == trainId).Select(y => y.Avl_Seats_General).FirstOrDefault();

                    int remaining_seats_general = avail_seat_general - req_seats;

                    tr_details.Avl_Seats_General = remaining_seats_general;


                    dbContext.SaveChanges();

                    return Ok();
                }
            }
            else
            {
                return NotFound();
            }

            return Ok();

        }




        [HttpPatch]
        [Route("b_id")]
     //   [Authorize]

        public IActionResult UpdateTrainSeats_Cancel(int b_id)
        {
            var req_seats = dbContext.Passengers.Where(x => x.BookingId == b_id).Select(y => y.RequiredSeats).FirstOrDefault();

            var trainId = dbContext.Passengers.Where(x => x.BookingId == b_id).Select(y => y.TrainId).FirstOrDefault();

            var quota = dbContext.Passengers.Where(x => x.BookingId == b_id).Select(y => y.PassengerQuota).FirstOrDefault();

            var tr_details = dbContext.Trains.Where(x => x.TrainId == trainId).FirstOrDefault();

            if (tr_details != null)
            {
                if (quota.ToLower() == "ladies")
                {
                    var avail_seat_ladies = dbContext.Trains.Where(x => x.TrainId == trainId).Select(y => y.Avl_Seats_Ladies).FirstOrDefault();

                    int remaining_seats_ladies = avail_seat_ladies + req_seats;

                    tr_details.Avl_Seats_Ladies = remaining_seats_ladies;


                    dbContext.SaveChanges();




                    return Ok();


                }
                else if (quota.ToLower() == "general")
                {
                    var avail_seat_general = dbContext.Trains.Where(x => x.TrainId == trainId).Select(y => y.Avl_Seats_General).FirstOrDefault();

                    int remaining_seats_general = avail_seat_general + req_seats;

                    tr_details.Avl_Seats_General = remaining_seats_general;


                    dbContext.SaveChanges();

                    return Ok();
                }
            }
            else
            {
                return NotFound();
            }

            return Ok();

        }







    }
}
