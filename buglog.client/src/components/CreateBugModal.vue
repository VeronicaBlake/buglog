<template>
  <div class="modal "
       id="new-bug-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            New Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createBug">
          <div class="modal-body">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text"
                     class="form-control"
                     id="title"
                     placeholder="Title..."
                     v-model="state.newBug.title"
                     required
              >
            </div>
            <div class="form-group">
              <label for="description" class="col-form-label">Description</label>
              <input type="text"
                     class="form-control"
                     id="description"
                     placeholder="Description..."
                     minlength="3"
                     v-model="state.newBug.description"
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
import { bugsService } from '../services/BugsService'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

export default {
  name: 'CreateBugModal',
  setup() {
    const router = useRouter()
    const state = reactive({
      newBug: {},
      thisBug: computed(() => AppState.activeBug)
    })

    return {
      state,
      async createBug() {
        try {
          const id = await bugsService.createBug(state.newBug)
          logger.log(id)
          $('#new-bug-form').modal('toggle')
          router.push({ name: 'BugDetailsPage', params: { id: id } })
          state.newBug = {}
          Pop.toast('Created Bug Successfully', 'success')
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
