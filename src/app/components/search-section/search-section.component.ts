import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss']
})
export class SearchSectionComponent implements OnInit {

  searchInput = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

  search(): void {
    console.log('search');
  }

}
