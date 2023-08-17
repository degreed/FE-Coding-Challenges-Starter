import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BaseLink, Link } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-decades',
  templateUrl: './decades.component.html'
})
export class DecadesComponent implements OnInit {
  @Input() public currDecade: number | undefined;
  @Input() public decades: number[];
  @Output() public updateDecade = new EventEmitter<number | undefined>();


  public links: BaseLink[];

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.links = [
      {
        isActive: !this.currDecade,
        label: 'All'
      },
      ...this.decades.map((decade) => ({
        isActive: this.currDecade === decade,
        label: `${decade}'s`
      }))
    ];

  }

  public passDecade({ index, label }: Link) {
    this.links = this.links.map((link) => ({ ...link, isActive: false }));
    this.links[index].isActive = true;
    const decade = label === 'All' ? undefined : parseInt(label.replace("'s", ''));
    this.updateDecade.emit(decade);
  }
}
