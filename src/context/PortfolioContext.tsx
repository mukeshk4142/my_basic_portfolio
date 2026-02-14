import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '@/firebase';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  updateDoc,
  query,
  orderBy
} from 'firebase/firestore';

// --- Types ---

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  photoUrl: string;
  resumeUrl: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export interface HRRecord {
  id: string; // Changed from number to string for Firestore ID compatibility
  hrName: string;
  contactNo: string;
  callingDate: string;
  companyName: string;
  location: string;
  package: string;
  jobRole: string;
  mailReceivedDate: string;
  mailRevertDate: string;
  interviewStatus: 'Process' | 'Complete' | 'Pass' | 'Fail';
  interviewDate: string;
  finalStatus: string;
  remark: string;
}

interface PortfolioContextType {
  profileData: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => Promise<void>;
  
  messages: Message[];
  addMessage: (msg: Omit<Message, 'id' | 'date'>) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;

  hrRecords: HRRecord[];
  addHRRecord: (record: Omit<HRRecord, 'id'>) => Promise<void>;
  updateHRRecord: (id: string, record: Partial<HRRecord>) => Promise<void>;
  deleteHRRecord: (id: string) => Promise<void>;
}

// --- Default Data ---

const defaultProfile: ProfileData = {
  name: "Mukesh",
  title: "Python Developer",
  email: "mukesh@example.com",
  phone: "+91 98765 43210",
  location: "India",
  about: "I have 4 years of experience building robust and scalable web applications. Specializing in Python, Django, Flask, and cloud technologies. Passionate about writing clean, efficient code and solving complex problems.",
  photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300",
  resumeUrl: "",
  skills: ["Python", "Django", "Flask", "React", "PostgreSQL", "Docker", "AWS"],
  experience: [
    {
      id: "1",
      role: "Senior Python Developer",
      company: "Tech Solutions Inc.",
      period: "2021 - Present",
      description: "Leading backend development for scalable web applications using Django and AWS."
    },
    {
      id: "2",
      role: "Python Developer",
      company: "WebSystems Ltd.",
      period: "2019 - 2021",
      description: "Developed RESTful APIs and managed database migrations for e-commerce platforms."
    }
  ],
  education: [
    {
      id: "1",
      degree: "B.Tech in Computer Science",
      school: "Tech University",
      year: "2015 - 2019"
    }
  ],
  certificates: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022"
    }
  ]
};

// --- Context ---

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfile);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hrRecords, setHrRecords] = useState<HRRecord[]>([]);

  // 1. Subscribe to Profile Data
  useEffect(() => {
    const docRef = doc(db, 'portfolio_data', 'profile');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfileData(docSnap.data() as ProfileData);
      } else {
        // If doc doesn't exist (fresh DB), set default data
        setDoc(docRef, defaultProfile);
      }
    });
    return unsubscribe;
  }, []);

  // 2. Subscribe to Messages
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
    });
    return unsubscribe;
  }, []);

  // 3. Subscribe to HR Records
  useEffect(() => {
    const q = query(collection(db, 'hr_records'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as HRRecord[];
      setHrRecords(records);
    });
    return unsubscribe;
  }, []);


  // --- Actions ---

  const updateProfile = async (data: Partial<ProfileData>) => {
    const docRef = doc(db, 'portfolio_data', 'profile');
    // We merge with existing data
    await setDoc(docRef, data, { merge: true });
  };

  const addMessage = async (msg: Omit<Message, 'id' | 'date'>) => {
    const newMessage = {
      ...msg,
      date: new Date().toISOString()
    };
    await addDoc(collection(db, 'messages'), newMessage);
  };

  const deleteMessage = async (id: string) => {
    await deleteDoc(doc(db, 'messages', id));
  };

  const addHRRecord = async (record: Omit<HRRecord, 'id'>) => {
    await addDoc(collection(db, 'hr_records'), record);
  };

  const updateHRRecord = async (id: string, record: Partial<HRRecord>) => {
    await updateDoc(doc(db, 'hr_records', id), record);
  };

  const deleteHRRecord = async (id: string) => {
    await deleteDoc(doc(db, 'hr_records', id));
  };

  return (
    <PortfolioContext.Provider value={{ 
      profileData, 
      updateProfile, 
      messages, 
      addMessage, 
      deleteMessage,
      hrRecords,
      addHRRecord,
      updateHRRecord,
      deleteHRRecord
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
