import { useState } from 'react';
import './App.css';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import infoTrackLogo from './assets/infoTrack_logo.jpg';

function App() {
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingTimeSlot, setBookingTimeSlot] = useState("");
  const [bookingName, setBookingName] = useState("");
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ bookingTime: '', name: '' });

  const timeOptions = [
    '08:00','08:30', '09:00', '09:30', '10:00',
    '10:30', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00','14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  const handleSubmit = async () => {
    const BACKEND_URI = process.env.SETTLE_SERVICE_BACKEND ?? 'https://localhost:7206/api/Booking';
    try {
      const response = await fetch(BACKEND_URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle non-200 responses
        const contentType = response.headers.get('Content-Type');
  
        if (contentType && contentType.includes('application/json')) {
          // Parse JSON error response
          const errorData = await response.json();
          setError(errorData);
          console.error('Error response:', errorData);
        } else {
          // Handle non-JSON error response
          const errorText = await response.text();
          setError(errorText);
          console.error('Error response:', errorText);
        }
        return;
      }
  
      // Process successful response
      const data = await response.json();
  
      if (data.bookingId) {
        setBookingId(data.bookingId);
        setBookingTimeSlot(formData.bookingTime);
        setBookingName(formData.name);
      } else {
        // Handle the case where there is no bookingId but the response is still OK
        const errorMessage = 'Booking ID not returned';
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (err) {
      // Handle network or unexpected errors
      console.error('Unexpected error:', err);
    }
  };

  const handleReSubmit = () => {
    setBookingId(null);
    setFormData({bookingTime: '', name: ''});
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      [event.target.name as string]: event.target.value,
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <img src={infoTrackLogo} alt="App Logo" className="app-logo" />
        <h1 className="app-title">InfoTrack Settlement Service</h1>
      </header>
      <main className="app-content">
        {bookingId ? (
          <div className="booking-success">
            <h1>Congratulation! Your booking has been successful!</h1>
            <p>Booking ID is: {bookingId}</p>
            <p>At {bookingTimeSlot}, by {bookingName}</p>
            <Button className="button" variant="contained" onClick={handleReSubmit}>
              Submit another booking
            </Button>
          </div>
        ) : (
          <div className="booking-form">
            <h1>Create a Booking</h1>
            <FormControl fullWidth margin="normal">
              <InputLabel id="booking-time-label">Booking Time</InputLabel>
              <Select
                label="Booking Time"
                name="bookingTime"
                value={formData.bookingTime}
                onChange={handleChange}
                renderValue={(selected) => (selected ? selected : 'Select a time slot')}
              >
                {timeOptions.map((timeOption) => (
                  <MenuItem key={timeOption} value={timeOption}>{timeOption}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
            />
            <Button variant='contained' onClick={handleSubmit}>Create Booking</Button>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
