import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { cyan } from '@mui/material/colors';
import { IpropsToken, apiServices } from '../../shared/services';
import { useUserContext } from '../../shared/contexts/UserOn';
import { toast } from 'react-toastify';


export type ILoginProps = {
	username: string,
	password: string,
	_csrf: string
}

export const Login = () => {
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [isEmptyUser, setIsEmptyUser] = useState(true);
	const [isEmptyPass, setIsEmptyPass] = useState(true);
	const [_csrf, setCsrf] = useState('');
	const {setToken,  setUserId}  = useUserContext();
	const navigate = useNavigate();


	useEffect(() => {
		setIsEmptyUser(false);
		setIsEmptyPass(false);
		apiServices.get_token('/').then((response) => {
			if(response instanceof Error){
				console.log(response.message);
				toast(response.message);
			}else {
				const {_csrf} = response[0];
				setCsrf(_csrf ?? '');
			}
		});
	},[]);

	const handleSubmit = (evt: React.FormEvent) =>{
		evt.preventDefault();
		if(!username) setIsEmptyUser(true);
		if(!password) setIsEmptyPass(true);

		if(isEmptyPass == true && isEmptyUser == true) return;

		const userIn: ILoginProps = {
			username,
			password,
			_csrf
		};

		async function loged (){
			try {
				const response = await apiServices.post_Login(userIn);
				const {token, id} = await (response as IpropsToken[])[0];
				await setToken(token);
				await setUserId(id ?? 0);
				navigate('/home');

			} catch (error) {
				if(error) toast(`${error}`);
			}
		}
		loged();
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
