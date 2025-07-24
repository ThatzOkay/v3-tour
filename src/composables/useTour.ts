import { getCurrentInstance } from 'vue'
import {VTourExpose} from "../shared/types";

export function useTour(tourName: string) {
  const instance = getCurrentInstance()
  const $tours = instance?.appContext.config.globalProperties.$tours as Record<string, VTourExpose>;

  // onMounted(() => {
  //
  //   if ($tours?.[tourName]) {
  //     const tour = $tours[tourName];
  //     tour.start()
  //   }
  // })

  return {
    ...$tours[tourName]
  }
}
