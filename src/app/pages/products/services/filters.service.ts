import { Injectable } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { Filter } from '../models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  filterAndSortProducts(items: Product[], filters: Filter) {
    if (!items) return [];

    return items
      .filter((item) => {
        if (item.isDeleted) return false;
        if (!item.name) return false;

        const matchesSearch = item.name
          .toLowerCase()
          .includes(filters.search.toLowerCase());

        let matchesCategory = true;
        switch (filters.category) {
          case 'all':
            matchesCategory = true;
            break;
          default:
            matchesCategory =
              item.category.toLowerCase() === filters.category.toLowerCase();
            break;
        }

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (filters.price) {
          case 'asc':
            return a.price - b.price;
          case 'desc':
            return b.price - a.price;
        }

        switch (filters.alphabetical) {
          case 'asc':
            return a.name.localeCompare(b.name);
          case 'desc':
            return b.name.localeCompare(a.name);
        }

        return 0;
      });
  }
}
