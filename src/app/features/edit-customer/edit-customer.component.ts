import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreBase } from '@infor-up/m3-odin';
import { SohoInputModule } from 'ids-enterprise-ng';

@Component({
   selector: 'app-edit-customer',
   standalone: true,
   imports: [FormsModule, SohoInputModule],
   templateUrl: './edit-customer.component.html',
   styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent extends CoreBase {
   @Input() cuno = '';
   @Input() cunm = '';
   @Output() changesSaved = new EventEmitter<boolean>();

   constructor() {
      super('EditCustomerComponent');
   }

   ngOnInit() {
      console.log('EditCustomerComponent');
   }

   @Input() saveChanges() {
      this.changesSaved.emit(true);
      console.log('Changes saved');
   }
}
