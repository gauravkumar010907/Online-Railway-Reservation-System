using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RAILWAY_RESERVATION.Models
{
    public class Train
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        
        public int TrainId { get; set; }

        [Required]
        public int TrainNo { get; set; }

        [Required]
        public string TrainName { get; set; }

        [Required]
        public DateTime TrainTime { get; set; }

        [Required]
        public string Train_Source { get; set; }

        [Required]
        public string Train_Destination { get; set; }

        [Required]
        public int TrainFare { get; set; }

        [Required]
        public int Avl_Seats_General { get; set; }

        [Required]
        public int Avl_Seats_Ladies { get; set; }

      

    }
}
