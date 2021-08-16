<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row justify-content-center" v-if="user.isAuthenticated">
      <div>
        <div class="col-md-12">
          <h1>Welcome To Bug Log</h1>
        </div>
        <div class="col-md-12">
          <router-link :to="{name: 'Bug'}">
            <button type="button" class="btn btn-lg btn-dark mx-auto text-light mt-md-2 mt-3 mb-md-2" title="View Bugs">
              VIEW BUGS
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-else>
      <div class="col-md-4 bg-primary text-center my-5">
        <h1>Log in to view Bugs</h1>
        <h1>
          <i class="fas fa-bug fa-3x text-dark text-center m-md-4 my-4 m-0"></i>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'

export default {
  name: 'Home',
  setup() {
    return {
      user: computed(() => AppState.user)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
