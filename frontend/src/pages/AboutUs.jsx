import React from 'react';
import { assets } from '../assets/assets.js';
import { 
  FaTruck, 
  FaShieldAlt, 
  FaHeadset, 
  FaAward, 
  FaUsers, 
  FaGlobeAsia,
  FaHeart,
  FaShoppingBag,
  FaStar,
  FaRocket,
  FaHandshake,
  FaLeaf,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa';
import { MdLocalGroceryStore, MdPayments } from 'react-icons/md';
import { GiCommercialAirplane } from 'react-icons/gi';
import { HiOutlineLightningBolt, HiOutlineCurrencyDollar } from 'react-icons/hi';
import {Link} from 'react-router-dom'
const AboutUs = () => {
  const teamMembers = [
    {
      name: "Mr oggy ",
      role: "CEO & Founder",
      image: "https://tse2.mm.bing.net/th/id/OIP.lbD25wKYnLzxz6PeHkQvywHaHC?pid=Api&P=0&h=220",
      bio: "Visionary leader with 15+ years in e-commerce"
    },
    {
      name: "jack",
      role: "Head of Operations",
      image: "https://imgcdn.stablediffusionweb.com/2024/9/14/32126d8d-b1ea-4a60-9878-b2f729b566fa.jpg",
      bio: "Expert in logistics and supply chain management"
    },
    {
      name: "mr patlu",
      role: "Tech Director",
      image: "https://tse1.mm.bing.net/th/id/OIP.z4tCNXMWxa-mWMLiBLuTgQHaEJ?pid=Api&P=0&h=220",
      bio: "Technology enthusiast driving innovation"
    },
    {
      name: "mr motu",
      image: "https://tse1.mm.bing.net/th/id/OIP.uANHyvwitj-Cj_IqT52VGQHaEK?pid=Api&P=0&h=220",
      bio: "Passionate about customer satisfaction"
    }
  ];

  const milestones = [
    { year: "2018", title: "Founded", description: "Started as a small online grocery store" },
    { year: "2019", title: "10K Customers", description: "Reached milestone of 10,000 happy customers" },
    { year: "2020", title: "Nationwide Delivery", description: "Expanded delivery to all 64 districts" },
    { year: "2021", title: "Mobile App Launch", description: "Launched iOS & Android applications" },
    { year: "2022", title: "1M+ Orders", description: "Processed over 1 million successful orders" },
    { year: "2023", title: "Award Winner", description: "Best E-commerce Platform of the Year" }
  ];

  const values = [
    {
      icon: <FaHeart className="text-red-500 text-3xl" />,
      title: "Customer First",
      description: "Your satisfaction is our top priority in every decision we make"
    },
    {
      icon: <FaShieldAlt className="text-blue-500 text-3xl" />,
      title: "Trust & Transparency",
      description: "Honest pricing, clear policies, and reliable service"
    },
    {
      icon: <FaLeaf className="text-green-500 text-3xl" />,
      title: "Quality Commitment",
      description: "Only the finest products reach your doorstep"
    },
    {
      icon: <FaHandshake className="text-purple-500 text-3xl" />,
      title: "Community Impact",
      description: "Supporting local farmers and businesses across Bangladesh"
    }
  ];

  const stats = [
    { number: "500K+", label: "Happy Customers", icon: <FaUsers className="text-2xl" /> },
    { number: "64", label: "Districts Covered", icon: <FaGlobeAsia className="text-2xl" /> },
    { number: "50K+", label: "Products", icon: <FaShoppingBag className="text-2xl" /> },
    { number: "98%", label: "Satisfaction Rate", icon: <FaStar className="text-2xl" /> }
  ];

  const features = [
    {
      icon: <FaTruck className="text-2xl" />,
      title: "Fast & Free Delivery",
      description: "Same-day delivery in major cities, nationwide coverage"
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Secure Payments",
      description: "100% secure transactions with multiple payment options"
    },
    {
      icon: <FaHeadset className="text-2xl" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-screen max-h-[800px] overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-10"></div>
          <img 
            src={assets.background} 
            alt="About Us Hero" 
            className="w-full h-full object-cover transform scale-110"
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-white px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-yellow-400">My Food</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Bangladesh's most trusted online marketplace, connecting millions to quality products with convenience and care
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/" onClick={() => window.scrollTo(0, 0)} className="px-8 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-full hover:bg-yellow-600 transition-all transform hover:scale-105 shadow-lg">
                Shop Now
              </Link>
              <button onClick={()=>alert("goriber story hoi na re paglaa")} className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all shadow-lg">
                Our Story
              </button>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Story</span>
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Founded in 2018, My Food began with a simple vision: to make shopping accessible, 
              convenient, and trustworthy for every Bangladeshi household. What started as a small 
              online grocery service has grown into a comprehensive marketplace serving millions.
            </p>
            <p className="text-gray-700 text-lg mb-8">
              Today, we're proud to be Bangladesh's fastest-growing e-commerce platform, 
              revolutionizing how people shop by combining technology with a deep understanding 
              of local needs and preferences.
            </p>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-xl">
                <GiCommercialAirplane className="text-3xl text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Rapid Growth</h3>
                <p className="text-gray-600">From startup to market leader in 5 years</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600" 
                alt="Our Team" 
                className="rounded-2xl shadow-xl"
              />
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600" 
                alt="Our Warehouse" 
                className="rounded-2xl shadow-xl mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600" 
                alt="Customer Service" 
                className="rounded-2xl shadow-xl"
              />
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600" 
                alt="Delivery Team" 
                className="rounded-2xl shadow-xl mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Numbers That <span className="text-blue-600">Speak</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Core Values</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide every decision we make at My Food
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200"
            >
              <div className="text-4xl mb-6">{value.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-blue-600">Leadership</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate team behind My Food's success story
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Journey</span>
          </h2>
          <p className="text-xl text-gray-600">Milestones that shaped My Food</p>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-400"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-1/2 md:px-8">
                  <div className={`bg-white p-6 rounded-2xl shadow-lg ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className="text-sm text-blue-600 font-semibold mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-lg mx-4 my-4 md:my-0 md:mx-0 z-10"></div>
                <div className="md:w-1/2 md:px-8"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose My Food?</h2>
            <p className="text-xl text-blue-100">Experience shopping like never before</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Vision</span> for Tomorrow
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              We're not just building an e-commerce platform; we're creating an ecosystem that empowers 
              Bangladeshi businesses, supports local communities, and makes quality products accessible to all.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <HiOutlineLightningBolt className="text-2xl text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Sustainable Growth</h3>
                  <p className="text-gray-600">Eco-friendly packaging and carbon-neutral delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <MdLocalGroceryStore className="text-2xl text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Digital Bangladesh</h3>
                  <p className="text-gray-600">Bringing every local shop online by 2025</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="text-center">
                <FaRocket className="text-6xl mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Join Our Journey</h3>
                <p className="mb-6 text-blue-100">
                  Be part of Bangladesh's digital revolution. Shop with purpose.
                </p>
                <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all shadow-lg">
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Get in <span className="text-blue-600">Touch</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                <FaPhone className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Call Us</h3>
              <p className="text-gray-600 mb-2">+880 1234 567890</p>
              <p className="text-gray-600">+880 9876 543210</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                <FaEnvelope className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Email Us</h3>
              <p className="text-gray-600 mb-2">support@My Food.com</p>
              <p className="text-gray-600">info@My Food.com</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-6">
                <FaMapMarkerAlt className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Visit Us</h3>
              <p className="text-gray-600">123 Business Avenue</p>
              <p className="text-gray-600">Dhaka 1212, Bangladesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience My Food?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join millions of satisfied customers who trust us for their daily needs
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={()=>alert("goriber abr app hoi na re pagla")} className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-black transition-all transform hover:scale-105 shadow-lg">
              Download Our App
            </button>
            <Link to='/' onClick={() => window.scrollTo(0, 0)} className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all shadow-lg">
              Explore Products
            </Link>
            <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-900/10 transition-all shadow-lg">
              Partner With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;