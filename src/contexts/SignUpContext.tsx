
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SignUpContextType {
  inviteCode: string;
  setInviteCode: (code: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  instagram: string;
  setInstagram: (handle: string) => void;
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export const useSignUp = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error('useSignUp must be used within a SignUpProvider');
  }
  return context;
};

interface SignUpProviderProps {
  children: ReactNode;
}

export const SignUpProvider: React.FC<SignUpProviderProps> = ({ children }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');

  return (
    <SignUpContext.Provider
      value={{
        inviteCode,
        setInviteCode,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        instagram,
        setInstagram,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};
