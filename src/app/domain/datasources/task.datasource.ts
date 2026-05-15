import { Observable } from 'rxjs';
import { TaskDTO } from 'src/app/data/models/task.mode';

abstract class TaskDataSource {
  public abstract getTasks(): Observable<TaskDTO[]>;
  public abstract getTaskById(id: string): Observable<TaskDTO | null>;
  public abstract createTask(task: TaskDTO): Observable<void>;
  public abstract updateTask(task: TaskDTO): Observable<void>;
  public abstract deleteTask(id: string): Observable<void>;
}

export { TaskDataSource };
