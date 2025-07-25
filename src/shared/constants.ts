import {Callbacks, Options, Step} from "../shared/types";
import {Placement} from "@popperjs/core/lib/enums";

export const DEFAULT_CALLBACKS: Callbacks = {
  onStart: () => {},
  onPreviousStep: (currentStep: number) => {},
  onNextStep: (currentStep: number) => {},
  onStop: () => {},
  onSkip: () => {},
  onFinish: () => {}
}

export const DEFAULT_OPTIONS: Options = {
  highlight: false,
  labels: {
    buttonSkip: 'Skip tour',
    buttonPrevious: 'Previous',
    buttonNext: 'Next',
    buttonStop: 'Finish'
  },
  enabledButtons: {
    buttonSkip: true,
    buttonPrevious: true,
    buttonNext: true,
    buttonStop: true
  },
  startTimeout: 0,
  stopOnTargetNotFound: true,
  useKeyboardNavigation: true,
  enabledNavigationKeys: {
    escape: true,
    arrowRight: true,
    arrowLeft: true
  },
  debug: false
}

export const HIGHLIGHT = {
  classes: {
    active: 'v-tour--active',
    targetHighlighted: 'v-tour__target--highlighted',
    targetRelative: 'v-tour__target--relative'
  },
  transition: 'box-shadow 0s ease-in-out 0s'
}

export const DEFAULT_STEP_OPTIONS = {
  enableScrolling: true,
  highlight: DEFAULT_OPTIONS.highlight, // By default use the global tour setting
  enabledButtons: DEFAULT_OPTIONS.enabledButtons,
  modifiers: [
    {
      name: 'arrow',
      options: {
        element: '.v-step__arrow',
        padding: 10
      }
    },
    {
      name: 'preventOverflow',
      options: {
        rootBoundary: 'window',
        padding: 10
      }
    },
    {
      name: 'offset',
      options: {
        offset: [0, 10]
      }
    }
  ],
  placement: "bottom" as Placement,
}

export const KEYS = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37,
  ESCAPE: 27
}
