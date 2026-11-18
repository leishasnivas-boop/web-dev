import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <a href="#top" className="logo">IPL 2026</a>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        &#9776;
      </button>

      <nav className={menuOpen ? "open" : ""}>
        <a href="#matches" onClick={() => setMenuOpen(false)}>Matches</a>
        <a href="#book" onClick={() => setMenuOpen(false)}>Book Ticket</a>
        <a href="#bookings" onClick={() => setMenuOpen(false)}>My Bookings</a>
        <a href="#guidelines" onClick={() => setMenuOpen(false)}>Guidelines</a>
      </nav>
    </header>
  );
}

export default Navbar;