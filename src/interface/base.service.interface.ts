export interface IBaseService<T>{
    // save(u: T): Promise<T>

    create(u: T): Promise<T>

    update(cond: any, body: Object): Promise<T>

    delete(cond: any): Promise<any>

    // total(cond: any):  Promise<number>

    findOne(cond: any): any
    findAll(cond: any): Promise<Array<T>>


    
}