import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/guards/auth.guard";
import { MovieCreateComponent } from "./movie-create/movie-create.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MoviesHomeComponent } from "./movies-home/movies-home.component";
import { MoviesComponent } from "./movies.component";

const routes: Routes = [
    {
        path: "",
        component: MoviesHomeComponent,
        children: [
            { path: '', component: MoviesComponent },
            { path: 'category/:categoryId', component: MoviesComponent },
            { path: 'create', component: MovieCreateComponent, canActivate: [AuthGuard] },
            { path: ':movieId', component: MovieDetailComponent },
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MoviesRoutingModule {

}