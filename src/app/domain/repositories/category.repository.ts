import { Observable } from 'rxjs';
import { Category } from '../entities/category.entity';

abstract class CategoryRepository {
  public abstract getCategories(): Observable<Category[]>;
  public abstract getCategoryById(id: string): Observable<Category | null>;
  public abstract createCategory(category: Category): Observable<void>;
  public abstract updateCategory(category: Category): Observable<void>;
  public abstract deleteCategory(id: string): Observable<void>;
}

export { CategoryRepository };
