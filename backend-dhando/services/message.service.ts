import {Message, MessageGlobalModel, MessageModel} from "../models/message.model";
import * as Bluebird from 'Bluebird'
import {CallApi} from "../utils/callApi";

const callApi = new CallApi();

export class MessageService {
    static get messageAttributes (){
        return ['otp','id','userId','phone']
    }
    private static _message
    static get product() {
        return MessageService._message
    }

    async  register({userId,otp,id,phone}:MessageModel){
        let randomNum = Math.floor(1000 + Math.random() * 9000);
        let message = `Dhando one time OTP is ${randomNum}`
        let messageItem = await Message.build({
            id,
            otp:randomNum,
            userId,
            phone
        })
        try {
            await  messageItem.validate();
           let getRes:any =await callApi.sendMessage({message, phone})
           if (getRes?.data.status){
               return messageItem.save().then(u => u);
           }
           else {
               return {message:"Message Service is Down"}
           }

        }
        catch (e) {
            console.log(e)
        }
    }

    getMessageById(id: number) {
        return Message.findByPk(id, {
            attributes: MessageService.messageAttributes
        }) as Bluebird<MessageGlobalModel>
    }
    getMessageByUserId({phone}:MessageGlobalModel) {
        // @ts-ignore
        return Message.findOne({where:{'phone' : phone}, order: [ [ 'createdAt', 'DESC' ]],}).catch(e=> e) as Bluebird<MessageGlobalModel>
    }
}