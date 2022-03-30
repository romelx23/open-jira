import mongoose from 'mongoose';

/**
 * 0=disconnected
 * 1=connected
 * 2=connecting
 * 3=deisconnectins
 */

const mongooConnection={
    isConnected:0
}

export const connect=async()=>{
    if(mongooConnection.isConnected){
        console.log('ya estamos conectamos')
        return;
    }
    if(mongoose.connections.length>0){
        mongooConnection.isConnected=mongoose.connections[0].readyState;
        if(mongooConnection.isConnected===1){
            console.log('Usando conexion anterior')
            return;
        }
    }
    await mongoose.connect(process.env.MONGO_URL || '')
    mongooConnection.isConnected=1;
    console.log('Conectado a mongoDB',process.env.MONGO_URL)
}

export const disconnect=async()=>{
    if(process.env.NODE_ENV==='development')return;
    if(mongooConnection.isConnected===0)return;
    await mongoose.disconnect();
    console.log('Se desconecto de la BD')
}