/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 */
export declare class ScrollbarHelper {
    private document;
    width: number;
    constructor(document: any);
    getWidth(): number;
    onInitScroller(scroller: any): void;
    onDestroyScroller(scroller: any): void;
    setOffset(scroller: any, offsetY: number): void;
}
