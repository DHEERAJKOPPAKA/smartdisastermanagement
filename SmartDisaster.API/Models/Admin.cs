using System.ComponentModel.DataAnnotations;

namespace SmartDisaster.API.Models
{
    public class Admin
    {
        
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FullName { get; set; }  

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        public string Region { get; set; }
    }

}

