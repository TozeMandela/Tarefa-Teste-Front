/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import { ILoginProps } from '../../pages';
import { Api } from './api';
import { ErrorMesage } from './error';

export interface IpropsToken {
  _csrf: string;
  token: string;
  data: Array<Record<string, any>>;
  id?: number;
  [key: number]: string;
}

async function get_token  (root: string, opt = {}): Promise<Omit<IpropsToken[], 'token'> | ErrorMesage> {
	try{
		const { data } = await Api.get(root, opt);
		return data;
	}catch(err: any) {
		if(err.response.data.info) toast(err.response.data.info );
		return new ErrorMesage(err.mesage ||err.response.data.info || 'Erro ao pegar o token');
	}
}

async function post_Login  (obj: ILoginProps): Promise<Omit<IpropsToken[], '_csrf'> | ErrorMesage> {
	try{
		const { data } = await Api.post('/login', obj);
		return data;
	}catch(err: any) {
		if(err.response.data.info) toast(err.response.data.info );
		return new ErrorMesage(err.mesage ||err.response.data.info ||'Erro ao pegar o token');
	}
}






export const apiServices = {
	get_token,
	post_Login,
};