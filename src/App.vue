<template>
  <v-app>

		<notification-container/>

    <v-main>
      <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
		<router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import NotificationContainer from '@/components/NotificationContainer'
export default {
	name: 'App',
	components: {
      NotificationContainer,
    },
	data() {
		return {
		}
	},
}
</script>
