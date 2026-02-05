import { Injectable } from '@angular/core';
import { IMIRequest } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class CustomersService {

   constructor(private miService: MIService) { }

   getCustomers(): Observable<any> {
      const request: IMIRequest = {
         program: "CRS610MI",//programme client
         transaction: "LstByNumber",//transaction de liste standard
         outputFields: ["CUNM", "CUNO", "STAT"],
         maxReturnedRecords: 1000,
         record: {}
      };
      return this.miService.execute(request);
   }

   searchCustomers(): Observable<any> {
      const request: IMIRequest = {
         program: "CRS610MI",//programme client
         transaction: "SearchCustomer",//transaction de recherche IES
         outputFields: ["CUNM", "CUNO", "STAT"],
         maxReturnedRecords: 1000,
         record: { SQRY: "STAT:20" }
      };
      return this.miService.execute(request);
   }
}
