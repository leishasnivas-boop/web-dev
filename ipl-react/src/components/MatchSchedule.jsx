import { useState } from "react";
import MatchCard from "./MatchCard";

function MatchSchedule({ matches, onBook }) {
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState("all");
  const [view, setView] = useState("grid");

  // Keep a match only if it passes both the dropdown and the search box
  const filtered = matches.filter((m) => {
    const text = m.teams.toLowerCase();
    const matchesTeam = team === "all" || text.includes(team.toLowerCase());
    const matchesSearch = text.includes(search.toLowerCase());
    return matchesTeam && matchesSearch;
  });

  return (
    <>
      <div className="filter-bar">
        <div className="filters">
          <input
            type="text"
            placeholder="Search by team, e.g. RCB"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={team} onChange={(e) => setTeam(e.target.value)}>
            <option value="all">All Teams</option>
            <option value="CSK">CSK</option>
            <option value="MI">MI</option>
            <option value="RCB">RCB</option>
            <option value="KKR">KKR</option>
          </select>
        </div>

        <div className="view-toggle">
          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            Grid View
          </button>
          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            List View
          </button>
        </div>
      </div>

      <div className={view === "list" ? "match-grid list-view" : "match-grid"}>
        {filtered.length === 0 ? (
          <p>No matches found.</p>
        ) : (
          filtered.map((match) => (
            <MatchCard key={match.id} match={match} onBook={onBook} />
          ))
        )}
      </div>
    </>
  );
}

export default MatchSchedule;