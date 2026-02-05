import { Component, OnInit, signal } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { SohoBusyIndicatorModule, SohoDataGridModule, SohoIconModule, SohoModalDialogModule, SohoModalDialogRef, SohoModalDialogService } from 'ids-enterprise-ng';
import { CustomersService } from '../../core/services/customers.services';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';


@Component({
   selector: 'app-customers',
   standalone: true,
   imports: [SohoDataGridModule, SohoBusyIndicatorModule, SohoIconModule, SohoModalDialogModule],
   templateUrl: './customers.component.html',
   styleUrl: './customers.component.css'
})
export class CustomersComponent extends CoreBase implements OnInit {
   gridOptions: SohoDataGridOptions = {};
   columns: SohoDataGridColumn[] = [];
   dataset = signal<any[]>([]);
   isBusy = signal(false);
   public closeResult = '(N/A)';
   constructor(private customersService: CustomersService, private modalService: SohoModalDialogService) {
      super('AppComponent');
   }

   ngOnInit() {
      this.columns = [
         { id: 'CUNO', name: 'N° Client', field: 'CUNO', filterType: 'text' },
         { id: 'CUNM', name: 'Désignation', field: 'CUNM', filterType: 'text' },
         {
            id: 'STAT', name: 'Statut', field: 'STAT', filterType: 'text', formatter: (row: number,
               cell: any, fieldValue: any, columnDef: SohoDataGridColumn, rowData: Object, api: SohoDataGridStatic) => {
               const size = 'display: inline-block; width: 72px; text-align: center; color: #fff; padding: 3px 10px; border-radius: 3px; font-size: 12px; font-weight: 500; line-height: 1.3;';
               if (rowData['STAT'] === '20') {
                  return '<span style="' + size + ' background: #2e7d32;">Actif</span>';
               } else {
                  return '<span style="' + size + ' background: #c62828;">Inactif</span>';
               }
            }
         },
         {
            id: 'DeleteCustomer', name: 'Supprimer', field: 'DeleteCustomer', icon: 'delete', formatter: Soho.Formatters.Button, click: (_e: any, args: any) => {
               console.log(_e, args);
               this.deleteCustomer(args[0].item);
            }
         },
         {
            id: 'UpdateCustomer', name: 'Mettre à jour', field: 'UpdateCustomer', icon: 'edit', formatter: Soho.Formatters.Button, click: (_e: any, args: any) => {
               console.log(_e, args);
               this.updateCustomer(args[0].item);
            }
         }
      ];

      this.gridOptions = {
         columns: this.columns,
         filterable: true,
         selectable: 'single',
         cellNavigation: false,
         paging: true,
         pagesize: 100,
         pagesizes: [100, 200, 500, 1000],

      };
      this.loadCustomers();
   }

   private loadCustomers() {
      this.setBusy(true);
      this.customersService.getCustomers().subscribe({
         next: (response: any) => {
            if (response.items) {
               this.dataset.set(response.items);
            }
            this.setBusy(false);
         },
         error: (error: any) => {
            console.error(error.errorMessage);
            this.setBusy(false);
         }
      });
   }

   private setBusy(isBusy: boolean) {
      this.isBusy.set(isBusy);
   }


   deleteCustomer(customer: any) {
      const dialogRef = this.modalService
         .message('<span class="message">Voulez-vous vraiment supprimer ce client ?</span>')
         .buttons(
            [{
               text: 'YES', click: () => {
                  dialogRef.close('YES');
               }
            },
            {
               text: 'NO', click: () => {
                  dialogRef.close('NO');
               }, isDefault: true
            }])
         .title('Suppression ' + customer.CUNM + ' (' + customer.CUNO + ')')
         .open()
         .afterClose((result: any) => {
            this.closeResult = result;
            if (this.closeResult === 'YES') {
               console.log('Client supprimé');
               //appel au service de suppression
            } else {
               console.log('Client non supprimé');
            }
         });
   }

   updateCustomer(customer: any) {
      const dialogRef: SohoModalDialogRef<EditCustomerComponent> = this.modalService
         .modal<EditCustomerComponent>(EditCustomerComponent)
         .apply((comp) => {
            comp.cuno = customer.CUNO ?? '';
            comp.cunm = customer.CUNM ?? '';
         })
         .buttons(
            [{
               text: 'YES', click: () => {
                  dialogRef.componentDialog?.saveChanges();
                  dialogRef.close('YES');
               }
            },
            {
               text: 'NO', click: () => {
                  dialogRef.close('NO');
               }, isDefault: true
            }])
         .title('Mise à jour ' + customer.CUNM + ' (' + customer.CUNO + ')')
         .open()
         .afterClose((result: any) => { });
   }

}
