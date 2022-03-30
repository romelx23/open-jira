import mongoose from 'mongoose';
import moongose, { Model,Schema } from 'mongoose';
import { Entry } from '../interfaces/entry';

export interface IEntry extends Entry{
}

const entrySchema = new Schema({
    description:{type:String,required:true},
    createAt:{type:Number},
    status:{
        type:String,
        enum:{
            values:['pending','in-progress','finished'],
            message:'{VALUE} no es un estado permitido'
        }
    }
});

const EntryModel:Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry',entrySchema);

// EntryModel.create({
//     description:'Hola mundo',
//     createAt:new Date().getTime(),
//     status:'pending'
// });

export default EntryModel;
