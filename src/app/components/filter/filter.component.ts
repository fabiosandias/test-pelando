import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tes-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filterByTitle = new EventEmitter();
  @Output() clearCurrentFilter = new EventEmitter();
  filterValue: string = '';
  isFilter: boolean;

  constructor() { }

  ngOnInit() {
    this.isFilter = false;
  }

  applyFilter(titles) {
    this.isFilter = true
    this.filterByTitle.emit(titles)
  }

  clearFilter() {
    this.filterValue = '';
    this.isFilter = false
    this.clearCurrentFilter.emit()
  }

}
