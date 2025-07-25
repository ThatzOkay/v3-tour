<template>
  <div v-bind:class="{ 'v-step--sticky': isSticky }" class="v-step" :style="styles" :id="'v-step-' + hash" ref="stepRef">
    <slot name="header">
      <div v-if="step.header" class="v-step__header">
        <div v-if="step.header.title" v-html="step.header.title"></div>
      </div>
    </slot>

    <slot name="content">
      <div class="v-step__content">
        <div v-if="step.content" v-html="step.content"></div>
        <div v-else>This is a demo step! The id of this step is {{ hash }} and it targets {{ step.target }}.</div>
      </div>
    </slot>

    <slot name="actions">
      <div class="v-step__buttons">
        <button @click.prevent="skip" v-if="!isLast && isButtonEnabled('buttonSkip')" class="v-step__button v-step__button-skip">{{ params.labels?.buttonSkip }}</button>
        <button @click.prevent="previousStep" v-if="!isFirst && isButtonEnabled('buttonPrevious')" class="v-step__button v-step__button-previous">{{ params.labels?.buttonPrevious }}</button>
        <button @click.prevent="nextStep" v-if="!isLast && isButtonEnabled('buttonNext')" class="v-step__button v-step__button-next">{{ params.labels?.buttonNext }}</button>
        <button @click.prevent="finish" v-if="isLast && isButtonEnabled('buttonStop')" class="v-step__button v-step__button-stop">{{ params.labels?.buttonStop }}</button>
      </div>
    </slot>

    <div class="v-step__arrow" :class="{ 'v-step__arrow--dark': step.header && step.header.title }" data-popper-arrow></div>
  </div>
</template>

