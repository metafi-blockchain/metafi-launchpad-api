import { Controller, Get, Query } from '@nestjs/common';
import { AssetService } from './asset.service';



@Controller('asset')
export class AssetController {
    constructor(private service : AssetService ){} ;
    @Get('/price/sui')
    getPriceSUI( @Query("symbol") symbol: string = 'SUIUSDT'){
        return this.service.getSuiTokenPrice(symbol);
    }
}
