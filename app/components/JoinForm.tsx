"use client";

import { FormEvent, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function JoinForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const { error: insertError } = await supabase.from("applications").insert({
      full_name: form.get("name"),
      voice_type: form.get("voice"),
      email: form.get("email"),
      phone: form.get("phone"),
      musical_background: form.get("background") || null,
    });
    setBusy(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) return <div className="success-message"><strong>Thank you for reaching out.</strong><span>Our choir office will be in touch soon.</span></div>;

  return <form onSubmit={submit}>
    <div className="form-row"><label>Name<input name="name" required placeholder="Your full name" /></label><label>Voice type<select name="voice" defaultValue="" required><option value="" disabled>Select a section</option><option>Soprano</option><option>Alto</option><option>Tenor</option><option>Bass</option></select></label></div>
    <div className="form-row"><label>Email<input name="email" type="email" required placeholder="you@example.com" /></label><label>Phone<input name="phone" type="tel" required placeholder="+256" /></label></div>
    <label>Tell us about your musical background<textarea name="background" rows={3} placeholder="A little about your experience..." /></label>
    {error && <p className="body-copy light-text">Unable to submit: {error}</p>}
    <button className="button button-light submit-button" type="submit" disabled={busy}>{busy ? "Sending..." : "Send my application"} <span>↗</span></button>
  </form>;
}
