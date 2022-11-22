import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { CategoryCreateComponent } from './category/category-create/category-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', loadChildren: () => import("./movies/movies.module").then(m => m.MoviesModule) },
  { path: 'category/create', component: CategoryCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
