import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from 'src/app/domain/entities/task.entity';
import { TaskRepository } from 'src/app/domain/repositories/task.repository';
import { TaskDataSourceImpl } from '../datasources/task.datasource.impl';
import { TaskDTO } from '../models/task.mode';

@Injectable({ providedIn: 'root' })
export class TaskRepositoryImpl implements TaskRepository {
  private dataSource = inject(TaskDataSourceImpl);

  getTasks(): Observable<Task[]> {
    return this.dataSource.getTasks().pipe(map(dtos => dtos.map(dto => this.dtoToEntity(dto))));
  }

  getTaskById(id: string): Observable<Task | null> {
    return this.dataSource.getTaskById(id).pipe(map(dto => (dto ? this.dtoToEntity(dto) : null)));
  }

  createTask(task: Task): Observable<void> {
    const dto = this.entityToDto(task);
    return this.dataSource.createTask(dto);
  }

  updateTask(task: Task): Observable<void> {
    const dto = this.entityToDto(task);
    return this.dataSource.updateTask(dto);
  }

  deleteTask(id: string): Observable<void> {
    return this.dataSource.deleteTask(id);
  }

  private dtoToEntity(dto: TaskDTO): Task {
    return new Task(dto.id, dto.title, dto.categoryId, dto.completed);
  }

  private entityToDto(entity: Task): TaskDTO {
    return {
      id: entity.id,
      title: entity.title,
      categoryId: entity.categoryId,
      completed: entity.completed,
    };
  }
}
