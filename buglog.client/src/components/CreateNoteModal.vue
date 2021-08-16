<template>
  <div class="modal "
       id="new-note-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            New Note
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createNote">
          <div class="modal-body">
            <!-- <div class="form-group">
              <label for="title">Title</label>
              <input type="text"
                     class="form-control"
                     id="title"
                     placeholder="Title..."
                     v-model="state.newNote.title"
                     required
              >
            </div> -->
            <div class="form-group">
              <label for="body" class="col-form-label">Description</label>
              <input type="text"
                     class="form-control"
                     id="body"
                     placeholder="Description..."
                     minlength="3"
                     v-model="state.newNote.body"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-link text-dark" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pop from '../utils/Notifier'
import { notesService } from '../services/NotesService'
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

export default {
  name: 'CreateNoteModal',
  setup() {
    // const router = useRouter()
    const route = useRoute()
    const state = reactive({
      newNote: {},
      thisNote: computed(() => AppState.activeNote)
    })

    return {
      state,
      async createNote() {
        try {
          state.newNote.bugId = route.params.id
          const id = await notesService.createNote(state.newNote)
          logger.log(id)
          $('#new-note-form').modal('toggle')
          state.newNote = {}
          Pop.toast('Created Note Successfully', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
