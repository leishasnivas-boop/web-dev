function MyBookings({ bookings }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Match</th>
          <th>Stand</th>
          <th>Tickets</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {bookings.length === 0 ? (
          <tr><td colSpan="5">No bookings yet.</td></tr>
        ) : (
          bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.match}</td>
              <td>{b.stand}</td>
              <td>{b.qty}</td>
              <td>₹{b.total}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default MyBookings;