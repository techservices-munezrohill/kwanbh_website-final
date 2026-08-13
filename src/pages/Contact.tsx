import React, { useState } from 'react';
import { MapPin, Send, BookOpen, CheckCircle, AlertCircle, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { sendEmail, ContactFormData } from '../utils/emailService';
import contactData from '../../content/contact.json';

const Contact = () => {
  const contact = contactData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'research-collaboration'
  });
  
  const [submissionStatus, setSubmissionStatus] = useState<{
    isSubmitting: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
  }>(
    {
      isSubmitting: false,
      isSuccess: false,
      isError: false,
      message: ''
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmissionStatus({ isSubmitting: true, isSuccess: false, isError: false, message: '' });
    
    try {
      const result = await sendEmail(formData as ContactFormData);
      
      if (result.success) {
        setSubmissionStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message: result.message
        });
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          inquiryType: 'research-collaboration'
        });
      } else {
        setSubmissionStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: result.message
        });
      }
    } catch (error) {
      setSubmissionStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'An unexpected error occurred. Please try again in a moment.'
      });
    }
    
    setTimeout(() => {
      setSubmissionStatus({ isSubmitting: false, isSuccess: false, isError: false, message: '' });
    }, 5000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Location',
      value: (
        <div className="space-y-1">
          {contact.locations.map((loc, i) => <div key={i}>{loc}</div>)}
        </div>
      ),
      link: '#'
    }
  ];

  const faqs = contact.faqs;

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-stone-900 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {contact.pageTitle}
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            {contact.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg h-full flex flex-col justify-between">
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-stone-900 mb-4">Send a Message</h2>
                  <p className="text-stone-600">
                    Fill out the form below and I'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-medium text-stone-700 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      >
                        <option value="research-collaboration">Research Collaboration</option>
                        <option value="speaking-engagement">Speaking Engagement</option>
                        <option value="consulting">Consulting</option>
                        <option value="media-interview">Media Interview</option>
                        <option value="student-inquiry">Student Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                        placeholder="Brief subject line"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Please provide details about your inquiry, including timeline, goals, and any specific requirements..."
                    ></textarea>
                  </div>

                  {submissionStatus.message && (
                    <div className={`p-4 rounded-lg flex items-center space-x-3 ${
                      submissionStatus.isSuccess 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {submissionStatus.isSuccess ? (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      )}
                      <p className="text-sm">{submissionStatus.message}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submissionStatus.isSubmitting}
                    className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {submissionStatus.isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info & Additional Options Column */}
            <div className="flex flex-col h-full justify-between space-y-6">
              
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-xl shadow-lg flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-stone-900 mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="text-amber-700 group-hover:text-amber-800">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-xs text-stone-500">{info.title}</div>
                        <div className="text-stone-900 font-medium text-sm">{info.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Options */}
              <div className="bg-white p-6 rounded-xl shadow-lg flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-stone-900 mb-4">Other Ways to Connect</h3>
                <div className="space-y-3">
                  <a
                    href="https://scholar.google.com/citations?user=l5x5Nj4AAAAJ&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-3 rounded-lg border border-stone-200 hover:border-amber-300 hover:bg-amber-50 transition-colors group"
                  >
                    <BookOpen className="h-5 w-5 text-amber-600 group-hover:text-amber-700" />
                    <div>
                      <div className="font-medium text-sm text-stone-900">Google Scholar</div>
                      <div className="text-xs text-stone-500">View my complete publication record</div>
                    </div>
                  </a>
                  <a
                    href="https://www.researchgate.net/profile/Kwan-Lamar-Blount-Hill"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-3 rounded-lg border border-stone-200 hover:border-amber-300 hover:bg-amber-50 transition-colors group"
                  >
                    <BookOpen className="h-5 w-5 text-amber-600 group-hover:text-amber-700" />
                    <div>
                      <div className="font-medium text-sm text-stone-900">ResearchGate Profile</div>
                      <div className="text-xs text-stone-500">Connect with me on ResearchGate</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Media & Professional Networks */}
              <div className="bg-white p-6 rounded-xl shadow-lg flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-stone-900 mb-4">Social Media & Networks</h3>
                <div className="grid grid-cols-2 gap-3">
                  <a href="#" className="flex items-center space-x-2 p-3 border border-stone-200 rounded-lg text-sm font-medium hover:bg-stone-50 transition-colors">
                    <Linkedin className="h-4 w-4 text-blue-700" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="https://x.com/kwanbh" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 border border-stone-200 rounded-lg text-sm font-medium hover:bg-stone-50 transition-colors"
                  >
                    <Twitter className="h-4 w-4 text-sky-500" />
                    <span>Twitter</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 p-3 border border-stone-200 rounded-lg text-sm font-medium hover:bg-stone-50 transition-colors">
                    <Facebook className="h-4 w-4 text-blue-600" />
                    <span>Facebook</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 p-3 border border-stone-200 rounded-lg text-sm font-medium hover:bg-stone-50 transition-colors">
                    <Instagram className="h-4 w-4 text-pink-600" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-stone-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-600 text-center mb-12">
            Quick answers to common questions about collaboration and engagement
          </p>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                <h4 className="text-lg font-semibold text-stone-900 mb-2">
                  {faq.question}
                </h4>
                <p className="text-stone-600 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;