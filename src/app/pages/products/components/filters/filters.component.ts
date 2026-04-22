import { Component, Output, EventEmitter } from '@angular/core';
import { Filter } from '../../models/filter.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  @Output() filtersChanged = new EventEmitter<Filter>();
  categories = ['Cakes', 'Desserts', 'Bakery'];
  currentFilters: Filter = {
    search: '',
    category: 'all',
    price: '',
    alphabetical: 'none',
  };

  onFilterChange() {
    this.filtersChanged.emit(this.currentFilters);
  }
}
