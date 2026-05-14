import { Task } from './../entities/task.entity';
import { Category } from '../entities/category.entity';

export interface TaskGroup {
  category: Category;
  tasks: Task[];
}
