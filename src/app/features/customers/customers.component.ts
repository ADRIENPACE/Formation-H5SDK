import { Component, OnInit, signal } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { SohoBusyIndicatorModule, SohoComponentsModule, SohoDataGridModule, SohoEditorModule, SohoIconModule, SohoInputModule, SohoModalDialogModule, SohoModalDialogRef, SohoModalDialogService, SohoToastService } from 'ids-enterprise-ng';
import { CustomersService } from '../../core/services/customers.services';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { IdmDataService, IIdmError } from '../../core/services/idm-data.service';
import { ApplicationService } from '@infor-up/m3-odin-angular';


@Component({
   selector: 'app-customers',
   standalone: true,
   imports: [SohoDataGridModule, SohoBusyIndicatorModule, SohoIconModule, SohoModalDialogModule, SohoInputModule, SohoEditorModule],
   templateUrl: './customers.component.html',
   styleUrl: './customers.component.css'
})
export class CustomersComponent extends CoreBase implements OnInit {
   gridOptions: SohoDataGridOptions = {};
   columns: SohoDataGridColumn[] = [];
   dataset = signal<any[]>([]);
   isBusy = signal(false);
   public closeResult = '(N/A)';
   constructor(private customersService: CustomersService, private modalService: SohoModalDialogService, private toastService: SohoToastService, private applicationService: ApplicationService,
      private idmService: IdmDataService) {
      super('AppComponent');
   }

   ngOnInit() {
      this.columns = [
         { id: 'CUNO', name: 'N° Client', field: 'CUNO', filterType: 'text' },
         {
            id: 'CUNM', name: 'Désignation', field: 'CUNM', filterType: 'text',
            editor: Soho.Editors.Input,
            isEditable: (row, cell, value, col, rowData) => {
               return true;
            },
         },
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
         },
         {
            id: 'ViewCustomerDocuments', name: 'Voir', field: 'ViewCustomerDocuments', icon: 'show-item', formatter: Soho.Formatters.Button, click: (_e: any, args: any) => {
               console.log(_e, args);
               this.viewCustomerDocuments(args[0].item);
            }
         },
         {
            id: 'openCRS610', name: 'open program CRS610', field: 'openCRS610', icon: 'group-selection', formatter: Soho.Formatters.Button, click: (_e: any, args: any) => {
               console.log(_e, args);
               this.applicationService.launch('CRS610');
            }
         }
      ];

      this.gridOptions = {
         columns: this.columns,
         filterable: true,
         selectable: 'single',
         cellNavigation: true,
         editable: true,
         paging: true,
         pagesize: 100,
         rowNavigation: true,
         actionableMode: true,
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

      dialogRef.componentDialog?.changesSaved.subscribe((changesSaved: boolean) => {
         this.toastService.show({
            draggable: true, title: 'Information', message: 'Event resultat : ' + changesSaved, position: SohoToastService.TOP_RIGHT
         });
      });
   }
   viewCustomerDocuments(customer: any) {
      this.idmService.searchItems().subscribe({
         next: (response: any) => {
            console.log(response);
         },
         error: (error: IIdmError) => {
            console.error(error);
         }
      });
   }

   onExitEditMode(event: SohoDataGridEditModeEvent) {
      if (event.column.id === 'CUNM' && event.value !== event.oldValue) {
         console.log("Column ID: " + event.column.id);
         console.log("Old Value: " + event.oldValue);
         console.log("New Value: " + event.value);
         console.log("Row Data: " + JSON.stringify(event.item));
      }
   }
}
