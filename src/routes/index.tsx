import {Route, Routes as Switch, Navigate} from 'react-router-dom';

import React from 'react';
import { Home, Login } from '../pages';


// export const PrivateRoutes: React.FC<{children: React.ReactNode}> = ({children}) => {
// 	let isLogin: boolean = false;
// 	return (
// 		<>
// 			{children}
// 		</>
// 	);
// };

export const Routes: React.FC = () => {
	const isPrivete: boolean = false;

	return (
		<Switch>
			<Route path='/login' element={<Login/>}/>
			<Route path='/home' element={isPrivete ? <Home/>:<Navigate to='/login'/>}/>
			<Route path='/*' element={<Navigate to='/login'/>}/>
		</Switch>
	);
};

