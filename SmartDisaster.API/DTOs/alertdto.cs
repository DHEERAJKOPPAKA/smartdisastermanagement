using SmartDisaster.API.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SmartDisaster.API.DTOs
{
    public class alertdto
    {
        public int Id { get; set; }

        [Required]
        [ForeignKey("Citizen")]
        public int CitizenId { get; set; }

        [Required]
        [StringLength(300)]
        public string Message { get; set; }

        [Required]
        public string DisasterType { get; set; }

        [Required]
        public string Region { get; set; }

        public DateTime AlertTime { get; set; } = DateTime.UtcNow;

    }
}
