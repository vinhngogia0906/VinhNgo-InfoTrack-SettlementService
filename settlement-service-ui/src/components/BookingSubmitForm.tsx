import React, { useState } from 'react';

interface BookingSubmitFormProps {
  onSubmit: (formData: { bookingTime: string; name: string }) => void;
}

const BookingSubmitForm: React.FC<BookingSubmitFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [bookingTime, setBookingTime] = useState('09:00');
  const [error, setError] = useState('');

  const times = [
    '08:00','08:30', '09:00', '09:30', '10:00',
    '10:30', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00','14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setError('Name is required.');
      return;
    }
    onSubmit({ bookingTime, name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="bookingTime">Booking Time:</label>
        <select
          id="bookingTime"
          value={bookingTime}
          onChange={(e) => setBookingTime(e.target.value)}
        >
          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookingSubmitForm;