import { AppState } from '../AppState'
// import router from '../router'
import { api } from './AxiosService'
import Pop from '../utils/Notifier'

class BugsService {
  async getAllBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
      console.log(res.data)
    } catch (error) {
      Pop.toast(error, 'ERROR LOADING BUGS')
    }
  }

  async getActiveBug(bugId) {
    try {
      const res = await api.get(`api/bugs/${bugId}`)
      AppState.activeBug = res.data
    } catch (error) {
      Pop.toast(error, 'ERROR LOADING BUG')
    }
  }

  async createBug(bug) {
    const res = await api.post('api/bugs', bug)
    AppState.activeBug = res.data
    await this.getAllBugs()
    return res.data.id
  }

  //   async hideClosed() {
  //     if (document.getElementById('filter-box').checked) {
  //       AppState.bugs = AppState.bugs.filter(bug => bug.closed !== true)
  //     } else {
  //       this.getAllBugs()
  //     }
  //   }

  async getNotesByBugId(bugId) {
    try {
      const res = await api.get(`api/bugs/${bugId}/notes`)
      AppState.notes = res.data
    } catch (error) {
      Pop.toast(error, 'Error getting notes')
    }
  }

  //   async editBug(bugId, edit) {
  //     try {
  //       await api.put(`api/bugs/${bugId}`, edit)
  //       await this.getAllBugs()
  //     } catch (error) {
  //       Pop.toast(error, 'ERROR EDITING BUG')
  //     }
  //   }

//   async closeBug(activeBug, bugId) {
//     try {
//       await api.close(`api/bugs/${bugId}`)
//       if (activeBug.closed === false) {
//         AppState.activeBug.closed = true
//       } else {
//         Pop.toast('BUG CLOSED')
//       }
//     } catch (error) {
//       Pop.toast(error, 'ERROR CLOSING BUG')
//     }
//   }
}

export const bugsService = new BugsService()
