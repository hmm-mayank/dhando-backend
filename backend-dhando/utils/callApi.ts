import Axios from "axios";


export const AWSURI = 'https://s3uploader-s3uploadbucket-1981a0n411729.s3.ap-south-1.amazonaws.com/';
export const billInvoice = (userName:string,awsInvoice:string) =>  `Hi ${userName} Thank you for shopping with Us, Please download your invocie from ${AWSURI+awsInvoice}.`
export  class CallApi {
    async sendMessage({message,phone}){
      let data   =  await  Axios({
            baseURL:'http://my.usacricket.org:7200',
            params : {
                phone,
                code:'91',
                message
            },
            method:'get'
        }).catch(err=>{
            return {'message':"OTP NOT SENT"}
      })
        return data
    }
}