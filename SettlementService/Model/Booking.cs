using Microsoft.AspNetCore.Mvc;

namespace SettlementService.Model
{
    public class Booking
    {
        public Guid Id {  get; set; }
        public required TimeSpan BookingTime { get; set; }
        public required string Name { get; set; }
    }
}
