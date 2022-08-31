import {Directive, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]'
})
export class ScrollToBottomDirective implements AfterViewInit{

  constructor(private el: ElementRef) { }
  public ngAfterViewInit(): void {
    const el: HTMLDivElement = this.el.nativeElement;
    el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight);
    setTimeout(() => el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight));
  }
/*  public scrollToBottom(): void {
    const el: HTMLDivElement = this.el.nativeElement;
    el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight);
  }*/
}
