export type Step = {
  before?: (smt: string) => Promise<void>;
  target?: string | Element;
  header?: {
    title: string;
  },
  content?: string,
  params?: {
    highlight?: boolean;
    duration?: number;
    offset?: number;
    enableScrolling?: boolean;
    placement?: 'top' | 'bottom' | 'left' | 'right';
  }
}

export type Callbacks = {
  onStart?: () => void;
  onPreviousStep?: (currentStep: number) => void;
  onNextStep?: (currentStep: number) => void;
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
