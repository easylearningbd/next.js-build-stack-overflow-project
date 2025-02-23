import { Schema, models, model,Document, Types } from "mongoose";

export interface IInteraction {
    user: Types.ObjectId;
    action: string;
    actionId: Types.ObjectId;
    actionType: string; 
}

export interface IInteractionDoc extends IInteraction, Document {}
const InteractionSchema = new Schema<IInteraction>(
    {
        user: { type: Schema.Types.ObjectId, ref:"User", required: true}, 
        action: { type: String, required: true}, // 'upvote', 'downvote' 'view' ,'ask_question'
        actionId: { type: Schema.Types.ObjectId,required: true},
        actionType: { type: String, enum: ["question","answer"], required: true},
        
    },
    {
     timestamps: true
    },
);

const Interaction = models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;
