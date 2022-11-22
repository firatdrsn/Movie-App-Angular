import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/guards/auth.guard";
import { SharedModule } from "../shared/shared.module";
import { CategoryCreateComponent } from "./category-create/category-create.component";
import { CategoryComponent } from "./category.component";

@NgModule({
    declarations: [
        CategoryComponent,
        CategoryCreateComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        CategoryComponent,
        CategoryCreateComponent
    ]
})
export class CategoryModule { }