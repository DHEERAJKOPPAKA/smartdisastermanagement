using System.ComponentModel.DataAnnotations;

namespace SmartDisaster.API.Models
{
    public class EvacuationPlan
    {
        public int Id { get; set; }

        [Required]
        public string Region { get; set; }

        [Required]
        [StringLength(1000)]
        public string PlanDetails { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    }
}
