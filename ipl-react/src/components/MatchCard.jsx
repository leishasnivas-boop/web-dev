function MatchCard({ match, onBook }) {
  return (
    <article className="match-card">
      <h3>{match.teams}</h3>
      <p>{match.date}</p>
      <p>Venue: {match.venue}</p>
      <p>General ₹{match.general} | Premium ₹{match.premium} | VIP ₹{match.vip}</p>
      <button onClick={() => onBook(match.teams)}>Book</button>
    </article>
  );
}

export default MatchCard;