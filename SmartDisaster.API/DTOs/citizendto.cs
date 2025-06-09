namespace SmartDisaster.API.DTOs
{
    public class citizendto
    {
        public int Id { get; set; }
        public int CitizenId { get; set; }
        public string Message { get; set; }
        public string DisasterType { get; set; }
        public string Region { get; set; }
        public DateTime AlertTime { get; set; }
    }
}
