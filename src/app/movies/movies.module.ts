import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MovieCreateComponent } from "./movie-create/movie-create.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MovieFilterPipe } from "./pipes/movie-filter.pipe";
import { MovieComponent } from "./movie/movie.component";
import { MoviesHomeComponent } from "./movies-home/movies-home.component";
import { MoviesRoutingModule } from "./movies-routing.module";
import { MoviesComponent } from "./movies.component";
import { SummaryPipe } from "./pipes/summary.pipe";
import { CategoryModule } from "../category/category.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        MovieFilterPipe,
        MovieCreateComponent,
        MoviesComponent,
        MovieComponent,
        MovieDetailComponent,
        SummaryPipe,
        MoviesHomeComponent,
    ],
    imports: [
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        MoviesRoutingModule,
        CategoryModule
    ],
    exports: [
        MovieFilterPipe,
        MovieCreateComponent,
        MoviesComponent,
        MovieComponent,
        MovieDetailComponent,
        SummaryPipe,
        MoviesHomeComponent,
    ]
})
export class MoviesModule { }