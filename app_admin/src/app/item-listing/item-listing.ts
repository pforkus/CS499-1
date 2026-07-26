import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Items } from '../services/items';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-listing',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './item-listing.html',
  styleUrl: './item-listing.css',
})
export class ItemListing implements OnInit {

  items: any[] = [];
  categories: string[] = [];

  // filters
  search = '';
  category = '';
  sort = 'name';
  order = 'asc';

  // selection
  selectedItems: any[] = [];

  constructor(private itemsService: Items, 
    private cd: ChangeDetectorRef, 
    private router: Router) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadCategories();
  }

  loadItems() {
    const params = {
      search: this.search,
      category: this.category,
      sort: this.sort,
      order: this.order
    };

    
    this.itemsService.getItems(params).subscribe(res => {
      this.items = res.items;
      console.log('API RESPONSE:', res);
      this.cd.detectChanges();
    });
  }

  loadCategories() {
  this.itemsService.getCategories().subscribe({
    next: (cats) => {
      this.categories = cats;
      this.cd.detectChanges();
    },
    error: (err) => {
      console.error('Failed to load categories', err);
    }
  });
  }

  // ======================
  // SELECTION LOGIC
  // ======================

  toggleSelection(item: any) {
    const index = this.selectedItems.indexOf(item);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(item);
    }
  }

  isSelected(item: any) {
    return this.selectedItems.includes(item);
  }

  toggleAll(event: any) {
    this.selectedItems = event.target.checked ? [...this.items] : [];
  }

  isAllSelected() {
    return this.items.length > 0 &&
           this.selectedItems.length === this.items.length;
  }

  // ======================
  // ACTIONS
  // ======================

  deleteSelected() {
  const ids = this.selectedItems.map(item => item._id);
  console.log('IDs being sent:', ids);
  this.itemsService.deleteItems(ids).subscribe({
    next: () => {
      this.selectedItems = [];
      this.loadItems();
    },
    error: (err) => {
      console.error('Failed to delete items', err);
    }
  });
}

  editSelected() { //TODO
    const item = this.selectedItems[0];
    this.router.navigate(['/items', item._id, 'edit']);
  }

  onFiltersChange() {
    this.loadItems();
  }

  setSort(field: string) {
  if (this.sort === field) {
    this.order = this.order === 'asc' ? 'desc' : 'asc';
  } else {
    this.sort = field;
    this.order = 'asc';
  }
  this.loadItems();
}
}