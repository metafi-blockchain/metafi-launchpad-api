import { Injectable } from '@nestjs/common';
import axios from 'axios';
import axiosClient from './axios.helper';
import { BINANCE_ENDPOINT } from './endpoint';



@Injectable()
export class AssetService {


    async getSuiTokenPrice(symbol: string){
        try {

            const url = `/ticker/24hr?symbol=${symbol}`
            const response = await  axiosClient.get(url)
            
                
            if(response.status == 200 ){
                const item = response.data
                return{
                    symbol:   item.symbol,
                    lastPrice:   item.lastPrice,
                    priceChangePercent:   item.priceChangePercent
                } 
            }
           
        } catch (error) {
            console.log(error);
        }
        return null;
    }
}
