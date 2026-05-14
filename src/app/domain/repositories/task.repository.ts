import { Observable } from 'rxjs';
import { Task } from '../entities/task.entity';

abstract class TaskRepository {
  public abstract getTasks(): Observable<Task[]>;
  public abstract getTaskById(id: string): Observable<Task | null>;
  public abstract createTask(task: Task): Observable<void>;
  public abstract updateTask(task: Task): Observable<void>;
  public abstract deleteTask(id: string): Observable<void>;
}

export { TaskRepository };
