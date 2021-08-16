import mongoose from 'mongoose'
const Schema = mongoose.Schema
// const ObjectId = Schema.Types.ObjectId

export const Note = new Schema(
  {
    body: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    bugId: { type: String, ref: 'Bug', required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

Note.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
// Note.virtual('bug', {
//   localField: 'bug',
//   ref: 'Bug',
//   foreignField: 'id',
//   justOne: true
// })
