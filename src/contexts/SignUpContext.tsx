
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
  profilePhoto: File | null;
  setProfilePhoto: (photo: File | null) => void;
  photoPreviewUrl: string;
  setPhotoPreviewUrl: (url: string) => void;
  isExistingUser: boolean;
  setIsExistingUser: (isExisting: boolean) => void;
  isVerified: boolean;
  setIsVerified: (isVerified: boolean) => void;
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
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

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
        profilePhoto,
        setProfilePhoto,
        photoPreviewUrl,
        setPhotoPreviewUrl,
        isExistingUser,
        setIsExistingUser,
        isVerified,
        setIsVerified,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};
