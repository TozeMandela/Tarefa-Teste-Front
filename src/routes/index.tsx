import React from 'react';
import {Route, Routes as Switch, Navigate} from 'react-router-dom';

import { Home, Login, RegistrarSe } from '../pages';
import { useUserContext } from '../shared/contexts/UserOn';

export const Routes: React.FC = () => {
	let isPrivete: boolean = false;
	const { userId } = useUserContext();

	if(userId !== 0) isPrivete = true;

	return (
		<Switch>
			<Route path='/login' element={<Login/>}/>
			<Route path='/registrar-se' element={<RegistrarSe/>}/>
			<Route path='/home' element={isPrivete ? <Home/>:<Navigate to='/login'/>}/>
			<Route path='/*' element={<Navigate to='/login'/>}/>
		</Switch>
	);
};

