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
              <td>BK{b.id}</td>
              <td>{b.match_teams}</td>
              <td>{b.stand}</td>
              <td>{b.quantity}</td>
              <td>₹{b.total_amount}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default MyBookings;