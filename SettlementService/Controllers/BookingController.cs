using Microsoft.AspNetCore.Mvc;
using SettlementService.Model;
using System.Collections.Concurrent;

namespace SettlementService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private static readonly ConcurrentDictionary<TimeSpan, List<Booking>> _bookingsList = new();
        private const int MaxSimultaneousBookings = 4;
        private static readonly TimeSpan BusinessStartTime = new(9, 0, 0);
        private static readonly TimeSpan BusinessEndTime = new(17, 0, 0);

        [HttpPost]
        public IActionResult CreateBooking([FromBody] BookingRequest bookingRequest)
        {
            // Convert the bookingTime string to TimeSpan
            if (!TimeSpan.TryParseExact(bookingRequest.BookingTime, @"hh\:mm", null, out TimeSpan bookingTime))
            {
                return BadRequest("Invalid time format. Please use HH:mm format.");
            }

            // Validate the booking time is within business hours
            if (bookingTime < BusinessStartTime || bookingTime >= BusinessEndTime)
            {
                return BadRequest("Booking time is outside of business hours.");
            }

            // Validate name
            if (string.IsNullOrWhiteSpace(bookingRequest.Name))
            {
                return BadRequest("Name cannot be empty.");
            }

            // Check if the booking time already has the maximum allowed bookings
            var bookingTimeSlot = _bookingsList.GetOrAdd(bookingTime, _ => new List<Booking>());
            if (bookingTimeSlot.Count >= MaxSimultaneousBookings)
            {
                return Conflict("All spots at this booking time are reserved.");
            }

            // Create booking
            var booking = new Booking
            {
                Id = Guid.NewGuid(),
                Name = bookingRequest.Name,
                BookingTime = bookingTime
            };
            bookingTimeSlot.Add(booking);

            return Ok(new { bookingId = booking.Id });
        }
    }
}
