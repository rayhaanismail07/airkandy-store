import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  MessageCircle,
  Mail,
  Clock,
  MapPin,
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'order-inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How does discreet delivery work in South Africa?',
      a: 'All orders are sealed in double odor-proof vacuum barriers and placed inside plain, unbranded courier satchels. There is zero mention of AirKandy, cannabis, or edibles on the exterior. Dispatched via Express Courier with live SMS tracking.',
    },
    {
      q: 'What is the recommended dosage for Lifted Snacks gummies?',
      a: 'For beginners or first-time edible users, we strongly advise starting with half a gummy (15mg - 20mg). Edibles must pass through the liver, so allow 45 to 90 minutes for onset before considering taking more.',
    },
    {
      q: 'What payment options are supported?',
      a: 'We accept instant zero-fee EFT via Ozow (Capitec, FNB, Standard Bank, Absa, Nedbank, TymeBank), 3D Secure Credit & Debit Card payments via PayFast, and direct manual bank wire transfers.',
    },
    {
      q: 'Do I have to be 18 to order?',
      a: 'Yes, strictly 18+. AirKandy operates strictly in compliance with South African personal adult privacy laws. Our couriers and checkout require age confirmation.',
    },
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ak-teal">VIP Customer Concierge</p>
        <h1 className="text-3xl sm:text-5xl font-bold text-wd-gray900">
          Get in Touch With <span className="text-ak-teal">AirKandy</span>
        </h1>
        <p className="text-sm text-wd-gray600">
          Have questions about Lifted Snacks potency, strain profiles, or your delivery?
          Our botanical team is here to assist 7 days a week.
        </p>
      </div>

      {/* 3 Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WhatsApp Direct */}
        <div
          className="p-6 bg-white border border-gray-200 hover:border-ak-teal transition-colors space-y-4 flex flex-col justify-between"
          style={{ borderRadius: 2 }}
        >
          <div className="space-y-2">
            <div
              className="w-12 h-12 bg-ak-warm text-ak-teal flex items-center justify-center border border-ak-teal/20"
              style={{ borderRadius: 2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-wd-gray900">WhatsApp Live Chat</h3>
            <p className="text-xs text-wd-gray600">
              Fastest response time (usually under 15 minutes during operating hours).
            </p>
          </div>

          <a
            href="https://wa.me/27820000000?text=Hi%20AirKandy,%20I%20have%20an%20order%20inquiry"
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-ak-teal text-wd-gray900 font-bold text-sm hover:bg-ak-teal/90 transition-colors"
            style={{ borderRadius: 2 }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>

        {/* Operating Hours */}
        <div
          className="p-6 bg-white border border-gray-200 hover:border-ak-teal transition-colors space-y-4"
          style={{ borderRadius: 2 }}
        >
          <div
            className="w-12 h-12 bg-ak-warm text-ak-teal flex items-center justify-center border border-ak-teal/20"
            style={{ borderRadius: 2 }}
          >
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-wd-gray900">Dispensary &amp; Support Hours</h3>
          <ul className="text-xs space-y-1.5 text-wd-gray600 font-medium">
            <li className="flex justify-between">
              <span>Monday â€“ Friday:</span>
              <strong className="text-wd-gray900">09:00 â€“ 19:00</strong>
            </li>
            <li className="flex justify-between">
              <span>Saturday:</span>
              <strong className="text-wd-gray900">10:00 â€“ 18:00</strong>
            </li>
            <li className="flex justify-between">
              <span>Sunday &amp; Public Holidays:</span>
              <strong className="text-wd-gray900">10:00 â€“ 16:00</strong>
            </li>
          </ul>
        </div>

        {/* Courier & Dispatch Hubs */}
        <div
          className="p-6 bg-white border border-gray-200 hover:border-ak-teal transition-colors space-y-4"
          style={{ borderRadius: 2 }}
        >
          <div
            className="w-12 h-12 bg-ak-warm text-ak-teal flex items-center justify-center border border-ak-teal/20"
            style={{ borderRadius: 2 }}
          >
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-wd-gray900">South African Dispatch Hubs</h3>
          <p className="text-xs text-wd-gray600 leading-relaxed">
            Orders are fulfilled daily from our secure, climate-controlled distribution hubs in
            <strong> Johannesburg &amp; Cape Town</strong> for rapid nationwide dispatch.
          </p>
        </div>
      </div>

      {/* Inquiry Form & FAQ Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div
          className="lg:col-span-6 p-6 sm:p-8 bg-white border border-gray-200 space-y-6"
          style={{ borderRadius: 2 }}
        >
          <div>
            <h2 className="text-xl font-bold text-wd-gray900">Send Us a Direct Message</h2>
            <p className="text-xs text-wd-gray600 mt-1">
              We respond to all email inquiries within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div
              className="p-6 bg-ak-warm border border-ak-teal/30 text-center space-y-3"
              style={{ borderRadius: 2 }}
            >
              <CheckCircle2 className="w-10 h-10 text-ak-teal mx-auto" />
              <h3 className="text-base font-bold text-wd-gray900">Message Dispatched!</h3>
              <p className="text-xs text-wd-gray600">
                Thank you, {formData.name}. Our support team will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-wd-gray700 font-semibold">Your Full Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Smith"
                    className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-wd-gray900 focus:outline-none focus:border-ak-teal"
                    style={{ borderRadius: 2 }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-wd-gray700 font-semibold">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@gmail.com"
                    className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-wd-gray900 focus:outline-none focus:border-ak-teal"
                    style={{ borderRadius: 2 }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-wd-gray700 font-semibold">Inquiry Topic</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white border border-gray-200 px-3 py-2.5 text-wd-gray900 focus:outline-none focus:border-ak-teal"
                  style={{ borderRadius: 2 }}
                >
                  <option value="order-inquiry">ðŸ“¦ Order Status &amp; Delivery Tracking</option>
                  <option value="dosage-advice">ðŸ¬ Lifted Snacks Dosage &amp; Potency Advice</option>
                  <option value="grow-tech">ðŸŒ± Grow Light &amp; Cultivation Hardware Question</option>
                  <option value="wholesale">ðŸ¤ Wholesale &amp; Stockist Inquiries</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-wd-gray700 font-semibold">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you today?"
                  className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-wd-gray900 focus:outline-none focus:border-ak-teal resize-none"
                  style={{ borderRadius: 2 }}
                />
              </div>

              <Button
                variant="cyan"
                size="lg"
                fullWidth
                type="submit"
                rightIcon={<Send className="w-4 h-4" />}
              >
                Send Message
              </Button>
            </form>
          )}
        </div>

        {/* FAQs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-ak-teal uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 overflow-hidden"
                  style={{ borderRadius: 2 }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-wd-gray900 hover:bg-ak-warm transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-ak-teal" /> : <ChevronDown className="w-4 h-4 text-wd-gray600" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-wd-gray600 leading-relaxed border-t border-gray-100 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

