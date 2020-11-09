import admin from 'firebase-admin';
import {configs} from './configs';

const serviceAccount: any = configs.core

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: configs.databaseURL
})

export function verifyUserTokens(registrationToken: string){
      return admin.messaging().send({
        token: registrationToken
      }, true)
}

export function sendToSpecificDevice( data: object, registrationToken: string){
    
    var message = {
        data: {
            ...data
        },
        token: registrationToken
      };
    return admin.messaging().send(message)

}

export function sendToMultipleDevices( data: object, registrationTokens: Array<string> ){

    var message = {
        data: {
            ...data
        },
        tokens: registrationTokens
      };

    return admin.messaging().sendMulticast(message)

}

export async function sendToTopic( data: object, topic: string){

    var message = {
        data: {
            ...data
        },
        topic: topic
      };

    return await admin.messaging().send(message)

}