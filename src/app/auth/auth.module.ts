import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./services/auth.service";

@NgModule({
    declarations: [AuthComponent],
    imports: [
        FormsModule,
        RouterModule.forChild([
            { path: '', component: AuthComponent },
        ]),
        SharedModule,
    ],
})
export class AuthModule { }