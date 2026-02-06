import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoreBase } from '@infor-up/m3-odin';
import { TranslateModule } from '@ngx-translate/core';
import { SohoInputModule, SohoToastService } from 'ids-enterprise-ng';

@Component({
   selector: 'app-edit-customer',
   standalone: true,
   imports: [ReactiveFormsModule, SohoInputModule, TranslateModule],
   templateUrl: './edit-customer.component.html',
   styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent extends CoreBase {
   @Input() set cuno(value: string) {
      this.form.patchValue({ cuno: value ?? '' });
   }

   @Input() set cunm(value: string) {
      this.form.patchValue({ cunm: value ?? '' });
   }

   @Output() changesSaved = new EventEmitter<boolean>();

   form = new FormGroup({
      cuno: new FormControl({ value: '', disabled: true }, Validators.required),
      cunm: new FormControl('', Validators.required)
   });

   constructor(private toastService: SohoToastService) {
      super('EditCustomerComponent');
   }

   ngOnInit() {
      console.log('EditCustomerComponent');
   }

   saveChanges() {
      this.changesSaved.emit(true);
      this.toastService.show({
         draggable: true, title: 'Information', message: 'Changements enregistrés', position: SohoToastService.TOP_RIGHT
      });
   }
}
