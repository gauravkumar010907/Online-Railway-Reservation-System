using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RAILWAY_RESERVATION.Models
{
    public class Payment
    {
        [JsonIgnore]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PaymentId { get; set; }

        [Required]
        public long CardNumber { get; set; }

        [Required]
        [StringLength(30, ErrorMessage = "Name is too big")]
        public string CardHolderName { get; set; }

        [Required]
        [Range(100,999)]
        public int CVV { get; set; }

        [Required]
        [ForeignKey("passenger")] 
        public int PassengerId { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime ExpiryDate { get; set; }



        //navigation
        [JsonIgnore]
       public Passenger passenger { get; set; }

    }
}
