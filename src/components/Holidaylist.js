import React, { useState, useEffect } from 'react';

function HolidayList() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('https://attendance-backend-five.vercel.app/holiday/holidays')
      .then((response) => response.json())
      .then((data) => {
        setHolidays(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      });
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  // Function to format the date in a human-readable format
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(); // You can customize the date format further if needed
  };

  // Sort holidays by date
  holidays.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Holiday List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <hr />
          {holidays.map((holiday) => (
            <div key={holiday._id}>
              <div style={{ marginLeft: '20px' }}>
                {formatDate(holiday.date)} {/* Format the date */}
              </div>
              <div style={{ marginLeft: '20px', marginTop: '5px' }}>
                {holiday.holidaytype}
              </div>
              <hr />
            </div>
          ))}
          {/* Add a horizontal line with margin */}
        </div>
      )}
    </div>
  );
}

export default HolidayList;
