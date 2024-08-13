// app/context/UserContext.tsx
"use client";

import React, { createContext, useState, ReactNode, useContext } from 'react';

interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
 
}

interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const defaultUserData: UserData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};
