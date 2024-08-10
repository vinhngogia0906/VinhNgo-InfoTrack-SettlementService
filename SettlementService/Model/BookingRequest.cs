using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Text.Json.Serialization;

namespace SettlementService.Model
{
    public class BookingRequest
    {
        public required string BookingTime { get; set; }
        public required string Name { get; set; }
    }
}
