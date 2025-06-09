namespace SmartDisaster.API.Models
{
    public class DisasterRecord
    {
        public int Id { get; set; }
        public string DisasterType { get; set; }
        public string Region { get; set; }
        public DateTime DateOccurred { get; set; }
    }

}
