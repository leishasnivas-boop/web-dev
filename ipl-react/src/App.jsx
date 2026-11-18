import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import matches from "./data/matches";

function App() {
  const [selectedMatch, setSelectedMatch] = useState("None");

  return (
    <>
      <Navbar />
      <Hero />

      <section id="matches" className="section">
        <h2>Match Schedule</h2>
        <p>Selected match: <b>{selectedMatch}</b></p>

        <div className="match-grid">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onBook={setSelectedMatch}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default App;