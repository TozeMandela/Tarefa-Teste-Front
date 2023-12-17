import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Drawer, Button, Divider, Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';
import { InputField } from '../../shared/components';
import { IbodyProps, IpropsUserLog, apiServices } from '../../shared/services';
import { toast } from 'react-toastify';

interface Empty {
  name?: string;
  gender?: string
  email?: string
  phoneNumber?: string
  location?: string
  nationality?: string
  numberIdentity?: string
  username?: string,
  password?: string,
	passwordConfirm?: string,
	userId?: string,
  status: true;
}

export const RegistrarSe = () => {
	const [body, setBody] = useState<IbodyProps>({} as IbodyProps);
	const [login, setLogin] = useState<IpropsUserLog>({} as IpropsUserLog);
	const [emptys, setEmptys] = useState<Empty>({status: true} as Empty);
	const validField = ['name', 'gender', 'email', 'phoneNumber', 'location', 'nationality', 'numberIdentity'];
	const validFieldLogin = ['username', 'password', 'passwordConfirm', 'userId', '_csrf'];

	useEffect(() => {
		apiServices.get_token('/').then((response) => {
			if(response instanceof Error){
				toast(response.message);
			}else {
				const {_csrf} = response[0];
				setLogin((oldBody) =>({
					...oldBody,
					['_csrf']:_csrf
				}));
			}
		});

		const data = window.location.pathname.replace('/cadastrar-se/', '');

		apiServices.get_token(`/users/pesquisar/o/?phoneNumber=${data}`).then((response) => {
			if(response instanceof Error){
				toast(response.message);
			}else {
				const data = (response as unknown);
				setBody((data as IbodyProps));
				const {id} = (data! as IpropsUserLog);
				setLogin({userId: `${id}`,  _csrf: ''  });
			}
		});
	},[]);

	const handleSubmit = (evt: React.FormEvent) =>{
		evt.preventDefault();
		let sendTo = true;
		setEmptys({status: true});

		for (let index = 0; index < validFieldLogin.length; index++) {
			if(Object.keys(login).indexOf(validFieldLogin[index]) === -1) {
				sendTo = false;
				setEmptys(oldBody =>({ ...oldBody,
					[validFieldLogin[index]]: validFieldLogin[index]
				}));
			}
		}

		if(!sendTo) return;

		apiServices.post_Login_register('/login/register', login).then((response)=>{
			if(response instanceof Error){
				toast(response.message);
			}else {
				console.log('dados salvos com sucesso');

			}
		});
	};

	const handleUpdate = () => {
		let sendTo = true;
		setEmptys({status: true});

		for (let index = 0; index < validField.length; index++) {
			if(Object.keys(body).indexOf(validField[index]) === -1) {
				sendTo = false;
				setEmptys(oldBody =>({ ...oldBody,
					[validField[index]]: validField[index]
				}));
			}
		}

		if(!sendTo) return;

		apiServices.put_Update(`/users/actualizacao/${body.id}`, body).then((response) => {
			if(response instanceof Error){
				console.log(response.message);
				toast(response.message);
			}else {
				console.log('usuario Acutalizado com sucesso');
			}
		});
	};

	return (
		<Box height='100vh'>

			<Drawer open={false} variant='permanent' sx={{
				width: '100px',
				flexShrink: 0,
				['& .MuiDrawer-paper']: { width: '250px', background: '#7B1FA2',boxSizing: 'border-box', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
			}}>

				<Box sx={{boxSizing: 'border-box', margin: 'none', padding: 'none', lineHeight: '1.5px'}}>
					<Typography component='span' sx={{fontSize: '8em', lineHeight: '1.5px'}}>T</Typography>
					<Typography sx={{fontSize: '4em', lineHeight: '1.5px'}}component='span'>T</Typography>
				</Box>

				<Typography sx={{fontSize: '2em', lineHeight: '1'}}component='span'>_arefa</Typography>
			</Drawer>

			<Box bgcolor='#7B1FA2' sx={{ height: '60px', marginLeft: '250px'}}>
				<Container sx={{width: '100%', height: '100%',display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<Typography fontWeight='bold' color='white'>Nota: verifique se estão corretos os dados que inseriu anteriorment!</Typography>

					<TextField label='search'>

					</TextField>
				</Container>
			</Box>

			<Box sx={{height: '90vh',display: 'flex', alignItems: 'center', marginLeft: '250px'}}>
				<Container sx={{width: '100%'}}>
					<Typography component='h1' fontSize='2em' fontWeight='bold' color='#7B1FA2'>
          Registrar-se
					</Typography>

					<Box>
						<Box component='form' onSubmit={handleSubmit}>
							<Box>
								<InputField Label='Nome Completo' Type='text' name='fullname' error={emptys.name ? emptys.status:false} value={body.name || ''} setBody={(evt)=>setBody((oldBody)=>({...oldBody, ['name']: evt.target.value}))} sx={{width: '45%', marginRight: '5px'}} />

								<InputField Label='E-mail' Type='email' name='email' error={emptys.email ? emptys.status:false}  value={body.email || ''} setBody={(evt) =>setBody((oldBody) =>({
									...oldBody,
									['email']: evt.target.value
								}))}  sx={{width: '45%'}} />
							</Box>

							<Box>
								<InputField Label='Nº de Telefone' Type='number' name='phoneNumber' error={emptys.phoneNumber? emptys.status: false}  value={body.phoneNumber || ''} setBody={(evt) => setBody((oldBody) =>({
									...oldBody,
									['phoneNumber']: evt.target.value
								}))} sx={{width: '45%', marginRight: '5px'}} />

								<InputField Label='Nº de Telefone Alternativo' Type='number' name='phoneNumberAlternative' error={false}  value={body.phoneNumberAlternative||''} setBody={(evt) =>setBody((oldBody) =>({
									...oldBody,
									['phoneNumberAlternative']: evt.target.value
								}))} sx={{width: '45%'}} />
							</Box>

							<Box>
								<InputField Label='Morada' Type='text' name='location' error={emptys.location? emptys.status: false}  value={body.location||''} setBody={(evt) =>setBody((oldBody) =>({
									...oldBody,
									['location']: evt.target.value
								}))} sx={{width: '45%', marginRight: '5px'}} />

								<InputField Label='Nacionalidade' Type='text' name='nationality' error={emptys.nationality? emptys.status: false}  value={body.nationality||''} setBody={(evt) => setBody((oldBody) =>({
									...oldBody,
									['nationality']: evt.target.value
								}))} sx={{width: '45%'}} />
							</Box>

							<Box>
								<InputField Label='Nº B.I' Type='text' name='numberIdentity' error={emptys.numberIdentity? emptys.status: false}  value={body.numberIdentity||''} setBody={(evt) =>setBody((oldBody) =>({
									...oldBody,
									['numberIdentity']: evt.target.value
								}))} sx={{width: '45%', marginRight: '5px'}} />

								<FormControl  sx={{ marginTop: '8px', minWidth: '45%' }}>
									<InputLabel error={emptys.gender? emptys.status: false} color='secondary' id="demo-select-small-label">Selecione o sexo</InputLabel>
									<Select
										labelId="demo-select-small-label"
										id="demo-select-small"
										label='Selecione o sexo'
										value={body.gender|| ''}
										color='secondary'
										onChange={(evt) => setBody((oldBody) =>({
											...oldBody,
											['gender']: evt.target.value
										}))}
									>
										<MenuItem value='M'>Homem</MenuItem>
										<MenuItem value='F'>Mulher</MenuItem>
									</Select>
								</FormControl>
							</Box>

							<Box>
								<InputField Label='Senha' Type='password' name='password' error={emptys.password? emptys.status: false}  value={login.password||''} setBody={(evt) =>setLogin((oldLogin) =>({
									...oldLogin,
									['password']: evt.target.value
								}))} sx={{width: '45%', marginRight: '5px'}} />

								<InputField Label='Senha de confirmação' Type='password' name='passwordConfirm' error={emptys.passwordConfirm? emptys.status: false}  value={login.passwordConfirm||''} setBody={(evt) =>setLogin((oldLogin) =>({
									...oldLogin,
									['passwordConfirm']: evt.target.value
								}))} sx={{width: '45%', marginRight: '5px'}} />
							</Box>
							<Box>
								<InputField Label='Username' Type='text' name='username' error={emptys.username? emptys.status: false}  value={login.username||''} setBody={(evt) =>setLogin((oldLogin) =>({
									...oldLogin,
									['username']: evt.target.value
								}))} sx={{width: '45%', marginRight: '5px'}} />

								<InputField disabled={true} Label='Codigo' Type='text' name='userId' error={emptys.userId? emptys.status: false}  value={login.userId||''} sx={{width: '45%', marginRight: '5px'}} />
							</Box>
							<Divider/>
							<Button key='1' sx={{marginTop: '10px', marginRight: '10px'}}  type='submit' variant='contained' color='secondary' >cadastrar</Button>

							<Button key='2' sx={{marginTop: '10px'}} onClick={handleUpdate} variant='contained' color='success'>update</Button>
						</Box>
					</Box>
				</Container>
			</Box>
		</Box>
	);
};
