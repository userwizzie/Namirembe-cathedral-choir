"use client";

import { FormEvent, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const { error: insertError } = await supabase.from("contact_messages").insert({
      full_name: form.get("name"),
      email: form.get("email"),
      subject: form.get("subject"),
      message: form.get("message"),
      enquiry_type: form.get("enquiry_type"),
    });
    setBusy(false);
    if (insertError) { setError(insertError.message); return; }
    setSent(true);
  }

  return <main><section className="intro section"><div className="section-label"><span>08</span><span>Contact us</span></div><div className="intro-grid"><div><p className="eyebrow">Find the choir</p><h1>Let's make<br /><em>music together.</em></h1></div><div><div className="contact-location-box"><p className="eyebrow light">Visit the choir</p><address><strong>Namirembe Cathedral</strong><span>Namirembe Hill Road<br />Kampala, Uganda</span></address><a href="https://www.google.com/maps/search/?api=1&query=Namirembe+Cathedral%2C+Namirembe+Hill%2C+Kampala%2C+Uganda" target="_blank" rel="noreferrer">Open in Google Maps ↗</a></div><p className="body-copy contact-details">General enquiries: +256 700 000 000<br />Choir office: choir@namirembe-cathedral.org</p></div></div><div className="join-content" style={{ background: "var(--green)" }}><p className="eyebrow light">Send an enquiry</p>{sent ? <div className="success-message"><strong>Message received.</strong><span>Our office will respond soon.</span></div> : <form onSubmit={submit}><div className="form-row"><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label></div><label>How can we help?<select required name="enquiry_type" defaultValue="General Enquiries"><option>General Enquiries</option><option>Prospective Members</option><option>Event/Performance Enquiries</option><option>Other</option></select></label><p className="contact-pathways"><a href="/join">Join the Choir</a><a href="/events">Upcoming Events</a></p><label>Subject<input required name="subject" placeholder="What is your enquiry about?" /></label><label>Your message<textarea required name="message" rows={4} placeholder="Write your enquiry..." /></label>{error && <p className="body-copy light-text">Unable to submit: {error}</p>}<button className="button button-light" disabled={busy} type="submit">{busy ? "Sending..." : "Send enquiry"} <span>-&gt;</span></button></form>}</div></section></main>;
}
