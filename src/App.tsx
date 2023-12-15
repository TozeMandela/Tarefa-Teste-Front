import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import { UserContextProvider } from './shared/contexts/UserOn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<UserContextProvider>
			<BrowserRouter>
				<Routes/>
				<ToastContainer/>
			</BrowserRouter>
		</UserContextProvider>
	);
}

export default App;
