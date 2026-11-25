import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MatchSchedule from "./components/MatchSchedule";
import BookingForm from "./components/BookingForm";
import MyBookings from "./components/MyBookings";
import Guidelines from "./components/Guidelines";

function App() {
  const [matches, setMatches] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  }

  // ---------- Fetch matches from Supabase ----------
  async function fetchMatches() {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("id");

    if (error) {
      showToast("Could not load matches: " + error.message);
    } else {
      setMatches(data);
    }
  }

  // ---------- Fetch bookings from Supabase ----------
  async function fetchBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      showToast("Could not load bookings: " + error.message);
    } else {
      setBookings(data);
    }
  }

  // ---------- Load data once, then listen for realtime changes ----------
  useEffect(() => {
    fetchMatches();
    fetchBookings();

    const channel = supabase
      .channel("ipl-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "matches" }, () => {
        fetchMatches();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, () => {
        fetchBookings();
      })
      .subscribe();

    // stop listening when the component is removed
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ---------- Book button ----------
  function handleBook(teams) {
    setSelectedMatch(teams);
    document.getElementById("book").scrollIntoView({ behavior: "smooth" });
    showToast(teams + " selected. Now choose your stand.");
  }

  // ---------- Confirm booking: insert + update seats ----------
  async function handleConfirm(details) {
    const match = matches.find((m) => m.teams === details.match);

    if (!match) {
      showToast("Please choose a match.");
      return false;
    }
    if (details.qty > match.available_seats) {
      showToast("Only " + match.available_seats + " seats left for this match.");
      return false;
    }

    // 1. Insert the booking
    const { error: insertError } = await supabase.from("bookings").insert({
      match_id: match.id,
      match_teams: match.teams,
      stand: details.stand,
      quantity: details.qty,
      total_amount: details.total,
      name: details.name,
      email: details.email,
      phone: details.phone,
      delivery: details.delivery,
      extras: details.extras
    });

    if (insertError) {
      showToast("Booking failed: " + insertError.message);
      return false;
    }

    // 2. Reduce the available seats
    const { error: updateError } = await supabase
      .from("matches")
      .update({ available_seats: match.available_seats - details.qty })
      .eq("id", match.id);

    if (updateError) {
      showToast("Booking saved, but seats were not updated: " + updateError.message);
      return true;
    }

    showToast("Booking confirmed! Total ₹" + details.total);
    return true;
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