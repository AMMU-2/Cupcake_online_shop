import React from 'react';
import '../css/Contacts.css'; // Importing the CSS file for styling

const Contacts = () => {
  return (
    <div className="container contacts"> {/* Main container for the contacts section */}
      
      <h1 className="contact-heading">CONTACT US</h1> {/* Contact section heading */}
      <p className="contact-subtext">Our support is available 24/7.</p> {/* Subtext mentioning 24/7 support */}

      <div className="contact-info"> {/* Container for contact details */}
        <h2 className="blue-team">Blue Team</h2> {/* Team name heading */}
        
        {/* Contact phone details */}
        <p><strong>📞 Phone:</strong> +91-9988776655 / +91-9988776654</p>
        
        {/* Contact email details */}
        <p><strong>📧 Email:</strong> support@blueteam.com</p>
      </div>
    </div>
  );
};

export default Contacts; // Exporting the Contacts component
