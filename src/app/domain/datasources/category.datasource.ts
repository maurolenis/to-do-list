import { Observable } from 'rxjs';
import { CategoryDTO } from 'src/app/data/models/category.model';

abstract class CategoryDataSource {
  public abstract getCategories(): Observable<CategoryDTO[]>;
  public abstract getCategoryById(id: string): Observable<CategoryDTO | null>;
  public abstract createCategory(category: CategoryDTO): Observable<void>;
  public abstract updateCategory(category: CategoryDTO): Observable<void>;
  public abstract deleteCategory(id: string): Observable<void>;
}

export { CategoryDataSource };
