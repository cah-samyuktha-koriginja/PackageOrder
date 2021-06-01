import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: []
})
export class NavbarComponent implements OnInit {
  constructor( @Inject(DOCUMENT) private document: Document ) { }
  ngOnInit(): void {
  }
  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }
}
