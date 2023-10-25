import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseLink } from './models/base-link';
import { Link } from './models/link';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() public links: BaseLink[];
  @Output() public linkClicked = new EventEmitter<Link>();

  public onClick(link: BaseLink, index: number) {
    this.linkClicked.emit({ ...link, index });
  }
}
