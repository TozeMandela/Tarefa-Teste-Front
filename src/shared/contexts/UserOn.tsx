import React, { createContext, useContext, useState } from 'react';

interface IbodyUser {
  token: string;
  userId: number;
  setToken: (v: string) => void;
  setUserId: (v: number) => void
}

const  UserContext = createContext({} as IbodyUser);

export const useUserContext = () => {
	return useContext(UserContext);
};

interface IpropsChildren {
  children: React.ReactNode
}

export const UserContextProvider: React.FC<IpropsChildren> = ({children}) => {
	const [token, setToken] = useState('');
	const [userId, setUserId] = useState(0);


	return (
		<UserContext.Provider value={{token, userId, setUserId,setToken}}>
			{children}
		</UserContext.Provider>
	);
};