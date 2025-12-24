import React, { useState } from 'react';
import { assets } from '../assets/assets.js';
import { 
  FaShieldAlt, 
  FaMoneyBillWave, 
  FaExchangeAlt, 
  FaShippingFast, 
  FaClock, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaBoxOpen,
  FaUndo,
  FaTimesCircle,
  FaTruck,
  FaTags,
  FaFileInvoice,
  FaBox,
  FaClipboardCheck,
  FaChevronDown,
  FaChevronUp,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp
} from 'react-icons/fa';

const ReturnRefundPolicy = () => {
  const [activeTab, setActiveTab] = useState('return');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const refundTypes = [
    {
      type: "Return Refund",
      icon: <FaUndo className="text-blue-600" />,
      description: "Refund processed after item is returned to warehouse and QC is completed",
      timeline: "7-14 business days",
      process: [
        "Item returned to warehouse",
        "Quality Check (QC) completed",
        "Refund approved",
        "Amount credited to your account"
      ]
    },
    {
      type: "Canceled Order Refund",
      icon: <FaTimesCircle className="text-green-600" />,
      description: "Refund automatically initiated once cancellation is successfully processed",
      timeline: "3-5 business days",
      process: [
        "Order cancellation confirmed",
        "Refund auto-initiated",
        "Processing begins",
        "Amount credited to your account"
      ]
    },
    {
      type: "Failed Delivery Refund",
      icon: <FaTruck className="text-red-600" />,
      description: "Refund begins once item reaches the seller",
      timeline: "5-10 business days",
      process: [
        "Failed delivery confirmed",
        "Item returned to seller",
        "Verification completed",
        "Refund processed"
      ]
    }
  ];

  const returnInstructions = [
    {
      icon: <FaBoxOpen className="text-purple-600" />,
      title: "Product Condition",
      requirements: [
        "Must be unused, clean, and free from defects",
        "Original condition must be maintained"
      ]
    },
    {
      icon: <FaTags className="text-blue-600" />,
      title: "Original Components",
      requirements: [
        "Include original tags and labels",
        "User manual and warranty card",
        "All free gifts and accessories"
      ]
    },
    {
      icon: <FaFileInvoice className="text-green-600" />,
      title: "Documentation",
      requirements: [
        "Original invoice must be included",
        "Return form properly filled"
      ]
    },
    {
      icon: <FaBox className="text-orange-600" />,
      title: "Packaging",
      requirements: [
        "Original manufacturer's packaging",
        "Intact and undamaged box",
        "No tape/stickers directly on manufacturer's packaging"
      ]
    }
  ];

  const validReasons = [
    {
      reason: "Damaged or Defective",
      description: "Torn, broken, or non-functional items",
      icon: <FaExclamationTriangle className="text-red-500" />
    },
    {
      reason: "Incomplete Delivery",
      description: "Missing items or incorrect quantity",
      icon: <FaExclamationTriangle className="text-orange-500" />
    },
    {
      reason: "Wrong Product",
      description: "Incorrect product, size, color, or expired item",
      icon: <FaExclamationTriangle className="text-yellow-500" />
    },
    {
      reason: "Description Mismatch",
      description: "Product doesn't match advertisement or images",
      icon: <FaExclamationTriangle className="text-blue-500" />
    }
  ];

  const refundTimeline = [
    { method: "Bank Transfer", time: "2-3 business days", icon: "🏦" },
    { method: "bKash", time: "Instant to 24 hours", icon: "📱" },
    { method: "Store Voucher", time: "Immediate", icon: "🎫" },
    { method: "Credit/Debit Card", time: "5-7 business days", icon: "💳" }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <div className="relative w-full h-96 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <FaShieldAlt className="text-5xl text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Return & Refund Policy
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Transparent, hassle-free returns and refunds for your peace of mind
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaClock className="text-blue-300" />
                <span className="text-white">7-Day Return Window</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaMoneyBillWave className="text-green-300" />
                <span className="text-white">Full Refund Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaShippingFast className="text-purple-300" />
                <span className="text-white">Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-full mx-auto px-4 py-12">
        {/* Policy Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('return')}
            className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-3 ${
              activeTab === 'return'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
            }`}
          >
            <FaExchangeAlt />
            Return Policy
          </button>
          <button
            onClick={() => setActiveTab('refund')}
            className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-3 ${
              activeTab === 'refund'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
            }`}
          >
            <FaMoneyBillWave />
            Refund Policy
          </button>
        </div>

        {/* Return Policy Content */}
        {activeTab === 'return' && (
          <div className="space-y-12">
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaExchangeAlt className="text-blue-600" />
                Return Policy Overview
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 text-lg mb-4">
                    If a product is damaged, defective, incorrect, or incomplete at the time of delivery, 
                    please contact our customer service for returns or refunds.
                  </p>
                  <p className="text-gray-700 text-lg">
                    Return the product within 7 days of receiving it and receive a refund via bank payment, 
                    bKash, or voucher. For more information about the return policy, please refer to our 
                    complete Return Policy document.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FaClock className="text-blue-600" />
                    Quick Facts
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>7-day return window from delivery</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>Free pickup for eligible returns</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>Original condition required</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Valid Reasons Grid */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                Valid Reasons for Return
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {validReasons.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-t-4 border-blue-500"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-blue-50 rounded-full mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.reason}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Return Instructions */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <FaClipboardCheck className="text-purple-600" />
                Important Return Instructions
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {returnInstructions.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col h-full">
                      <div className="p-3 bg-gray-50 rounded-lg inline-flex w-fit mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                      <ul className="space-y-2 flex-grow">
                        {item.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <FaExclamationTriangle className="text-yellow-600" />
                Important Notes
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Order Number & Tracking:</span> Always mention the order number and return tracking number in your return package to avoid any issues or delays in your return process.
                  </p>
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Acknowledgment Slip:</span> When handing over your package to the drop-off station/pickup agent, please collect the GhorerBazar Return Acknowledgment Slip and keep it for future reference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Refund Policy Content */}
        {activeTab === 'refund' && (
          <div className="space-y-12">
            {/* Refund Overview */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaMoneyBillWave className="text-green-600" />
                Refund Policy Overview
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 text-lg mb-4">
                    The processing time of your refund depends on the type of refund and the payment method you used.
                    The refund process begins once GhorerBazar processes your refund according to the type of refund.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <p className="text-green-800 font-semibold">
                      💰 The refund amount covers the product price and shipping fee for your returned item.
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FaClock className="text-green-600" />
                    Refund Timeline
                  </h3>
                  <div className="space-y-4">
                    {refundTimeline.map((method, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{method.icon}</span>
                          <span className="font-medium">{method.method}</span>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {method.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Types */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <FaUndo className="text-blue-600" />
                Types of Refunds
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {refundTypes.map((type, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          {type.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{type.type}</h3>
                          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm inline-block mt-1">
                            {type.timeline}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-6 flex-grow">{type.description}</p>
                      <div>
                        <h4 className="font-semibold mb-3">Process:</h4>
                        <ul className="space-y-2">
                          {type.process.map((step, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-600">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm">
                                {idx + 1}
                              </div>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <FaExclamationTriangle className="text-orange-600" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: "How long does it take to receive my refund?",
                    a: "Refund processing time depends on your payment method. Bank transfers take 2-3 business days, bKash is instant to 24 hours, and credit card refunds take 5-7 business days."
                  },
                  {
                    q: "Are shipping fees refundable?",
                    a: "Yes, the refund amount covers both the product price and shipping fees for your returned item."
                  },
                  {
                    q: "What happens if my return is rejected?",
                    a: "If your return doesn't meet our requirements, we'll contact you to arrange for the product to be sent back to you."
                  },
                  {
                    q: "Can I exchange a product instead of getting a refund?",
                    a: "Yes, you can request an exchange during the return process. We'll guide you through the available options."
                  }
                ].map((faq, index) => (
                  <div 
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSection(`faq-${index}`)}
                      className="w-full p-6 flex items-center justify-between text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-lg font-semibold text-gray-900">{faq.q}</span>
                      {expandedSections[`faq-${index}`] ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    {expandedSections[`faq-${index}`] && (
                      <div className="p-6 bg-white">
                        <p className="text-gray-700">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="flex items-center justify-center mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help with Returns or Refunds?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Our support team is here to help you 7 days a week
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="tel:+880XXXXXXXXXX" 
                className="flex items-center gap-3 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <FaPhoneAlt />
                Call Support
              </a>
              <a 
                href="mailto:support@gborerbazar.com" 
                className="flex items-center gap-3 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <FaEnvelope />
                Email Support
              </a>
              <a 
                href="https://wa.me/880XXXXXXXXXX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp />
                WhatsApp Chat
              </a>
            </div>
            <p className="mt-8 text-blue-200">
              Average response time: <span className="font-semibold">Under 2 hours</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;