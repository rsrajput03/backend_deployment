const mongoose = require("mongoose")

//schema
const noteSchema = mongoose.Schema({
    title:String,
    note:String,
    userId:String
},{
    versionKey:false
})

//model
const NoteModel = mongoose.model("note",noteSchema);

module.exports = {NoteModel}