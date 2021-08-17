<template>
  <div class="bugs-component">
    <div class="row my-2 ">
      <div class="col-12 border">
        <h1>
          {{ bug.title }}
        </h1>
        <span>
          <img class="rounded-circle creator-pic my-1" :src="bug.creator.picture" alt="Bug Creator Profile Picture">
          {{ bug.creator.name }}
        </span>
        <span class="mx-5 bg-dark">Last edited: {{ new Date (bug.updatedAt).toLocaleString(time) }}</span>
        <span class="mx-5 bg-dark"> Status:
          <span v-if="bug.closed" class="text-light">
            <i class="fas fa-bug fa-1x text-light"></i> Closed</span>
          <span v-else class="text-success">
            <i class="fas fa-bug fa-1x  text-success"></i> Open
          </span>
        </span>
        <router-link :to="{ name: 'BugDetailsPage', params:{id:bug.id} }" title="View Bug Details">
          <button class="btn btn-primary btn-sm text-dark">
            View Details
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
// import Pop from '../utils/Notifier'
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'BugComponent',
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      route,
      time: {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
      // async closeBug(id) {
      //   if (await Notification.confirmAction()) {
      //     try {
      //       await bugsService.closeBug(id)
      //       Notification.toast('Closed! ', 'error')
      //     } catch (error) {
      //       Notification.toast('Input canceled!', 'warning')
      //     }
      //   } else {
      //     Notification.toast('No worries!', 'success')
      //   }
      // }
    }
  },
  components: {}
}
</script>

<style scoped>
.creator-pic{
  max-height: 2rem;
  max-width: 2rem;
}
</style>
