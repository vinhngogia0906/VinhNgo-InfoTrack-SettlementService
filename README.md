# InfoTrack Settlement Service

A booking management system built for the InfoTrack coding challenge. The solution comprises an ASP.NET REST API backend, a React TypeScript frontend, and an xUnit test project.

## Architecture

| Component | Tech | Description |
|-----------|------|-------------|
| [Settlement Service Engine](./SettlementService) | ASP.NET 8.0, C# | REST API that accepts and validates booking reservations with time-slot capacity limits (max 4 simultaneous bookings per slot, business hours 09:00--17:00) |
| [Settlement Service UI](./settlement-service-ui) | React 18, TypeScript, MUI | Frontend form for creating bookings and viewing confirmation details |
| [Settlement Service Tests](./SettlementService.Tests) | xUnit | Unit tests for the booking controller, also run by GitHub Actions CI on every push to `main` |

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/vinhngogia0906/VinhNgo-InfoTrack-SettlementService.git
   ```
2. Follow the setup instructions in the README files for the [backend](./SettlementService) and [frontend](./settlement-service-ui) respectively.

## CI

A GitHub Actions workflow builds the .NET solution and runs tests on every push and pull request to `main`.
