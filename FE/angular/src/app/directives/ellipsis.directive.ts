import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appEllipsis]'
})
export class EllipsisDirective implements OnInit {
  @Input() width = '100%';

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.applyEllipsis();
  }

  private applyEllipsis(): void {
    const element = this.el.nativeElement;
    this.renderer.setStyle(element, 'width', this.width);
    this.renderer.setStyle(element, 'overflow', 'hidden');
    this.renderer.setStyle(element, 'white-space', 'nowrap');
    this.renderer.setStyle(element, 'text-overflow', 'ellipsis');
  }
}
