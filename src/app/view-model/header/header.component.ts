import { Component, OnInit } from '@angular/core';
import { headerElements } from 'src/app/global/model/header/header.elements';

@Component({
  selector: 'app-header',
  templateUrl: '../../view/header/header.component.html',
  styleUrls: ['../../view/header/header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerElements: typeof headerElements;
  constructor() {}

  ngOnInit() {
    this.initializeProperties();
  }

  initializeProperties(): void {
    this.headerElements = headerElements;
  }

}
