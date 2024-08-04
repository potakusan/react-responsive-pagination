import { CompositionItem } from '../compositionItem.js';
export declare function useWidthCalculator(): MetricsRenderResult | CalculatorResult;
declare type MetricsRenderResult = {
    metricsRender: {
        items: CompositionItem[];
        ref: (element: Element | null) => void;
    };
    widthCalculator?: undefined;
    clearCache: () => void;
};
declare type CalculatorResult = {
    metricsRender?: undefined;
    widthCalculator: WidthCalculator;
    clearCache: () => void;
};
declare type WidthCalculator = (items: CompositionItem[]) => number;
export {};
