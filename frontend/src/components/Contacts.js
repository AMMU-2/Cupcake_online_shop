import React from 'react';
import '../css/Contacts.css';
 
const Contacts = () => {
  return (
    <div className="container contacts">
      <h1 className="contact-heading">CONTACT US</h1>
      <p className="contact-subtext">Our support is available 24/7.</p>
 
      <div className="contact-info">
        <h2 className="blue-team">Blue Team</h2>
        <p><strong>📞 Phone:</strong> +91-9988776655 / +91-9988776654</p>
        <p><strong>📧 Email:</strong> support@blueteam.com</p>
      </div>
    </div>
  );
};
 
export default Contacts;