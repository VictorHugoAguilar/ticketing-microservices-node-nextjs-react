import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// An interface that describes the properties that
// are required to create new Ticket
interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

// An interface that describe tha propeties
// that a Ticket Document has
interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
    version: number;
}

// An interface that describe the properties that 
// a Ticket Model has
interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
    , userId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin)

ticketSchema.statics.build = (atrrs: TicketAttrs) => {
    return new Ticket(atrrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('User', ticketSchema);

export { Ticket };