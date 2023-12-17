import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Drawer, Button, Divider, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { InputField } from '../../shared/components';
import { IbodyProps, apiServices } from '../../shared/services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Empty {
  name?: string;
  gender?: string
  email?: string
  phoneNumber?: string
  location?: string
  nationality?: string
  numberIdentity?: string
  status: true;
}

export const CadastrarSe = () => {
	const [body, setBody] = useState<IbodyProps>({} as IbodyProps);
	const [emptys, setEmptys] = useState<Empty>({status: true} as Empty);
	const validField = ['name', 'gender', 'email', 'phoneNumber', 'location', 'nationality', 'numberIdentity'];
	const navegate = useNavigate();

	useEffect(() => {
		apiServices.get_token('/').then((response) => {
			if(response instanceof Error){
				toast(response.message);
			}else {
				const {_csrf} = response[0];
				setBody((oldBody) =>({
					...oldBody,
					['_csrf']:_csrf
				}));
			}
		});
	},[emptys]);

	const handleSubmit = (evt: React.FormEvent) => {
		evt.preventDefault();
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

		apiServices.post_Login_register('/users/cadastrar', body).then((response) => {
			if(response instanceof Error){
				console.log(response.message);
				toast(response.message);
			}else {
				toast('cadastrado');
				navegate(`/cadastrar-se/${body.phoneNumber}`);
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
			<Box sx={{height: '90vh',display: 'flex', alignItems: 'center'}}>
				<Container sx={{width: '900px'}}>
					<Typography component='h1' fontSize='2em' fontWeight='bold' color='#7B1FA2'>
          Cadastrar-se
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
										<MenuItem value='H'>Homem</MenuItem>
										<MenuItem value='M'>Mulher</MenuItem>
									</Select>
								</FormControl>
							</Box>

							<Divider/>

							<Button sx={{marginTop: '10px'}}  type='submit' variant='contained' color='secondary' >cadastrar</Button>
						</Box>
					</Box>
				</Container>
			</Box>
		</Box>
	);
};
