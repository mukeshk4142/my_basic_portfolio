import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePortfolio, ProfileData, Experience, Education, Certificate, HRRecord } from '@/context/PortfolioContext';
import { Link } from 'react-router-dom';
import { LogOut, Plus, Search, Edit2, Trash2, Eye, Home, MessageSquare, Briefcase, Users, Save, X } from 'lucide-react';
import Modal from '@/components/Modal';

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const { 
    profileData, 
    updateProfile, 
    messages, 
    deleteMessage,
    hrRecords,
    addHRRecord,
    updateHRRecord,
    deleteHRRecord
  } = usePortfolio();

  // Tab State
  const [activeTab, setActiveTab] = useState<'hr' | 'portfolio' | 'inbox'>('hr');

  // --- HR State ---
  // Using hrRecords from context now
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<HRRecord | null>(null);
  const [viewMode, setViewMode] = useState(false);

  const initialHRFormState: Omit<HRRecord, 'id'> = {
    hrName: '', contactNo: '', callingDate: '', companyName: '', location: '', package: '', jobRole: '',
    mailReceivedDate: '', mailRevertDate: '', interviewStatus: 'Process', interviewDate: '', finalStatus: '', remark: ''
  };
  const [hrFormData, setHrFormData] = useState<Omit<HRRecord, 'id'>>(initialHRFormState);

  // --- Portfolio State (Local buffer before saving) ---
  const [localProfile, setLocalProfile] = useState<ProfileData>(profileData);

  // Sync global profile to local state when switching tabs or loading
  useEffect(() => {
    setLocalProfile(profileData);
  }, [profileData]);

  // --- Handlers: HR ---
  const handleHRInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHrFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHRSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentRecord) {
        await updateHRRecord(currentRecord.id, hrFormData);
      } else {
        await addHRRecord(hrFormData);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving record:", error);
      alert("Failed to save record.");
    }
  };

  const handleDeleteHR = async (id: string) => {
    if (window.confirm('Delete this record?')) {
      try {
        await deleteHRRecord(id);
      } catch (error) {
        console.error("Error deleting record:", error);
        alert("Failed to delete record.");
      }
    }
  };

  const openAddModal = () => {
    setCurrentRecord(null);
    setHrFormData(initialHRFormState);
    setViewMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (record: HRRecord) => {
    setCurrentRecord(record);
    setHrFormData(record);
    setViewMode(false);
    setIsModalOpen(true);
  };

  const openViewModal = (record: HRRecord) => {
    setCurrentRecord(record);
    setHrFormData(record);
    setViewMode(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
    setViewMode(false);
  };

  const filteredRecords = hrRecords.filter(record =>
    Object.values(record).some(value =>
      value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // --- Handlers: Portfolio ---
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File too large (max 2MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalProfile(prev => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          if (file.size > 2 * 1024 * 1024) {
              alert("File too large (max 2MB)");
              return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
              setLocalProfile(prev => ({ ...prev, resumeUrl: reader.result as string }));
          };
          reader.readAsDataURL(file);
      }
  };

  // Lists (Experience, Education, Skills, Certificates)
  const addExperience = () => {
    const newExp: Experience = { id: Date.now().toString(), role: '', company: '', period: '', description: '' };
    setLocalProfile(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
  };
  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setLocalProfile(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };
  const removeExperience = (id: string) => {
    setLocalProfile(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
  };

  const addEducation = () => {
    const newEdu: Education = { id: Date.now().toString(), degree: '', school: '', year: '' };
    setLocalProfile(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };
  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setLocalProfile(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };
  const removeEducation = (id: string) => {
    setLocalProfile(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
  };

  const addCertificate = () => {
    const newCert: Certificate = { id: Date.now().toString(), name: '', issuer: '', date: '' };
    setLocalProfile(prev => ({ ...prev, certificates: [...prev.certificates, newCert] }));
  };
  const updateCertificate = (id: string, field: keyof Certificate, value: string) => {
    setLocalProfile(prev => ({
      ...prev,
      certificates: prev.certificates.map(cert => cert.id === id ? { ...cert, [field]: value } : cert)
    }));
  };
  const removeCertificate = (id: string) => {
    setLocalProfile(prev => ({ ...prev, certificates: prev.certificates.filter(cert => cert.id !== id) }));
  };

  const addSkill = () => {
    setLocalProfile(prev => ({ ...prev, skills: [...prev.skills, ""] }));
  };
  const updateSkill = (index: number, value: string) => {
    const newSkills = [...localProfile.skills];
    newSkills[index] = value;
    setLocalProfile(prev => ({ ...prev, skills: newSkills }));
  };
  const removeSkill = (index: number) => {
    setLocalProfile(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  const savePortfolioChanges = async () => {
    try {
      await updateProfile(localProfile);
      alert("Portfolio updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update portfolio.");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if(window.confirm("Delete this message?")) {
        try {
            await deleteMessage(id);
        } catch (error) {
            console.error(error);
            alert("Failed to delete message");
        }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <span className="text-xl font-bold text-gray-800">Admin Dashboard</span>
              
              <div className="hidden md:flex space-x-4">
                <button
                  onClick={() => setActiveTab('hr')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'hr' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}
                >
                  <Users className="inline-block w-4 h-4 mr-1" /> HR Records
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'portfolio' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}
                >
                  <Briefcase className="inline-block w-4 h-4 mr-1" /> Manage Portfolio
                </button>
                <button
                  onClick={() => setActiveTab('inbox')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'inbox' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}
                >
                  <MessageSquare className="inline-block w-4 h-4 mr-1" /> Inbox ({messages.length})
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600">
                <Home className="h-4 w-4 mr-1" /> Home
              </Link>
              <button onClick={() => logout()} className="text-red-600 hover:bg-red-50 px-3 py-2 rounded-md">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Tab Nav */}
        <div className="md:hidden flex justify-around bg-white border-t border-gray-100 py-2">
             <button onClick={() => setActiveTab('hr')} className={`p-2 ${activeTab === 'hr' ? 'text-indigo-600' : 'text-gray-500'}`}><Users /></button>
             <button onClick={() => setActiveTab('portfolio')} className={`p-2 ${activeTab === 'portfolio' ? 'text-indigo-600' : 'text-gray-500'}`}><Briefcase /></button>
             <button onClick={() => setActiveTab('inbox')} className={`p-2 ${activeTab === 'inbox' ? 'text-indigo-600' : 'text-gray-500'}`}><MessageSquare /></button>
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- HR RECORDS TAB --- */}
        {activeTab === 'hr' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search HR records..."
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={openAddModal}
                className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Record
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['S.No', 'HR Name', 'Company', 'Number', 'Contact Date', 'Package', 'Role', 'Mail Recvd', 'Interview', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.length === 0 ? (
                    <tr><td colSpan={11} className="px-3 py-4 text-center text-sm text-gray-500">No records found</td></tr>
                  ) : (
                    filteredRecords.map((record, index) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{index + 1}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">{record.hrName}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{record.companyName}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{record.contactNo}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{record.callingDate}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{record.package}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{record.jobRole}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{record.mailReceivedDate}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{record.interviewDate}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${record.finalStatus.toLowerCase() === 'pass' ? 'bg-green-100 text-green-800' : 
                                  record.finalStatus.toLowerCase() === 'fail' ? 'bg-red-100 text-red-800' : 
                                  'bg-gray-100 text-gray-800'}`}>
                                {record.finalStatus || '-'}
                            </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs font-medium space-x-2">
                          <button onClick={() => openViewModal(record)} className="text-indigo-600 hover:text-indigo-900"><Eye className="h-4 w-4" /></button>
                          <button onClick={() => openEditModal(record)} className="text-blue-600 hover:text-blue-900"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => handleDeleteHR(record.id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- PORTFOLIO TAB --- */}
        {activeTab === 'portfolio' && (
          <div className="space-y-8 bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-800">Edit Portfolio</h2>
              <button onClick={savePortfolioChanges} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </button>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Personal Info</h3>
                <input name="name" value={localProfile.name} onChange={handleProfileChange} placeholder="Full Name" className="w-full border p-2 rounded" />
                <input name="title" value={localProfile.title} onChange={handleProfileChange} placeholder="Job Title" className="w-full border p-2 rounded" />
                <input name="email" value={localProfile.email} onChange={handleProfileChange} placeholder="Email" className="w-full border p-2 rounded" />
                <input name="phone" value={localProfile.phone} onChange={handleProfileChange} placeholder="Phone" className="w-full border p-2 rounded" />
                <input name="location" value={localProfile.location} onChange={handleProfileChange} placeholder="Location" className="w-full border p-2 rounded" />
                <textarea name="about" value={localProfile.about} onChange={handleProfileChange} rows={4} placeholder="About Me" className="w-full border p-2 rounded" />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Profile Photo</h3>
                {localProfile.photoUrl && <img src={localProfile.photoUrl} alt="Profile" className="h-32 w-32 rounded-full object-cover border" />}
                <input type="file" onChange={handlePhotoUpload} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                
                <h3 className="text-lg font-medium text-gray-900 pt-4">Resume</h3>
                 <div className="flex flex-col space-y-2">
                    <input name="resumeUrl" value={localProfile.resumeUrl || ''} onChange={handleProfileChange} placeholder="Resume URL (e.g. Google Drive Link)" className="w-full border p-2 rounded" />
                    <span className="text-xs text-gray-500 text-center">- OR -</span>
                    <input type="file" onChange={handleResumeUpload} accept=".pdf,.doc,.docx" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                 </div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Experience</h3>
                <button onClick={addExperience} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"><Plus className="h-4 w-4 mr-1"/> Add Job</button>
              </div>
              <div className="space-y-4">
                {localProfile.experience.map((exp) => (
                  <div key={exp.id} className="border p-4 rounded bg-gray-50 relative">
                    <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} placeholder="Role" className="border p-2 rounded" />
                      <input value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="Company" className="border p-2 rounded" />
                      <input value={exp.period} onChange={(e) => updateExperience(exp.id, 'period', e.target.value)} placeholder="Period (e.g. 2020-2022)" className="border p-2 rounded" />
                      <textarea value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} placeholder="Description" rows={2} className="border p-2 rounded w-full md:col-span-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Education</h3>
                <button onClick={addEducation} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"><Plus className="h-4 w-4 mr-1"/> Add School</button>
              </div>
              <div className="space-y-4">
                {localProfile.education.map((edu) => (
                  <div key={edu.id} className="border p-4 rounded bg-gray-50 relative">
                     <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="Degree" className="border p-2 rounded" />
                      <input value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} placeholder="School" className="border p-2 rounded" />
                      <input value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} placeholder="Year" className="border p-2 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                <button onClick={addSkill} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"><Plus className="h-4 w-4 mr-1"/> Add Skill</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {localProfile.skills.map((skill, index) => (
                  <div key={index} className="flex items-center bg-gray-100 rounded-md p-1">
                    <input
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      className="bg-transparent border-none focus:ring-0 text-sm p-1 w-32"
                      placeholder="Skill Name"
                    />
                    <button onClick={() => removeSkill(index)} className="text-red-500 hover:text-red-700 ml-1"><X className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Certificates */}
             <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Certificates</h3>
                <button onClick={addCertificate} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"><Plus className="h-4 w-4 mr-1"/> Add Certificate</button>
              </div>
              <div className="space-y-4">
                {localProfile.certificates.map((cert) => (
                  <div key={cert.id} className="border p-4 rounded bg-gray-50 relative">
                     <button onClick={() => removeCertificate(cert.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input value={cert.name} onChange={(e) => updateCertificate(cert.id, 'name', e.target.value)} placeholder="Certificate Name" className="border p-2 rounded" />
                      <input value={cert.issuer} onChange={(e) => updateCertificate(cert.id, 'issuer', e.target.value)} placeholder="Issuer" className="border p-2 rounded" />
                      <input value={cert.date} onChange={(e) => updateCertificate(cert.id, 'date', e.target.value)} placeholder="Date" className="border p-2 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* --- INBOX TAB --- */}
        {activeTab === 'inbox' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Inbox Messages</h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {messages.length === 0 ? (
                <li className="px-6 py-4 text-center text-gray-500">No messages yet.</li>
              ) : (
                messages.map((msg) => (
                  <li key={msg.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-indigo-600">{msg.name}</span>
                          <span className="ml-2 text-xs text-gray-500">{new Date(msg.date).toLocaleString()}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{msg.email} | {msg.phone}</div>
                        <p className="mt-2 text-sm text-gray-800">{msg.message}</p>
                      </div>
                      <button onClick={() => handleDeleteMessage(msg.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

      </main>

      {/* HR Modal (Only render when open to avoid clutter) */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={viewMode ? 'View HR Record' : currentRecord ? 'Edit HR Record' : 'Add New HR Record'}
      >
        <form onSubmit={handleHRSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {/* Fields... (Simplified for brevity, but matching the original logic) */}
             <div><label className="block text-sm font-medium">HR Name</label><input name="hrName" value={hrFormData.hrName} onChange={handleHRInputChange} disabled={viewMode} className="w-full border rounded p-2" required /></div>
             <div><label className="block text-sm font-medium">Company</label><input name="companyName" value={hrFormData.companyName} onChange={handleHRInputChange} disabled={viewMode} className="w-full border rounded p-2" /></div>
             <div><label className="block text-sm font-medium">Number</label><input name="contactNo" value={hrFormData.contactNo} onChange={handleHRInputChange} disabled={viewMode} className="w-full border rounded p-2" /></div>
             <div><label className="block text-sm font-medium">Location</label><input name="location" value={hrFormData.location} onChange={handleHRInputChange} disabled={viewMode} className="w-full border rounded p-2" /></div>
             <div><label className="block text-sm font-medium">Package</label><input name="package" value={hrFormData.package} onChange={handleHRInputChange} disabled={viewMode} className="w-full border rounded p-2" /></div>
             <div><label className="block text-sm font-medium">Role</label><input name="jobRole" value={hrFormData.jobRole} onChange={handleHRInputChange} disabled={viewMode} className="w-full border rounded p-2" /></div>
             <div><label className="block text-sm font-medium">Calling Date</label><input type="date" name="callingDate" value={hrFormData.callingDate} onChange={handleHRInputChange} disabled={viewMode} className="w-full border rounded p-2" /></div>
             <div><label className="block text-sm font-medium">Mail Recv Date</label><input type="date" name="mailReceivedDate" value={hrFormData.mailReceivedDate} onChange={handleHRInputChange} disabled={viewMode} className="w-full border rounded p-2" /></div>
             <div><label className="block text-sm font-medium">Interview Date</label><input type="date" name="interviewDate" value={hrFormData.interviewDate} onChange={handleHRInputChange} disabled={viewMode} className="w-full border rounded p-2" /></div>
             <div>
                <label className="block text-sm font-medium">Status</label>
                <select name="finalStatus" value={hrFormData.finalStatus} onChange={handleHRInputChange} disabled={viewMode} className="w-full border rounded p-2">
                    <option value="">Select Status</option>
                    <option value="Process">Process</option>
                    <option value="Pass">Pass</option>
                    <option value="Fail">Fail</option>
                    <option value="Hold">Hold</option>
                </select>
             </div>
             <div className="col-span-2"><label className="block text-sm font-medium">Remark</label><textarea name="remark" value={hrFormData.remark} onChange={handleHRInputChange} disabled={viewMode} className="w-full border rounded p-2" rows={3} /></div>
          </div>
          {!viewMode && <div className="flex justify-end pt-4"><button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Save Record</button></div>}
        </form>
      </Modal>

    </div>
  );
};

export default Dashboard;
