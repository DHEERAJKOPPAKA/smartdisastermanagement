using System.ComponentModel.DataAnnotations;

namespace SmartDisaster.API.Models
{
    public class RiskAssessment
    {
        public int Id { get; set; }

        [Required]
        public string Region { get; set; }

        [Required]
        public string DisasterType { get; set; }

        [Range(0, 1)]
        public double RiskScore { get; set; }

        public DateTime AssessmentDate { get; set; } = DateTime.UtcNow;
    }
}
