import { Routes } from '@angular/router';
import { ItemListing } from './item-listing/item-listing';
import { ItemEdit } from './item-edit/item-edit';
import { ItemAdd } from './item-add/item-add';

export const routes: Routes = [
    { path: '', component: ItemListing },
    { path: 'items/:id/edit', component: ItemEdit },
    { path: 'items/add', component: ItemAdd }

];
