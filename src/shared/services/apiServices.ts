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

export interface IpropsUserLog {
  id?: string | number,
	username?: string,
  password?: string,
	passwordConfirm?: string,
	userId: string,
	_csrf: string
}
export interface IbodyProps {
  id?: string,
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


async function get_token  (root: string, opt = {}): Promise<Omit<IpropsToken[], 'token'> | Omit<IbodyProps[], '_csrf'>| ErrorMesage> {
	try{
		const { data } = await Api.get(root, opt);
		return data;
	}catch(err: any) {
		if(err.response.data.info) toast(err.response.data.info );
		if(err.response.data.Errors) toast(err.response.data.Errors[0].message);
		return new ErrorMesage(err.mesage ||err.response.data.info || 'Erro ao pegar o token');
	}
}

async function post_Login_register  (path: string, obj: ILoginProps | IbodyProps | IpropsUserLog): Promise<Omit<IpropsToken[], '_csrf'>| Omit<IbodyProps[], '_csrf'> | IbodyProps| ErrorMesage> {
	try{
		const { data } = await Api.post(path, obj);
		return data;
	}catch(err: any) {
		console.log(err);
		if(err.response.data.info) toast(err.response.data.info );
		if(err.response.data.Errors) toast(err.response.data.Errors[0].message);
		return new ErrorMesage(err.mesage ||err.response.data.info || err.response.data.Errors[0].message || JSON.stringify(err.response.data.Errors)||'Erro ao postar');
	}
}

async function put_Update  (path: string, obj: ILoginProps | IbodyProps): Promise<Omit<IpropsToken[], '_csrf'>| Omit<IbodyProps[], '_csrf'> | IbodyProps| ErrorMesage> {
	try{
		const { data } = await Api.put(path, obj);
		return data;
	}catch(err: any) {
		console.log(err);
		if(err.response.data.info) toast(err.response.data.info );
		if(err.response.data.Errors) toast(err.response.data.Errors[0].message);
		return new ErrorMesage(err.mesage ||err.response.data.info || err.response.data.Errors[0].message || JSON.stringify(err.response.data.Errors)||'Erro ao postar');
	}
}


export const apiServices = {
	get_token,
	post_Login_register,
	put_Update
};