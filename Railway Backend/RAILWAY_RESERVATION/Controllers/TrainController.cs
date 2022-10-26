using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Contracts;

namespace RAILWAY_RESERVATION.Controllers
{
    [ApiController]
    [Route("api/Train")]
    public class TrainController : Controller
    {
        private readonly ApplicationContext dbContext;

        public TrainController(ApplicationContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
 //       [Authorize]
        public IActionResult GetAllTrains()
        {
            return Ok(dbContext.Trains.ToList());

        }

        [HttpPatch]
        [Route("{id:int}/{datetime}/{fare}")]
   //   [Authorize]
        public IActionResult UpdateTrains(int id, DateTime datetime, int fare)
        {
            var TrainExists = dbContext.Trains.Find(id);

            if (TrainExists != null)
            {
                TrainExists.TrainTime = datetime;
                TrainExists.TrainFare = fare;


                dbContext.SaveChanges();
                return Ok(TrainExists);
            }

            return NotFound();

        }



        [HttpGet]
        [Route("{date}/{source}/{destination}")]
  //      [Authorize]
        public IActionResult GetTrainsByLocation(DateTime date, string source , string destination)
        {
           IEnumerable<Train> trains = dbContext.Trains.Where(e =>e.Train_Source == source && e.Train_Destination ==destination && e.TrainTime==date);

            return Ok(trains);

        }

       
        [HttpPost]
        [Route("{trainNo}/{trainName}/{train_Source}/{train_Destination}/{trainFare}/{trainTime}/{avl_Seats_General}/{avl_Seats_Ladies}")]
        //      [Authorize]
        public IActionResult AddTrains(int trainNo, string trainName, string train_Source, string train_Destination, int trainFare, DateTime trainTime, int avl_Seats_General, int avl_Seats_Ladies)
        {
            var a = new Train()
            {
                TrainNo = trainNo,
                TrainName = trainName,
                Train_Source = train_Source,
                Train_Destination = train_Destination,
                TrainFare = trainFare,
                TrainTime = trainTime,
                Avl_Seats_General = avl_Seats_General,
                Avl_Seats_Ladies = avl_Seats_Ladies,
            };

            dbContext.Trains.Add(a);
            dbContext.SaveChanges();

            return Ok();

        }

        


  
       

















    }
}
 