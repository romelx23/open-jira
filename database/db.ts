import mongoose from 'mongoose';

/**
 * 0=disconnected
 * 1=connected
 * 2=connecting
 * 3=deisconnectins
 */

const mongoConnection={
    isConnected:0
}

export const connect=async()=>{
    if(mongoConnection.isConnected){
        console.log('ya estamos conectamos')
        return;
    }
    if(mongoose.connections.length>0){
        mongoConnection.isConnected=mongoose.connections[0].readyState;
        if(mongoConnection.isConnected===1){
            console.log('Usando conexion anterior')
            return;
        }
    }
    await mongoose.connect(process.env.MONGO_URL || '')
    mongoConnection.isConnected=1;
    console.log('Conectado a mongoDB',process.env.MONGO_URL)
}

export const disconnect=async()=>{
    if(process.env.NODE_ENV==='development')return;
    if(mongoConnection.isConnected===0)return;
    await mongoose.disconnect();
    mongoConnection.isConnected=0;
    console.log('Se desconecto de la BD')
}