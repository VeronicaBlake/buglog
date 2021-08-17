<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }" title="Navigate to Home Page">
      <div class="">
        <h1>
          BugL<svg xmlns="http://www.w3.org/2000/svg"
                   x="0px"
                   y="0px"
                   class="hoverSpin"
                   width="35"
                   height="35"
                   viewBox="0 0 226 226"
                   style=" fill:#000000;"
          ><g fill="none"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode: normal"
          ><path d="M0,226v-226h226v226z" fill="none"></path><g fill="#ffffff"><path d="M169.5,122.41667h28.25v18.83333h-28.25zM160.08333,84.75h37.66667v18.83333h-37.66667zM160.08333,160.08333h37.66667v18.83333h-47.08333zM28.25,122.41667h28.25v18.83333h-28.25zM28.25,84.75h37.66667v18.83333h-37.66667zM75.33333,178.91667h-47.08333v-18.83333h37.66667zM103.58333,103.58333h18.83333v94.16667h-18.83333z"></path><path d="M113,207.16667c-40.49167,0 -65.91667,-29.19167 -65.91667,-75.33333c0,-20.71667 9.41667,-41.43333 25.425,-57.44167c5.65,-5.65 13.18333,-8.475 20.71667,-8.475h40.49167c7.53333,0 15.06667,2.825 20.71667,8.475c15.06667,15.06667 24.48333,37.66667 24.48333,57.44167c0,46.14167 -25.425,75.33333 -65.91667,75.33333zM93.225,84.75c-2.825,0 -5.65,0.94167 -7.53333,2.825c-12.24167,12.24167 -19.775,29.19167 -19.775,44.25833c0,16.95 4.70833,56.5 47.08333,56.5c42.375,0 47.08333,-39.55 47.08333,-56.5c0,-15.06667 -7.53333,-32.01667 -19.775,-44.25833c-1.88333,-1.88333 -4.70833,-2.825 -7.53333,-2.825z"></path><path d="M132.775,75.33333h-39.55c-5.65,0 -10.35833,1.88333 -14.125,5.65c-14.125,14.125 -22.6,32.01667 -22.6,50.85c0,37.66667 18.83333,65.91667 56.5,65.91667c37.66667,0 56.5,-28.25 56.5,-65.91667c0,-16.95 -8.475,-36.725 -22.6,-50.85c-3.76667,-3.76667 -8.475,-5.65 -14.125,-5.65z" opacity="0.3"></path><path d="M84.75,65.91667c0,-16.00833 12.24167,-28.25 28.25,-28.25c16.00833,0 28.25,12.24167 28.25,28.25c0,16.00833 -12.24167,9.41667 -28.25,9.41667c-16.00833,0 -28.25,6.59167 -28.25,-9.41667z"></path><path d="M113,70.625l-34.84167,-35.78333l13.18333,-13.18333l21.65833,21.65833l21.65833,-21.65833l13.18333,13.18333z"></path></g></g></svg>g
        </h1>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-outline-primary text-uppercase"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown" v-else>
          <div
            class="dropdown-toggle"
            @click="state.dropOpen = !state.dropOpen"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded-circle"
            />
            <span class="mx-3">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            :class="{ show: state.dropOpen }"
            @click="state.dropOpen = false"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Account
              </div>
            </router-link>
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.hoverSpin:hover {
  cursor: default;
    transform: rotate(360deg);
    transition: all 0.3s ease-in-out 0s;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
</style>
