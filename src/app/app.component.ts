import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreBase, IUserContext } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { SohoBusyIndicatorModule, SohoButtonModule, SohoIconModule } from 'ids-enterprise-ng';
import { CustomersComponent } from "./features/customers/customers.component";

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [
      SohoIconModule,
      CustomersComponent
   ],
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent extends CoreBase implements OnInit {

   constructor(private miService: MIService, private userService: UserService) {
      super('AppComponent');
   }

   ngOnInit() {

   }

}
