import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable, switchMap } from 'rxjs';
import { CategoryDataSource } from 'src/app/domain/datasources/category.datasource';
import { CategoryDTO } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryDataSourceImpl implements CategoryDataSource {
  private readonly STORAGE_KEY = 'categories';
  private storage = inject(Storage);

  getCategories(): Observable<CategoryDTO[]> {
    return from(this.storage.get(this.STORAGE_KEY).then(categories => categories || []));
  }
  getCategoryById(id: string): Observable<CategoryDTO | null> {
    return this.getCategories().pipe(
      switchMap(categories => {
        const category = categories.find(cat => cat.id === id) || null;
        return from(Promise.resolve(category));
      })
    );
  }
  createCategory(category: CategoryDTO): Observable<void> {
    return this.getCategories().pipe(
      switchMap(categories => {
        const updatedCategories = [...categories, category];
        return from(this.storage.set(this.STORAGE_KEY, updatedCategories));
      })
    );
  }
  updateCategory(category: CategoryDTO): Observable<void> {
    return this.getCategories().pipe(
      switchMap(categories => {
        const updatedCategories = categories.map(cat => (cat.id === category.id ? category : cat));
        return from(this.storage.set(this.STORAGE_KEY, updatedCategories));
      })
    );
  }

  deleteCategory(id: string): Observable<void> {
    return this.getCategories().pipe(
      switchMap(categories => {
        const updatedCategories = categories.filter(cat => cat.id !== id);
        return from(this.storage.set(this.STORAGE_KEY, updatedCategories));
      })
    );
  }
}

// export { CategoryDataSourceImpl };
