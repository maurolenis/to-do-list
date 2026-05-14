// domain/use-cases/category.use-cases.ts
import { Injectable, inject } from '@angular/core';
import { Observable, throwError, switchMap, map } from 'rxjs';
import { Category } from '../entities/category.entity';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable({ providedIn: 'root' })
export class CategoryUseCases {
  private repository = inject(CategoryRepository);

  getCategories(): Observable<Category[]> {
    return this.repository.getCategories();
  }

  getCategoryById(id: string): Observable<Category | null> {
    return this.repository.getCategoryById(id);
  }

  createCategory(name: string, icon: string, color: string): Observable<void> {
    return this.repository.getCategories().pipe(
      switchMap(categories => {
        const exists = categories.some(c => c.name.toLowerCase() === name.toLowerCase());

        if (exists) {
          return throwError(() => new Error('Category already exists'));
        }
        const category = Category.create(name, icon, color);
        return this.repository.createCategory(category);
      })
    );
  }

  updateCategory(id: string, name: string, icon: string, color: string): Observable<void> {
    return this.repository.getCategoryById(id).pipe(
      switchMap(existing => {
        if (!existing) {
          return throwError(() => new Error('Category not found'));
        }

        const updated = new Category(
          id,
          name || existing.name,
          icon || existing.icon,
          color || existing.color
        );

        return this.repository.updateCategory(updated);
      })
    );
  }

  deleteCategory(id: string): Observable<void> {
    if (!id) {
      return throwError(() => new Error('Category ID is required'));
    }

    return this.repository.getCategoryById(id).pipe(
      switchMap(category => {
        if (!category) {
          return throwError(() => new Error('Category not found'));
        }
        return this.repository.deleteCategory(id);
      })
    );
  }
}
