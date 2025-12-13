import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section">
      <h2>Contact</h2>
      <p>Email: your.email@example.com</p>
      <p>LinkedIn: <a href="https://linkedin.com/in/yourprofile">Your Profile</a></p>
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Message"></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default Contact;