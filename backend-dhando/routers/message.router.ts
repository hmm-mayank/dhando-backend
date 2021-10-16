import { Router } from 'express'

import {MessageGlobalModel, MessageModel} from "../models/message.model";
import {MessageService} from "../services/message.service";

export const messageRouter = Router();

const messageService = new MessageService();
messageRouter.post('/sendOtp',(req,res)=>{
    const payLoad = req.body as MessageModel;
    const message = messageService.register(payLoad);
    return message.then(b => {
        return res.status( 200).json(b)
    })
})

messageRouter.post('/getOtp',(req,res)=>{
    const payLoad = req.body as MessageGlobalModel;
    const message = messageService.getMessageByUserId(payLoad);
    return message.then(b => {
        return res.status( 200).json(b)
    })
})