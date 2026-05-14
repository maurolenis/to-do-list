import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'base',
    loadComponent: () => import('./presentation/pages/base/base.page').then(m => m.BasePage),
    children: [
      {
        path: 'categories',
        loadComponent: () =>
          import('./presentation/pages/category/categories/categories.page').then(
            m => m.CategoriesPage
          ),
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./presentation/pages/task/tasks/tasks.page').then(m => m.TasksPage),
      },
      {
        path: 'new-category',
        loadComponent: () =>
          import('./presentation/pages/category/new-category/new-category.page').then(
            m => m.NewCategoryPage
          ),
      },
      {
        path: 'new-task',
        loadComponent: () =>
          import('./presentation/pages/task/new-task/new-task.page').then(m => m.NewTaskPage),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'base/tasks',
      },
    ],
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'base/tasks',
  },
];
