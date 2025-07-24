export type Step = {
  before?: (smt: string) => Promise<void>;
  target: string | Element | null;
  header: {
    title: string;
  },
  content: string,
  params?: {
    duration?: number;
    offset?: number;
    enableScrolling?: boolean;
  }
}

export type Callbacks = {
  onStart?: () => void;
  onPreviousStep?: (currentStep: Step) => void;
  onNextStep?: (currentStep: Step) => void;
  onStop?: () => void;
  onSkip?: () => void;
  onFinish?: () => void;
}

export type EnabledButtons = {
  buttonSkip?: boolean;
  buttonPrevious?: boolean;
  buttonNext?: boolean;
  buttonStop?: boolean;
}

export type ButtonName = keyof EnabledButtons;

export type Options = {
  highlight?: boolean;
  labels?: {
    buttonSkip?: string;
    buttonPrevious?: string;
    buttonNext?: string;
    buttonStop?: string;
  };
  enabledButtons? : EnabledButtons,
  startTimeout?: number;
  stopOnTargetNotFound?: boolean;
  useKeyboardNavigation?: boolean;
  enabledNavigationKeys?: {
    escape?: boolean;
    arrowRight?: boolean;
    arrowLeft?: boolean;
  };
  debug?: boolean;
  ionic?: boolean;
}

export type NavigationKey = 'escape' | 'arrowRight' | 'arrowLeft';

export type VTourExpose = {
  currentStep: number;
  start: (startStep?: string) => void;
  nextStep: () => void;
}
