import { AppState } from '../AppState'
// import router from '../router'
import { api } from './AxiosService'
import Pop from '../utils/Notifier'
import { bugsService } from './BugsService'

class NotesService {
  async getAllNotes() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      Pop.toast(error, 'ERROR LOADING BUGS')
    }
  }

  async createNote(note) {
    const res = await api.post('api/notes', note)
    AppState.activeNote = res.data
    await this.getAllNotes()
    return res.data.id
  }

  async deleteNote(id, bugId) {
    await api.delete('api/notes/' + { id })
    bugsService.getNotesByBugId(bugId)
  }
}

export const notesService = new NotesService()
