import { Callbacks, Options } from "../shared/types";
import { Placement } from "@popperjs/core/lib/enums";
export declare const DEFAULT_CALLBACKS: Callbacks;
export declare const DEFAULT_OPTIONS: Options;
export declare const HIGHLIGHT: {
    classes: {
        active: string;
        targetHighlighted: string;
        targetRelative: string;
    };
    transition: string;
};
export declare const DEFAULT_STEP_OPTIONS: {
    enableScrolling: boolean;
    highlight: boolean | undefined;
    enabledButtons: import("../shared/types").EnabledButtons | undefined;
    modifiers: ({
        name: string;
        options: {
            element: string;
            padding: number;
            rootBoundary?: undefined;
            offset?: undefined;
        };
    } | {
        name: string;
        options: {
            rootBoundary: string;
            padding: number;
            element?: undefined;
            offset?: undefined;
        };
    } | {
        name: string;
        options: {
            offset: number[];
            element?: undefined;
            padding?: undefined;
            rootBoundary?: undefined;
        };
    })[];
    placement: Placement;
};
export declare const KEYS: {
    ARROW_RIGHT: number;
    ARROW_LEFT: number;
    ESCAPE: number;
};
