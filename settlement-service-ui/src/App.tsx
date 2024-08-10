import { useState } from 'react';
import './App.css';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import BookingSubmitForm from './components/BookingSubmitForm';
import infoTrackLogo from './assets/infoTrack_logo.jpg';

function App() {
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingTimeSlot, setBookingTimeSlot] = useState("");
  const [bookingName, setBookingName] = useState("");
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ bookingTime: '', name: '' });

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://localhost:7206/api/Booking', {
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
                labelId="booking-time-label"
                name="bookingTime"
                value={formData.bookingTime}
                onChange={handleChange}
                renderValue={(selected) => (selected ? selected : 'Select a time slot')}
              >
                <MenuItem value="09:00">09:00</MenuItem>
                <MenuItem value="10:00">10:00</MenuItem>
                <MenuItem value="11:00">11:00</MenuItem>
                {/* Add more time slots as needed */}
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
