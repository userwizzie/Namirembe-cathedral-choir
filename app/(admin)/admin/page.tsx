"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "../../../lib/supabase";

type Application = { id: string; created_at: string; full_name: string; voice_type: string; email: string; phone: string; status: string };
type ContactMessage = { id: string; created_at: string; full_name: string; email: string; subject: string; message: string };

export default function AdminPage() {
  const [sessionReady, setSessionReady] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadProtectedData() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) { setUserEmail(""); setApplications([]); setContactMessages([]); setSessionReady(true); return; }
    setUserEmail(session.user.email ?? "");
    const [{ data: applicationRows, error: applicationsError }, { data: contactRows, error: contactsError }] = await Promise.all([
      supabase.from("applications").select("id,created_at,full_name,voice_type,email,phone,status").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("id,created_at,full_name,email,subject,message").order("created_at", { ascending: false }),
    ]);
    if (applicationsError || contactsError) setMessage(applicationsError?.message ?? contactsError?.message ?? "Unable to load dashboard data.");
    setApplications(applicationRows ?? []); setContactMessages(contactRows ?? []); setSessionReady(true);
  }

  useEffect(() => { void loadProtectedData(); const { data: listener } = supabase.auth.onAuthStateChange(() => void loadProtectedData()); return () => listener.subscription.unsubscribe(); }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setBusy(true); setMessage(""); const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword }); setBusy(false); if (error) setMessage(error.message); }
  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage(""); const form = new FormData(event.currentTarget); const type = String(form.get("type")); let error;
    if (type === "news") ({ error } = await supabase.from("news").insert({ title: String(form.get("title")), category: String(form.get("category")), content: String(form.get("content")) }));
    else ({ error } = await supabase.from("events").insert({ title: String(form.get("title")), category: String(form.get("category")), event_date: String(form.get("event_date")), event_time: String(form.get("event_time")), venue: String(form.get("venue")), description: String(form.get("content")) }));
    setBusy(false); setMessage(error ? error.message : `${type === "news" ? "News" : "Event"} published.`); if (!error) event.currentTarget.reset();
  }

  if (!sessionReady) return <main className="admin-login"><div className="admin-login-card"><Image className="admin-logo" src="/Namirembe cathedral logo.png" alt="Namirembe Cathedral logo" width={72} height={80} priority /><p className="admin-kicker">Namirembe Cathedral Choir</p><h1>Checking<br /><em>your session.</em></h1></div></main>;
  if (!userEmail) return <main className="admin-login"><div className="admin-login-card"><Image className="admin-logo" src="/Namirembe cathedral logo.png" alt="Namirembe Cathedral logo" width={72} height={80} priority /><p className="admin-kicker">Namirembe Cathedral Choir</p><h1>Admin<br /><em>Portal</em></h1><p className="admin-muted">Secure access for the choir team.</p><form onSubmit={signIn}><label>Email Address<input required type="email" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} placeholder="admin@example.com" /></label><label>Password<input required type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} placeholder="Password" /></label><button className="admin-primary" disabled={busy} type="submit">{busy ? "Signing in..." : "Sign In to Admin Portal"}</button>{message && <p className="admin-error" role="alert">{message}</p>}</form></div></main>;

  return <main className="admin-portal"><aside className="admin-sidebar"><div className="admin-brand"><Image className="admin-sidebar-logo" src="/Namirembe cathedral logo.png" alt="Namirembe Cathedral logo" width={44} height={50} /><div><strong>NAMIREMBE</strong><small>CHOIR ADMIN PORTAL</small></div></div><nav aria-label="Administration navigation"><a href="#applications">Applications</a><a href="#contact-messages">Contact Messages</a><a href="#manage-events">Manage Events</a><a href="#publish-news">Publish News</a><a href="#settings">Settings</a></nav><button className="admin-sidebar-logout" onClick={() => supabase.auth.signOut()}>Log Out</button></aside><div className="admin-content"><header className="admin-topbar"><div><p className="admin-kicker">Administrative workspace</p><h1>Welcome, Mr. John Ssekibaala</h1></div><div className="admin-user"><span>Administrator</span><button className="admin-outline" onClick={() => supabase.auth.signOut()}>Log Out</button></div></header><div className="admin-grid"><section className="admin-panel" id="applications"><p className="admin-kicker">Applications</p><h2>Incoming choir applications</h2>{applications.length ? <div className="admin-table-wrap"><table><thead><tr><th>Name</th><th>Voice</th><th>Contact</th><th>Status</th></tr></thead><tbody>{applications.map((application) => <tr key={application.id}><td>{application.full_name}<small>{new Date(application.created_at).toLocaleDateString()}</small></td><td>{application.voice_type}</td><td>{application.email}<br />{application.phone}</td><td><span className="admin-status">{application.status}</span></td></tr>)}</tbody></table></div> : <p className="admin-muted">No applications have been submitted yet.</p>}</section><section className="admin-panel" id="contact-messages"><p className="admin-kicker">Contact Messages</p><h2>Recent enquiries</h2>{contactMessages.length ? <div className="admin-message-list">{contactMessages.map((contact) => <article key={contact.id}><strong>{contact.subject}</strong><span>{contact.full_name} · {contact.email}</span><p>{contact.message}</p></article>)}</div> : <p className="admin-muted">No contact messages have been submitted yet.</p>}</section><section className="admin-panel" id="manage-events"><p className="admin-kicker">Manage Events / Publish News</p><h2>Create content</h2><form className="admin-form" onSubmit={publish}><label>Content type<select name="type" defaultValue="event"><option value="event">Event</option><option value="news">News</option></select></label><label>Title<input required name="title" placeholder="Title" /></label><label>Category<input required name="category" placeholder="Services or Announcement" /></label><div className="admin-form-row"><label>Date<input required name="event_date" type="date" /></label><label>Time<input required name="event_time" placeholder="10:00 AM" /></label></div><label>Venue<input required name="venue" placeholder="Namirembe Cathedral" /></label><label>Details<textarea required name="content" rows={4} placeholder="Write the details..." /></label><button className="admin-primary" disabled={busy} type="submit">Publish to website</button>{message && <p className="admin-feedback" role="status">{message}</p>}</form></section><section className="admin-panel" id="publish-news"><p className="admin-kicker">Publish News</p><h2>Editorial note</h2><p className="admin-muted">Use the content form to publish announcements and keep the choir community informed.</p></section><section className="admin-panel" id="settings"><p className="admin-kicker">Settings</p><h2>Portal access</h2><p className="admin-muted">Signed in as {userEmail}. Authentication is managed through Supabase.</p></section></div></div></main>;
}
