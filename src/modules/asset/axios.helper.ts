import axios from 'axios';
import { BINANCE_ENDPOINT } from './endpoint';

class HttpConfig {
	public static BASE_URL = BINANCE_ENDPOINT
	public static DEFAULT_CONFIG = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
}

const axiosClient = axios.create({
	baseURL: HttpConfig.BASE_URL,
	...HttpConfig.DEFAULT_CONFIG
});


axiosClient.interceptors.request.use(function (request) {

	return request;
});

export default axiosClient;