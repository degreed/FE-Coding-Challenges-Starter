import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EllipsisDirective } from './ellipsis.directive';

@Component({
  template: `<div [appEllipsis]="width">Content that may exceed the specified width</div>`
})
class TestComponent {
  width: string;
}

describe('EllipsisDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let divElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EllipsisDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    divElement = fixture.debugElement.query(By.directive(EllipsisDirective)).nativeElement;
  });

  it('should create an instance', () => {
    const directive = new EllipsisDirective(null!, null!);
    expect(directive).toBeTruthy();
  });

  it('should set ellipsis styles with 100% width by default', () => {
    fixture.detectChanges();
    expect(divElement.style.width).toBe('100%');
    expect(divElement.style.overflow).toBe('hidden');
    expect(divElement.style.whiteSpace).toBe('nowrap');
    expect(divElement.style.textOverflow).toBe('ellipsis');
  });
});
