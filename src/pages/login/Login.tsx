import React, {  useEffect, useState } from 'react';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { cyan } from '@mui/material/colors';
import { apiServices } from '../../shared/services';


export type ILoginProps = {
	username: string,
	password: string,
	_csrf: string
}

export const Login = () => {
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [isEmptyUser, setIsEmptyUser] = useState(false);
	const [isEmptyPass, setIsEmptyPass] = useState(false);
	const [_csrf, setCsrf] = useState('');


	useEffect(() => {
		apiServices.get_token().then((response) => {
			if(response instanceof Error){
				console.log(response.message);
			}else {
				setCsrf(response[0]._csrf);
			}
		});
	},[]);

	const handleSubmit = (evt: React.FormEvent) =>{
		evt.preventDefault();
		if(!username) setIsEmptyUser(true);
		if(!password) setIsEmptyPass(true);

		if(!isEmptyPass && !isEmptyUser){
			const userIn: ILoginProps = {
				username,
				password,
				_csrf
			};

			console.log(userIn);

		}

	};

	return (
		<Container maxWidth="sm" sx={{display: 'flex', height: '100vh'}}>
			<Box sx={{width: '60%', margin: 'auto'}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						margin: '10px',
						alignItems: 'flex-start',
						background: `${cyan[50]}`,
						padding: '10px',
						borderRadius: '10px',
						boxShadow: '1px 1px 2px black'
					}}
					component="form"
					onSubmit={handleSubmit}
					noValidate
					autoComplete="off">

					<input type="hidden" name='_csrf' value={_csrf}/>
					<TextField
						sx={{marginBottom: '10px', width: '100%' }}
						required
						error={isEmptyUser}
						label = {!isEmptyUser ? 'Usuario': 'Campo não pode estar vazio'}
						type='text'

						onChange={(e) => {
							setUsername(e.target.value);
							setIsEmptyUser(false);
						}}
					/>

					<TextField
						sx={{marginBottom: '10px', width: '100%' }}
						required
						error={isEmptyPass}
						label =  {!isEmptyPass ? 'Senha': 'Campo não pode estar vazio'}
						type='password'

						onChange={(e) => {
							setPassword(e.target.value);
							setIsEmptyPass(false);}}
					/>

					<Typography
						sx={{fontSize: '11px', marginBottom: '10px'}}>
              se esqueceu a senha, <Link href="/home">clique aqui</Link>
					</Typography>

					<Button type='submit' color='primary' variant='contained'>Entrar</Button>
				</Box>
			</Box>
		</Container>

	);
};
