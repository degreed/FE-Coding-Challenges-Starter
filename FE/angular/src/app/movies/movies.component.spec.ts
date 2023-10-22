import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  MoviesModuleComponent } from './movies.component';

describe('MoviesComponent', () => {
  let component: MoviesModuleComponent;
  let fixture: ComponentFixture<MoviesModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
