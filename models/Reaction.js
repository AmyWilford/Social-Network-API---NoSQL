const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId, 
            default: ()=> new Types.ObjectId(),
        },
        reactionBody: {
            type: String, 
            required: true, 
            max_length: 280,
        }, 
        username: {
            type: String, 
            required: true, 
        }, 
        createdAt: {
            type: Date, 
            default: Date.now, 
            // use getter method to format the timestamp on query?
        }
    }, 
    {
        toJSON: {
            getters: true,
        }, 
        id: false,
    }
)
reactionSchema.get(function(createdAt){
    return `${this.createdAt.getMonth()+1}/ ${this.createdAt.getDate()}/ ${this.createdAt.getFullYear()}`
})

module.exports = reactionSchema;
