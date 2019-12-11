import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 */
@Injectable()
export class ScrollbarHelper {
  width: number = this.getWidth();

  constructor(@Inject(DOCUMENT) private document: any) {}

  getWidth(): number {
    const outer = this.document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar';
    this.document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';

    const inner = this.document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    const widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }

  onInitScroller(scroller: any): void {
    scroller._scrollEventListener = scroller.onScrolled.bind(scroller);
    scroller.parentElement.addEventListener('scroll', scroller._scrollEventListener);
  }

  onDestroyScroller(scroller: any): void {
    if (scroller._scrollEventListener) {
      scroller.parentElement.removeEventListener('scroll', scroller._scrollEventListener);
      scroller._scrollEventListener = null
    }
  }

  setOffset(scroller: any, offsetY: number): void {
    scroller.parentElement.scrollTop = offsetY;
  }
}
