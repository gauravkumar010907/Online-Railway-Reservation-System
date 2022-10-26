using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RAILWAY_RESERVATION.Models
{
    public class Booking
    {
        [JsonIgnore]
        [Key]
       [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        public int BookingId { get; set; }

        [Required]
        public string Booking_Source { get; set; }
        [Required]
        public string Booking_Destination { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime Booking_Date { get; set; }

       

        
    }
}
