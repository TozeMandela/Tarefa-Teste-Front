/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoginProps } from '../../pages';
import { Api } from './api';
import { ErrorMesage } from './error';

interface IpropsToken {
  _csrf: string
}

async function get_token  (): Promise<IpropsToken[] | ErrorMesage> {
	try{
		const { data } = await Api.get('/');
		return data;
	}catch(err: any) {
		return new ErrorMesage(err.mesage || 'Erro ao pegar o token');
	}
}

async function post_Login  (obj: ILoginProps): Promise<string | ErrorMesage> {
	try{
		const { data } = await Api.post('/login', obj);
		return data;
	}catch(err: any) {
		return new ErrorMesage(err.mesage || 'Erro ao pegar o token');
	}
}






export const apiServices = {
	get_token,
	post_Login,
};