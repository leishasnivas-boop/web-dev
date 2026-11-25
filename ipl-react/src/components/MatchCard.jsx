function MatchCard({ match, onBook }) {
  const soldOut = match.available_seats <= 0;

  return (
    <article className="match-card">
      <h3>{match.teams}</h3>
      <p>{match.match_date}</p>
      <p>Venue: {match.venue}</p>
      <p>General ₹{match.general} | Premium ₹{match.premium} | VIP ₹{match.vip}</p>
      <p><b>Seats left: {match.available_seats}</b></p>
      <button disabled={soldOut} onClick={() => onBook(match.teams)}>
        {soldOut ? "Sold Out" : "Book"}
      </button>
    </article>
  );
}

export default MatchCard;