import { useState } from "react";

function BookingForm({ matches, selectedMatch, setSelectedMatch, onConfirm }) {
  const [stand, setStand] = useState("");
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [delivery, setDelivery] = useState("E-Ticket");
  const [extras, setExtras] = useState([]);

  // Live summary: recalculated on every render
  const match = matches.find((m) => m.teams === selectedMatch);
  const price = match && stand ? match[stand.toLowerCase()] : 0;
  const total = price * qty;

  function toggleExtra(item) {
    if (extras.includes(item)) {
      setExtras(extras.filter((e) => e !== item));
    } else {
      setExtras([...extras, item]);
    }
  }

  function resetForm() {
    setSelectedMatch("");
    setStand("");
    setQty(1);
    setName("");
    setEmail("");
    setPhone("");
    setDelivery("E-Ticket");
    setExtras([]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm({
      match: selectedMatch,
      stand,
      qty,
      total,
      name,
      email,
      phone,
      delivery,
      extras: extras.join(", ")
    });
    resetForm();
  }

  return (
    <div className="booking">
      <form onSubmit={handleSubmit}>
        <p>
          <label>Match:</label><br />
          <select value={selectedMatch} onChange={(e) => setSelectedMatch(e.target.value)} required>
            <option value="">-- Choose a match --</option>
            {matches.map((m) => (
              <option key={m.id} value={m.teams}>{m.teams}</option>
            ))}
          </select>
        </p>

        <p>
          <label>Stand Category:</label><br />
          <select value={stand} onChange={(e) => setStand(e.target.value)} required>
            <option value="">-- Choose a stand --</option>
            <option value="General">General</option>
            <option value="Premium">Premium</option>
            <option value="VIP">VIP</option>
          </select>
        </p>

        <p>
          <label>Number of Tickets (1 to 6):</label><br />
          <input type="number" min="1" max="6" value={qty}
                 onChange={(e) => setQty(Number(e.target.value))} required />
        </p>

        <p>
          <label>Full Name:</label><br />
          <input type="text" minLength="3" maxLength="50" value={name}
                 onChange={(e) => setName(e.target.value)} required />
        </p>

        <p>
          <label>Email:</label><br />
          <input type="email" value={email}
                 onChange={(e) => setEmail(e.target.value)} required />
        </p>

        <p>
          <label>Phone Number:</label><br />
          <input type="tel" pattern="[0-9]{10}" title="Enter a 10-digit number"
                 value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </p>

        <fieldset>
          <legend>Ticket Delivery:</legend>
          <label>
            <input type="radio" name="delivery" value="E-Ticket"
                   checked={delivery === "E-Ticket"}
                   onChange={(e) => setDelivery(e.target.value)} />
            E-Ticket (Email)
          </label>
          <label>
            <input type="radio" name="delivery" value="Stadium"
                   checked={delivery === "Stadium"}
                   onChange={(e) => setDelivery(e.target.value)} />
            Collect at Stadium
          </label>
        </fieldset>

        <fieldset>
          <legend>Additional Preferences:</legend>
          {["Parking Pass", "Meal Combo", "Team Jersey"].map((item) => (
            <label key={item}>
              <input type="checkbox"
                     checked={extras.includes(item)}
                     onChange={() => toggleExtra(item)} />
              {item}
            </label>
          ))}
        </fieldset>

        <button type="submit">Confirm Booking</button>
        <button type="button" className="reset-btn" onClick={resetForm}>Reset</button>
      </form>

      <aside className="card">
        <h3>Booking Summary</h3>
        <p>Match: {selectedMatch || "-"}</p>
        <p>Stand: {stand || "-"}</p>
        <p>Ticket Price: ₹{price}</p>
        <p>Quantity: {qty}</p>
        <p><b>Total Amount: ₹{total}</b></p>
      </aside>
    </div>
  );
}

export default BookingForm;