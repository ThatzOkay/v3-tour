import { Step } from "../shared/types";
type __VLS_Props = {
    step: Step;
    previousStep: () => void;
    nextStep: () => void;
    stop: () => void;
    skip?: () => void;
    finish?: () => void;
    isFirst: boolean;
    isLast: boolean;
    labels?: {
        buttonSkip?: string;
        buttonPrevious?: string;
        buttonNext?: string;
        buttonStop?: string;
    };
    enabledButtons?: {
        buttonSkip?: boolean;
        buttonPrevious?: boolean;
        buttonNext?: boolean;
        buttonStop?: boolean;
    };
    highlight?: boolean;
    stopOnFail?: boolean;
    debug?: boolean;
    ionic?: boolean;
};
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_1) => any;
} & {
    content?: (props: typeof __VLS_3) => any;
} & {
    actions?: (props: typeof __VLS_5) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, (() => void)[], {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    targetNotFound: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onTargetNotFound?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
