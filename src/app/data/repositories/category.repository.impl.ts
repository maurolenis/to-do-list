import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/domain/entities/category.entity';
import { CategoryRepository } from 'src/app/domain/repositories/category.repository';
import { CategoryDataSourceImpl } from '../datasources/category.datasource.impl';
import { CategoryDTO } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryRepositoryImpl implements CategoryRepository {
  private dataSource = inject(CategoryDataSourceImpl);
  getCategories(): Observable<Category[]> {
    return this.dataSource
      .getCategories()
      .pipe(map(dtos => dtos.map(dto => this.dtoToEntity(dto))));
  }
  getCategoryById(id: string): Observable<Category | null> {
    return this.dataSource
      .getCategoryById(id)
      .pipe(map(dto => (dto ? this.dtoToEntity(dto) : null)));
  }
  createCategory(category: Category): Observable<void> {
    const dto = this.entityToDto(category);
    return this.dataSource.createCategory(dto);
  }
  updateCategory(category: Category): Observable<void> {
    const dto = this.entityToDto(category);
    return this.dataSource.updateCategory(dto);
  }
  deleteCategory(id: string): Observable<void> {
    return this.dataSource.deleteCategory(id);
  }

  private dtoToEntity(dto: CategoryDTO): Category {
    return new Category(dto.id, dto.name, dto.icon, dto.color);
  }

  private entityToDto(entity: Category): CategoryDTO {
    return {
      id: entity.id,
      name: entity.name,
      icon: entity.icon,
      color: entity.color,
    };
  }
}

// export { CategoryRepositoryImpl };
