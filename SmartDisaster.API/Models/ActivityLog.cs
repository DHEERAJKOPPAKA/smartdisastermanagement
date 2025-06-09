using System.ComponentModel.DataAnnotations;

namespace SmartDisaster.API.Models
{
    public class ActivityLog
    {
        public int Id { get; set; }

        [Required]
        public string PerformedBy { get; set; } 

        [Required]
        [RegularExpression("Admin|Citizen")]
        public string Role { get; set; }

        [Required]
        [StringLength(200)]
        public string Action { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
