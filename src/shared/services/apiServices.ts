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

export interface IbodyProps {
  name: string,
	gender: string,
	email: string,
	phoneNumber: string,
	phoneNumberAlternative: string,
	location: string,
	nationality: string,
	numberIdentity: string,
  _csrf: string
  [key: number|string]: string | number |undefined,
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

async function post_Login_register  (path: string, obj: ILoginProps | IbodyProps): Promise<Omit<IpropsToken[], '_csrf'>| Omit<IbodyProps[], '_csrf'> | ErrorMesage> {
	try{
		const { data } = await Api.post(path, obj);
		return data;
	}catch(err: any) {
		if(err.response.data.info) toast(err.response.data.info );
		if(err.response.data.error) toast(err.response.data.error.errors[0].message);
		return new ErrorMesage(err.mesage ||err.response.data.info || err.response.data.error.errors[0].message ||'Erro ao postar');
	}
}






export const apiServices = {
	get_token,
	post_Login_register,
};