<script setup lang="ts">
import {computed, nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import {DEFAULT_STEP_OPTIONS, HIGHLIGHT} from "../shared/constants";
import jump from 'jump.js'
import {ButtonName} from "../shared/types";
import {Step} from "../shared/types";
import {createPopper} from "@popperjs/core";

const props = defineProps<{
  step: Step,
  previousStep: () => void,
  nextStep: () => void,
  stop: () => void,
  skip?: () => void,
  finish?: () => void,
  isFirst: boolean,
  isLast: boolean,
  labels?: {
    buttonSkip?: string;
    buttonPrevious?: string;
    buttonNext?: string;
    buttonStop?: string;
  },
  enabledButtons?: {
    buttonSkip?: boolean,
    buttonPrevious?: boolean,
    buttonNext?: boolean,
    buttonStop?: boolean
  },
  highlight?: boolean,
  stopOnFail?: boolean,
  debug?: boolean,
  ionic?: boolean,
}>()

let styles = ref();

watch(styles , (newStyles) => {
  if (props.debug) {
    console.log('[Vue Tour] Floating styles for .v-step[id="' + hash.value + '"]:', newStyles);
  }
})

const hash = ref(props.step.target);
const targetElement = ref(typeof props.step.target === "string" ? document.querySelector(props.step.target) as HTMLBRElement | null : props.step.target as HTMLBRElement | null);
const stepRef = ref<HTMLElement | null>(null)

const params = computed(() => {
  return {
    ...DEFAULT_STEP_OPTIONS,
    ...{ highlight: props.highlight }, // Use global tour highlight setting first
    ...{ enabledButtons: Object.assign({}, props.enabledButtons) },
    ...{ labels: props.labels },
    ...props.step.params // Then use local step parameters if defined
  }
})

const isSticky = computed(() => {
  return !props.step.target;
})

const createStep = () => {
  if (props.debug) {
    console.log('[Vue Tour] The target element ' + props.step.target + ' of .v-step[id="' + hash.value + '"] is:', targetElement.value)
    console.log('[Vue Tour] The step element .v-step[id="' + hash.value + '"] is:', stepRef.value)
  }

  if (isSticky.value && stepRef.value) {
    document.body.appendChild(stepRef.value)
  } else {
    if (targetElement.value && stepRef.value) {
      enableScrolling()
      createHighlight()

      createPopper(
        targetElement.value,
        stepRef.value,
        {
          modifiers: params.value.modifiers,
        }
      )

    } else {
      if (props.debug) {
        console.error('[Vue Tour] The target element ' + props.step.target + ' of .v-step[id="' + hash.value + '"] does not exist!')
      }
      emit('targetNotFound', props.step)
      if (props.stopOnFail) {
        stop()
      }
    }
  }
}

const enableScrolling = () => {
  if (params.value.enableScrolling) {
    if (props.step.params && props.step.params.duration || props.step.params && props.step.params.offset) {
      let jumpOptions = {
        duration: props.step.params.duration || 1000,
        offset: props.step.params.offset || 0,
        callback: undefined,
        a11y: false
      }
    if(targetElement.value)
        !props.ionic ? jump(targetElement.value, jumpOptions) : ionicScroll(jumpOptions)
    } else {
      // Use the native scroll by default if no scroll options has been defined
      targetElement.value?.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const isHighlightEnabled = () => {
  if (props.debug) {
    console.log(`[Vue Tour] Highlight is ${params.value.highlight ? 'enabled' : 'disabled'} for .v-step[id="${hash.value}"]`)
  }
  return params.value.highlight
}

const createHighlight = () => {
  if (isHighlightEnabled()) {
    document.body.classList.add(HIGHLIGHT.classes.active)
    const element = targetElement.value as Element | null;
    if (!element || !targetElement.value) {
      console.error('[Vue Tour] Target element not found for highlight.');
      return;
    }
    const transitionValue = window.getComputedStyle(element).getPropertyValue('transition')

    // Make sure our background doesn't flick on transitions
    if (transitionValue !== 'all 0s ease 0s') {
      targetElement.value.style.transition = `${transitionValue}, ${HIGHLIGHT.transition}`
    }

    targetElement.value.classList.add(HIGHLIGHT.classes.targetHighlighted)
    // The element must have a position, if it doesn't have one, add a relative position class
    if (!targetElement.value.style.position) {
      targetElement.value.classList.add(HIGHLIGHT.classes.targetRelative)
    }
  } else {
    document.body.classList.remove(HIGHLIGHT.classes.active)
  }
}

const removeHighlight = () => {
  if (isHighlightEnabled()) {
    const target = targetElement.value
    const currentTransition = targetElement.value?.style.transition
    targetElement.value?.classList.remove(HIGHLIGHT.classes.targetHighlighted)
    targetElement.value?.classList.remove(HIGHLIGHT.classes.targetRelative)
    // Remove our transition when step is finished.
    if (target && currentTransition?.includes(HIGHLIGHT.transition)) {
      setTimeout(() => {
        target.style.transition = currentTransition.replace(`, ${HIGHLIGHT.transition}`, '')
      }, 0)
    }
  }
}

const isButtonEnabled = (name: ButtonName) => {
  return params.value.enabledButtons.hasOwnProperty(name) ? params.value.enabledButtons[name] : true;
}

const getOffset = (jumpOptions: { offset?: number }) => {
  if (!targetElement.value) {
    console.error('[Vue Tour] Target element not found for offset calculation.');
    return 0;
  }
  const elemRect = targetElement.value.getBoundingClientRect();
  let offset = elemRect.top;
  if (jumpOptions.offset) {
    offset += jumpOptions.offset;
  }
  return offset;
}

const getIonContent = () => {
  const pages = document.getElementsByClassName('ion-page');
  if (pages.length) {
    const elByZIndexes: Record<string, HTMLElement> = {};
    for (const el of pages) {
      const styles = window.getComputedStyle(el);
      const zIndex = styles.zIndex;
      elByZIndexes[zIndex] = el.querySelector('ion-content') as HTMLElement;
    }

    const maxZIndex = Math.max(...Object.keys(elByZIndexes).map(value => +value));
    return { el: elByZIndexes[maxZIndex], pages: Object.keys(elByZIndexes).length };
  }

  return null;
}

const ionicScroll = (jumpOptions: { offset?: number, duration?: number }) => {
  const offset = getOffset(jumpOptions);
  const ionContent = getIonContent();
  if (ionContent) {
    (ionContent.el as HTMLElement & { scrollByPoint: (basePoint: number, offset: number, duration: number) => void }).scrollByPoint(0, offset, jumpOptions.duration || 1000);
  } else {
    console.error('[Vue Tour] No Ion Content found for scrolling.');
  }
}

onMounted(() => {
  console.log('[Vue Tour] Creating step for .v-step[id="' + hash.value + '"] targeting ' + props.step.target);
  nextTick(() => {
    createStep()
  })
})

onUnmounted(() => {
  removeHighlight()
})

const skip = () => {
  props.stop()
}

const finish = () => {
  props.stop()
}

defineExpose({skip, finish});

const emit = defineEmits(['targetNotFound']);

</script>

<style lang="scss" scoped>
  .v-step {
    background: #50596c; /* #ffc107, #35495e */
    color: white;
    max-width: 320px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    padding: 1rem;
    pointer-events: auto;
    text-align: center;
    z-index: 10000;

    &--sticky {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      & .v-step__arrow {
        display: none;
      }
    }
  }

  .v-step__arrow,
  .v-step__arrow::before {
    position: absolute;
    width: 10px;
    height: 10px;
    background: inherit;
  }

  .v-step__arrow {
    visibility: hidden;

    &--dark {
      &:before {
        background: #454d5d;
      }
    }
  }

  .v-step__arrow::before {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
    margin-left: -5px;
  }

  .v-step[data-popper-placement^="top"] > .v-step__arrow {
    bottom: -5px;
  }

  .v-step[data-popper-placement^="bottom"] > .v-step__arrow {
    top: -5px;
  }

  .v-step[data-popper-placement^="right"] > .v-step__arrow {
    left: -5px;
  }

  .v-step[data-popper-placement^="left"] > .v-step__arrow {
    right: -5px;
  }

  /* Custom */

  .v-step__header {
    margin: -1rem -1rem 0.5rem;
    padding: 0.5rem;
    background-color: #454d5d;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .v-step__content {
    margin: 0 0 1rem 0;
  }

  .v-step__button {
    background: transparent;
    border: .05rem solid white;
    border-radius: .1rem;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-size: .8rem;
    height: 1.8rem;
    line-height: 1rem;
    outline: none;
    margin: 0 0.2rem;
    padding: .35rem .4rem;
    text-align: center;
    text-decoration: none;
    transition: all .2s ease;
    vertical-align: middle;
    white-space: nowrap;

    &:hover {
      background-color: rgba(white, 0.95);
      color: #50596c;
    }
  }
</style>
