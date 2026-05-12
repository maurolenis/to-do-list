import { Routes } from '@angular/router';

export const routes: Routes = [
  
  
  {
    path: 'base',
    loadComponent: () => import('./presentation/pages/base/base.page').then( m => m.BasePage),
    children: [
      {
        path: 'categories',
        loadComponent: () => import('./presentation/pages/categories/categories.page').then( m => m.CategoriesPage)
      },
      {
        path: 'tasks',
        loadComponent: () => import('./presentation/pages/tasks/tasks.page').then( m => m.TasksPage)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'base/tasks'
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'base/tasks'
  },
];
