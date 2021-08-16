import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    return await dbContext.Bugs.find(query).populate('creator', 'name picture')
  }

  async findOne(id) {
    const data = await dbContext.Bugs.findOne({ _id: id }).populate('creator', 'name picture')
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async getNotesByBugId(id) {
    const notes = await dbContext.Notes.find({ bug: id }).populate('creator', 'name picture')
    return notes
  }

  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  async edit(body) {
    const editedBug = await dbContext.Bugs.findOne({ _id: body.id })
    if (editedBug.closed === true) {
      throw new BadRequest('Bug is Closed')
    }
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async close(id, creatorId) {
    const closedBug = await dbContext.Bugs.findOne({ _id: id })
    if (closedBug.closed === true) {
      throw new BadRequest('Bug is Already Closed')
    }
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorId }, { closed: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Closed Bug'
  }
}

export const bugsService = new BugsService()
