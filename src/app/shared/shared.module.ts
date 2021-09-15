import { NgModule } from "@angular/core";
import { AuthService } from "../global/auth/auth.service";
import { CapitalizePipe } from "../utils/pipe/capitalize.pipe";

@NgModule({
    declarations: [CapitalizePipe],
    imports: [],
    exports: [CapitalizePipe],
    providers: [AuthService],
    entryComponents: [],
  })

export class SharedModule { }
