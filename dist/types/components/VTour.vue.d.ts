import { Callbacks, Options, Step } from "../shared/types";
type __VLS_Props = {
    steps: Step[];
    name: string;
    options: Options;
    callbacks: Callbacks;
};
declare var __VLS_1: {
    currentStep: number;
    steps: Step[];
    previousStep: () => Promise<void>;
    nextStep: () => Promise<void>;
    stop: () => void;
    skip: () => void;
    finish: () => void;
    isFirst: boolean;
    isLast: boolean;
    labels: {
        buttonSkip?: string;
        buttonPrevious?: string;
        buttonNext?: string;
        buttonStop?: string;
    } | undefined;
    enabledButtons: import("../shared/types").EnabledButtons | undefined;
    highlight: boolean | undefined;
    debug: boolean | undefined;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {
    start: (startStep: Step) => Promise<void>;
    previousStep: () => Promise<void>;
    nextStep: () => Promise<void>;
    stop: () => void;
    skip: () => void;
    finish: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    options: Options;
    callbacks: Callbacks;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
