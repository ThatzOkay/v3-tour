export declare function useTour(tourName: string): {
    currentStep: number;
    start: (startStep?: string) => void;
    nextStep: () => void;
};
