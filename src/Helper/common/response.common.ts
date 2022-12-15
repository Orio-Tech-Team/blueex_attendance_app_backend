export class Response{

    static async get(status : number , message : string , data : any){
        return {
            status : status,
            message : [message],
            data : data
        }
    }

}