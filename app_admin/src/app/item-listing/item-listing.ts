import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Items } from '../services/items';
import { Router, RouterLink } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-item-listing',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './item-listing.html',
  styleUrl: './item-listing.css',
})
export class ItemListing implements OnInit {


  items = signal<any[]>([]);
  categories = signal<string[]>([]);

  // filters
  search = '';
  category = '';
  sort = 'name';
  order = 'asc';

  // selection
  selectedItems: any[] = [];

  constructor(private itemsService: Items, 
    private cd: ChangeDetectorRef, 
    private router: Router,
    public auth: Authentication) {}
    
    isLoggedIn = false;


  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
        this.loadItems();
        this.loadCategories();
    }
  }

  onLogout(): void {
    this.auth.logout();
    this.resetState();
  }

  private resetState() {
    this.items.set([]);
    this.categories.set([]);
  }

  loadItems() {

    if(!this.auth.isLoggedIn()) return;

    const params = {
      search: this.search,
      category: this.category,
      sort: this.sort,
      order: this.order
    };
    
    this.itemsService.getItems(params).subscribe(res => {
      this.items.set(res.items);
      console.log('API RESPONSE:', res);
    });
  }

  loadCategories() {

    if(!this.auth.isLoggedIn()) return;

    this.itemsService.getCategories().subscribe({
      next: (cats) => {
        this.categories.set(cats);
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
    this.selectedItems = event.target.checked ? [...this.items()] : [];
  }

  isAllSelected() {
    return this.items.length > 0 &&
           this.selectedItems.length === this.items.length;
  }

  // ======================
  // ACTIONS
  // ======================

  deleteSelected() {
    
    if(!this.auth.isLoggedIn()) return;

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

  editSelected() { // FIXME remove, unfeasible
    const item = this.selectedItems[0];
    this.router.navigate(['/items', item._id, 'edit']);
  }

  onFiltersChange() {
    this.loadItems();
  }

  setSort(field: string) {

    if(!this.auth.isLoggedIn()) return;

    if (this.sort === field) {
      this.order = this.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort = field;
      this.order = 'asc';
    }
    this.loadItems();
  }
}