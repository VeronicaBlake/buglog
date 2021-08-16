import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NotesService {
  async create(body) {
    const note = await dbContext.Notes.create(body)
    return await this.getOne(note._id, body.creatorId)
  }

  async delete(id, creatorId) {
    const data = await dbContext.Notes.findOneAndDelete({ _id: id, creatorId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }

  async getOne(id, userId) {
    // const note = await dbContext.Notes.findOne({ _id: id, creatorId: userId })
    const note = await dbContext.Notes.findById(id).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('Invalid Id - Not a note')
    }
    if (note.creator.id.toString() !== userId) {
      throw new Forbidden('This is not your note')
    }
    return note
  }
}
export const notesService = new NotesService()
