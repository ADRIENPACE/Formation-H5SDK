import { Component, OnInit, signal } from '@angular/core';
import { CoreBase } from '@infor-up/m3-odin';
import { SohoBusyIndicatorModule, SohoDataGridModule } from 'ids-enterprise-ng';
import { CustomersService } from '../../core/services/customers.services';


@Component({
   selector: 'app-customers',
   standalone: true,
   imports: [SohoDataGridModule, SohoBusyIndicatorModule],
   templateUrl: './customers.component.html',
   styleUrl: './customers.component.css'
})
export class CustomersComponent extends CoreBase implements OnInit {
   gridOptions: SohoDataGridOptions = {};
   columns: SohoDataGridColumn[] = [];
   dataset = signal<any[]>([]);
   isBusy = signal(false);
   constructor(private customersService: CustomersService) {
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

}
