using Microsoft.AspNetCore.Mvc;
using SettlementService.Controllers;
using SettlementService.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SettlementService.Tests
{
    public class BookingControllerTests
    {
        private readonly BookingController _controller;

        public BookingControllerTests()
        {
            _controller = new BookingController();
        }

        [Fact]
        public void CreateBooking_ValidRequest_ShouldReturnOk()
        {
            // Arrange
            var request = new BookingRequest
            {
                BookingTime = "12:30",
                Name = "John Smith"
            };

            // Act
            var result = _controller.CreateBooking(request) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
        }

        [Fact]
        public void CreateBooking_InvalidTimeFormat_ShouldReturnBadRequest()
        {
            // Arrange
            var request = new BookingRequest
            {
                BookingTime = "9:30 AM", // Invalid format
                Name = "John Smith"
            };

            // Act
            var result = _controller.CreateBooking(request) as BadRequestObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.Equal("Invalid time format. Please use HH:mm format.", result.Value);
        }

        [Fact]
        public void CreateBooking_OutsideBusinessHours_ShouldReturnBadRequest()
        {
            // Arrange
            var request = new BookingRequest
            {
                BookingTime = "08:30", // Before business hours
                Name = "John Smith"
            };

            // Act
            var result = _controller.CreateBooking(request) as BadRequestObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.Equal("Booking time is outside of business hours.", result.Value);
        }

        [Fact]
        public void CreateBooking_EmptyName_ShouldReturnBadRequest()
        {
            // Arrange
            var request = new BookingRequest
            {
                BookingTime = "09:30",
                Name = "" // Empty name
            };

            // Act
            var result = _controller.CreateBooking(request) as BadRequestObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.Equal("Name cannot be empty.", result.Value);
        }

        [Fact]
        public void CreateBooking_MaxSimultaneousBookingsReached_ShouldReturnConflict()
        {
            // Arrange
            var request = new BookingRequest
            {
                BookingTime = "09:30",
                Name = "John Smith"
            };

            // Pre-fill the booking slot with max bookings
            for (int i = 0; i < 4; i++)
            {
                _controller.CreateBooking(new BookingRequest
                {
                    BookingTime = "09:30",
                    Name = $"Test {i}"
                });
            }

            // Act
            var result = _controller.CreateBooking(request) as ConflictObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal((int)HttpStatusCode.Conflict, result.StatusCode);
            Assert.Equal("All spots at this booking time are reserved.", result.Value);
        }
    }
}
