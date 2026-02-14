import React from 'react';
import { Phone, Mail, MapPin, Download, Briefcase, Code, Award, Calendar } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const Portfolio: React.FC = () => {
  const { profileData } = usePortfolio();

  const handleDownloadResume = () => {
      if (profileData.resumeUrl) {
          if (profileData.resumeUrl.startsWith('data:')) {
              const link = document.createElement('a');
              link.href = profileData.resumeUrl;
              link.download = 'Mukesh_Resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          } else {
              window.open(profileData.resumeUrl, '_blank');
          }
      } else {
          alert("Resume not available yet.");
      }
  };

  const scrollToContact = () => {
      window.location.href = "/#contact";
  };

  return (
    <div className="min-h-screen bg-slate-100 py-16 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-down">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">My Professional Journey</h2>
              <p className="mt-2 text-4xl font-extrabold text-gray-900">Curriculum Vitae</p>
          </div>
          
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden animate-fade-in-up">
              <div className="flex flex-col md:flex-row min-h-[800px]">
                  
                  {/* Left Column (Sidebar) */}
                  <div className="w-full md:w-80 bg-slate-900 text-white p-8 relative overflow-hidden">
                      {/* Decorative Background */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900 to-slate-900 opacity-90 z-0"></div>
                      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 z-0"></div>

                      <div className="relative z-10">
                          <div className="flex flex-col items-center mb-10">
                              <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-indigo-400 to-pink-500 mb-6 shadow-xl">
                                <img 
                                    src={profileData.photoUrl || "https://via.placeholder.com/150"} 
                                    alt={profileData.name} 
                                    className="w-full h-full rounded-full object-cover border-4 border-slate-900"
                                />
                              </div>
                              <h3 className="text-2xl font-bold text-center mb-1">{profileData.name}</h3>
                              <p className="text-indigo-300 font-medium text-center">{profileData.title}</p>
                          </div>

                          <div className="space-y-10">
                              <div>
                                  <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-5 border-b border-gray-700 pb-2">Contact</h4>
                                  <ul className="space-y-4 text-sm text-gray-300">
                                      <li className="flex items-center group">
                                          <div className="bg-gray-800 p-2 rounded-full mr-3 group-hover:bg-indigo-600 transition-colors">
                                              <Phone size={14} className="text-white"/>
                                          </div>
                                          {profileData.phone}
                                      </li>
                                      <li className="flex items-center group">
                                          <div className="bg-gray-800 p-2 rounded-full mr-3 group-hover:bg-indigo-600 transition-colors">
                                              <Mail size={14} className="text-white"/>
                                          </div>
                                          {profileData.email}
                                      </li>
                                      <li className="flex items-center group">
                                          <div className="bg-gray-800 p-2 rounded-full mr-3 group-hover:bg-indigo-600 transition-colors">
                                              <MapPin size={14} className="text-white"/>
                                          </div>
                                          {profileData.location}
                                      </li>
                                  </ul>
                              </div>

                              <div>
                                  <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-5 border-b border-gray-700 pb-2">Technical Skills</h4>
                                  <div className="flex flex-wrap gap-2">
                                      {profileData.skills.map((skill, idx) => (
                                          <span key={idx} className="bg-gray-800 hover:bg-indigo-700 text-gray-200 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-default border border-gray-700">
                                              {skill}
                                          </span>
                                      ))}
                                  </div>
                              </div>

                               <div>
                                  <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-5 border-b border-gray-700 pb-2">Education</h4>
                                  <ul className="space-y-6">
                                      {profileData.education.map((edu) => (
                                          <li key={edu.id} className="relative pl-2">
                                              <p className="font-bold text-white text-base leading-tight mb-1">{edu.degree}</p>
                                              <p className="text-sm text-indigo-300 mb-1">{edu.school}</p>
                                              <p className="text-xs text-gray-500 font-mono">{edu.year}</p>
                                          </li>
                                      ))}
                                  </ul>
                              </div>

                              <div>
                                  <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-5 border-b border-gray-700 pb-2">Certifications</h4>
                                  <ul className="space-y-4">
                                      {profileData.certificates.map((cert) => (
                                          <li key={cert.id} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                                              <div className="flex items-start">
                                                <Award size={16} className="mr-3 mt-0.5 text-indigo-400 flex-shrink-0"/> 
                                                <div>
                                                    <p className="font-bold text-gray-200 text-sm leading-snug">{cert.name}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{cert.issuer} • {cert.date}</p>
                                                </div>
                                              </div>
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          </div>

                          <div className="mt-12">
                              <button 
                                onClick={handleDownloadResume}
                                className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-500 hover:shadow-lg transition-all active:scale-95"
                              >
                                  <Download size={18} className="mr-2"/> Download PDF
                              </button>
                          </div>
                      </div>
                  </div>

                  {/* Right Column (Content) */}
                  <div className="flex-1 p-8 md:p-16 bg-white">
                      <div className="mb-16">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center border-b border-gray-100 pb-4">
                              <span className="bg-indigo-100 p-2.5 rounded-lg mr-4 text-indigo-600">
                                  <Code size={24}/>
                              </span>
                              Professional Profile
                          </h3>
                          <p className="text-gray-600 leading-8 text-lg font-light">
                              {profileData.about}
                          </p>
                      </div>

                      <div className="mb-12">
                          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center border-b border-gray-100 pb-4">
                              <span className="bg-indigo-100 p-2.5 rounded-lg mr-4 text-indigo-600">
                                  <Briefcase size={24}/>
                              </span>
                              Work Experience
                          </h3>
                          <div className="relative border-l-2 border-indigo-100 ml-4 space-y-12">
                              {profileData.experience.map((exp) => (
                                  <div key={exp.id} className="relative pl-10 group">
                                      {/* Timeline Dot */}
                                      <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-white bg-indigo-300 group-hover:bg-indigo-600 transition-colors shadow-sm"></div>
                                      
                                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                          <h4 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{exp.role}</h4>
                                          <div className="flex items-center text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full mt-2 sm:mt-0">
                                              <Calendar size={14} className="mr-2"/>
                                              {exp.period}
                                          </div>
                                      </div>
                                      
                                      <div className="text-indigo-600 font-medium mb-3 text-lg">{exp.company}</div>
                                      
                                      <p className="text-gray-600 text-base leading-relaxed">
                                          {exp.description}
                                      </p>
                                  </div>
                              ))}
                          </div>
                      </div>

                      <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between">
                          <div className="mb-4 sm:mb-0 text-center sm:text-left">
                              <h4 className="text-xl font-bold text-gray-900">Interested in working together?</h4>
                              <p className="text-gray-600 mt-1">I am always open to discussing product design work or partnerships.</p>
                          </div>
                           <button
                            onClick={scrollToContact}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-full shadow-md text-white bg-gray-900 hover:bg-gray-800 transition-all hover:-translate-y-0.5 whitespace-nowrap"
                          >
                            Hire Me
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Portfolio;
