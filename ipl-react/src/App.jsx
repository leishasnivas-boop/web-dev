import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MatchSchedule from "./components/MatchSchedule";
import BookingForm from "./components/BookingForm";
import MyBookings from "./components/MyBookings";
import Guidelines from "./components/Guidelines";
import matches from "./data/matches";

function App() {
  const [selectedMatch, setSelectedMatch] = useState("");
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState("");

  // Reusable toast (disappears after 3 seconds)
  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  }

  // Book button: select match, smooth scroll, toast
  function handleBook(teams) {
    setSelectedMatch(teams);
    document.getElementById("book").scrollIntoView({ behavior: "smooth" });
    showToast(teams + " selected. Now choose your stand.");
  }

  // Confirm booking: add a row to My Bookings
  // (this is where the Supabase insert will go in the next activity)
  function handleConfirm(details) {
    const newBooking = { id: "BK" + (bookings.length + 1), ...details };
    setBookings([...bookings, newBooking]);
    showToast("Booking confirmed! Total ₹" + details.total);
  }

  return (
    <div id="top">
      <Navbar />
      <Hero />

      <section className="section">
        <h2>About IPL 2026</h2>
        <About />
      </section>

      <section id="matches" className="section">
        <h2>Match Schedule</h2>
        <MatchSchedule matches={matches} onBook={handleBook} />
      </section>

      <section id="book" className="section">
        <h2>Book Your Ticket</h2>
        <BookingForm
          matches={matches}
          selectedMatch={selectedMatch}
          setSelectedMatch={setSelectedMatch}
          onConfirm={handleConfirm}
        />
      </section>

      <section id="bookings" className="section">
        <h2>My Ticket Bookings</h2>
        <MyBookings bookings={bookings} />
      </section>

      <section id="guidelines" className="section">
        <h2>Guidelines</h2>
        <Guidelines />
      </section>

      <footer className="footer">
        <p>&copy; 2026 IPL Ticket Booking. All rights reserved.</p>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;