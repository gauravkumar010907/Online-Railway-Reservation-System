using RAILWAY_RESERVATION.Helper;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RAILWAY_RESERVATION.Models
{

    public class Passenger
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PassengerId { get; set; }



        [Required]
        [ForeignKey("booking")]
       
        public int BookingId { get;set; }

        [Required]
        public string PassengerName { get; set; }

        [Required]
        public int PassengerAge { get; set; }

        public string PassengerGender { get; set; }

        [Required]
        [QuotaValidation]
        public string PassengerQuota { get; set; }

        [Required]
        [Range(1,6,ErrorMessage ="required")]  
        public int RequiredSeats { get; set; }

        [Required(ErrorMessage ="required")]
        public string Passenger_email { get; set; }

        [Required]
       [ForeignKey("trains")]
        public  int TrainId { get; set; }
        public int TotalFare { get; set; }


       

        /// NAVIGATION 
        [JsonIgnore]
       public Booking booking { get; set; }
        [JsonIgnore]
        public Train trains { get; set; }

      

    }
}
