using System.ComponentModel.DataAnnotations;

namespace SmartDisaster.API.Models
{
    public class DisasterIntimation
    {
        public int Id { get; set; }

        [Required]
        public string DisasterType { get; set; }

        [Required]
        public string Region { get; set; }

        [Required]
        public DateTime DateOccurred { get; set; }
    }
}
