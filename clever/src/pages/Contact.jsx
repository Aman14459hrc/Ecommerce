import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Header */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-gray-500 mt-2">We’d love to hear from you!</p>
      </section>

      {/* Contact Info & Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <FaPhone className="text-orange-500 text-2xl" />
            <span className="text-gray-700">+91 9876543210</span>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-orange-500 text-2xl" />
            <span className="text-gray-700">support@example.com</span>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-orange-500 text-2xl" />
            <span className="text-gray-700">New Delhi, India</span>
          </div>

          <div className="flex gap-4 mt-6 text-gray-600">
            <a href="#"><FaFacebook size={22} /></a>
            <a href="#"><FaInstagram size={22} /></a>
            <a href="#"><FaTwitter size={22} /></a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-orange-500"
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition">
            Send Message
          </button>
        </form>
      </div>

      {/* Optional Map */}
      <div className="mt-16">
    <iframe
  title="Ascot UK Location"
  className="w-full h-64 rounded-lg border"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.2492222725895!2d-0.6948609!3d51.4028676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487678d7504cdd41%3A0xaafd1864f28c06a!2sAscot%2C%20UK!5e0!3m2!1sen!2sin!4v1720516743432!5m2!1sen!2sin"
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

      </div>
    </div>
  );
};

export default Contact;
