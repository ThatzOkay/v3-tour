import type { App } from "vue";
import type { Plugin } from "vue";
import VTour from './components/VTour.vue'
import VStep from './components/VStep.vue'

export * from './shared/types'
export * from './shared/constants'
export * from './composables/useTour'
export * from './components'

const VueTour: Plugin = {
  install (app: App, options: object) {
    if (!options) {
      options = {}
    }

    app.component("v-tour", VTour)
    app.component("v-step", VStep)

    app.config.globalProperties.$tours = {}
  }
}

export { VueTour }
