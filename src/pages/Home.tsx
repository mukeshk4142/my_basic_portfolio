import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Mail, Award, Send, Phone, MapPin, ArrowRight, Building2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const Home: React.FC = () => {
  const { profileData, addMessage } = usePortfolio();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await addMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.number,
        message: formData.message
      });
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', number: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const companies = [
    "Google", "Microsoft", "Amazon", "Netflix", "Spotify", 
    "Adobe", "Salesforce", "Oracle", "IBM", "Intel", 
    "Meta", "Apple", "Uber", "Airbnb", "Twitter", "LinkedIn"
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24 pb-20 lg:pt-32 lg:pb-24">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
             <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-200 mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
             <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-indigo-200 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Column: Text */}
            <div className="text-center lg:text-left animate-fade-in-up order-2 lg:order-1">
              <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6 shadow-sm border border-indigo-200">
                Available for Freelance & Full-time
              </span>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-6 leading-tight">
                <span className="block">Hi, I'm {profileData.name}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 pb-2">
                  {profileData.title}
                </span>
              </h1>
              <p className="mt-2 text-lg text-gray-600 sm:max-w-xl sm:mx-auto lg:mx-0 mb-8 leading-relaxed">
                {profileData.about}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-full text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-indigo-200"
                  >
                    Hire Me
                  </button>
                  <button
                    onClick={() => navigate('/portfolio')}
                    className="flex items-center justify-center px-8 py-3.5 border border-indigo-200 text-base font-bold rounded-full text-indigo-700 bg-white hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                  >
                    View Resume <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative mx-auto lg:ml-auto w-full max-w-sm lg:max-w-md order-1 lg:order-2 mb-8 lg:mb-0">
               <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 border-4 border-white aspect-[4/5]">
                   {profileData.photoUrl ? (
                       <img
                        className="w-full h-full object-cover"
                        src={profileData.photoUrl}
                        alt={profileData.name}
                      />
                   ) : (
                       <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                           No Photo Uploaded
                       </div>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
               </div>
               
               {/* Decorative elements behind image */}
               <div className="absolute -bottom-5 -right-5 w-full h-full border-2 border-indigo-200 rounded-2xl -z-10 bg-indigo-50/50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
              <h2 className="text-sm text-indigo-600 font-bold tracking-wide uppercase">My Expertise</h2>
              <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Technical Skills
              </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
             {profileData.skills.length > 0 ? (
                 profileData.skills.map((skill, index) => (
                    <div key={index} className="group bg-slate-50 hover:bg-white rounded-xl p-4 lg:p-5 shadow-sm hover:shadow-lg border border-gray-100 hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1 text-center cursor-default flex items-center justify-center min-h-[80px]">
                        <span className="text-base lg:text-lg font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">{skill}</span>
                    </div>
                 ))
             ) : (
                 <p className="col-span-full text-center text-gray-500">No skills added yet.</p>
             )}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-10">
              <h2 className="text-sm text-indigo-600 font-bold tracking-wide uppercase">Learning & Growth</h2>
              <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Certifications
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileData.certificates.length > 0 ? (
                profileData.certificates.map((cert) => (
                <div key={cert.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Award className="h-20 w-20 text-indigo-600 transform rotate-12" />
                    </div>
                    <div className="relative z-10">
                        <div className="bg-indigo-50 rounded-lg w-12 h-12 flex items-center justify-center mb-4 text-indigo-600">
                            <Award className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{cert.name}</h3>
                        <p className="text-indigo-600 font-semibold text-sm mb-1">{cert.issuer}</p>
                        <p className="text-xs text-gray-500">{cert.date}</p>
                    </div>
                </div>
                ))
            ) : (
                <p className="col-span-full text-center text-gray-500">No certificates added yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Working Companies Section */}
      <section className="py-12 bg-white overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
            <h2 className="text-sm text-indigo-600 font-bold tracking-wide uppercase">Trusted By Leading Companies</h2>
        </div>
        
        <div className="flex flex-col gap-8">
            {/* Row 1: Left to Right */}
            <div className="relative w-full overflow-hidden py-2">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
                <div className="flex w-max min-w-full animate-marquee-reverse hover:[animation-play-state:paused] items-center gap-8 px-4">
                   {[...companies, ...companies].map((company, index) => (
                       <div key={index} className="flex items-center gap-3 bg-slate-50 hover:bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-100 min-w-[200px] justify-center hover:shadow-md hover:border-indigo-100 transition-all group">
                           <Building2 className="w-5 h-5 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                           <span className="text-lg font-bold text-slate-600 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                               {company}
                           </span>
                       </div>
                   ))}
                </div>
            </div>

             {/* Row 2: Right to Left */}
             <div className="relative w-full overflow-hidden py-2">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
                <div className="flex w-max min-w-full animate-marquee hover:[animation-play-state:paused] items-center gap-8 px-4">
                   {[...companies, ...companies].map((company, index) => (
                       <div key={index} className="flex items-center gap-3 bg-slate-50 hover:bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-100 min-w-[200px] justify-center hover:shadow-md hover:border-indigo-100 transition-all group">
                           <Building2 className="w-5 h-5 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                           <span className="text-lg font-bold text-slate-600 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                               {company}
                           </span>
                       </div>
                   ))}
                </div>
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-sm text-indigo-600 font-bold tracking-wide uppercase">Contact</h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Get In Touch
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {/* Contact Info */}
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-indigo-700 text-white p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <p className="text-indigo-100 mb-8 leading-relaxed text-sm lg:text-base">
                  Ready to start a project? Fill up the form and I will get back to you shortly.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-indigo-800/50 p-2 rounded-lg">
                        <Mail className="h-5 w-5 text-indigo-200" />
                    </div>
                    <div className="ml-4">
                      <p className="text-xs text-indigo-300 uppercase tracking-wider font-semibold">Email</p>
                      <p className="text-base font-medium">{profileData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-800/50 p-2 rounded-lg">
                        <Phone className="h-5 w-5 text-indigo-200" />
                    </div>
                    <div className="ml-4">
                      <p className="text-xs text-indigo-300 uppercase tracking-wider font-semibold">Phone</p>
                      <p className="text-base font-medium">{profileData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-indigo-800/50 p-2 rounded-lg">
                        <MapPin className="h-5 w-5 text-indigo-200" />
                    </div>
                    <div className="ml-4">
                      <p className="text-xs text-indigo-300 uppercase tracking-wider font-semibold">Location</p>
                      <p className="text-base font-medium">{profileData.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex space-x-4">
                <a href="#" className="p-3 bg-indigo-800 rounded-full hover:bg-white hover:text-indigo-900 transition-all shadow-lg hover:shadow-xl">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="p-3 bg-indigo-800 rounded-full hover:bg-white hover:text-indigo-900 transition-all shadow-lg hover:shadow-xl">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 p-8 lg:p-10 bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 bg-slate-50 border transition-all hover:bg-white"
                        placeholder="John Doe"
                    />
                    </div>

                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 bg-slate-50 border transition-all hover:bg-white"
                        placeholder="john@example.com"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="number"
                        id="number"
                        value={formData.number}
                        onChange={handleInputChange}
                        className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 bg-slate-50 border transition-all hover:bg-white"
                        placeholder="+91 98765 43210"
                    />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-3 bg-slate-50 border transition-all hover:bg-white"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <div className="flex justify-end pt-2">
                    <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center px-8 py-3.5 border border-transparent rounded-full shadow-lg shadow-indigo-200 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                    <Send className="w-5 h-5 mr-2" />
                    {sending ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="mb-3">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">MukeshDev</span>
          </div>
          <p className="text-slate-500 text-center text-xs">
            © {new Date().getFullYear()} {profileData.name}. All rights reserved. <br/>
            Designed with <span className="text-red-500">♥</span> using React & Tailwind.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
