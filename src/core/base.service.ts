import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";

export class BaseService{

    protected handleHttpError = (response: HttpErrorResponse) =>
    {
  
      let error: string = "";
      if (response.status == 0) {
        error = "A Network Error Has Occured, please notify the site's webmaster";
      }
  
      else if (response.error?.errors) {
  
        if (response.error.errors?.Email) {
          response.error.errors.Email.map((er: string) => error += " " + er + " .");
        }
        if (response.error.errors?.Password) {
          response.error.errors.Password.map((er: string) => error += " " + er );
        }
  
        if (Array.isArray(response.error?.errors)) {
          response.error.errors.map((er: string) => error += " " + er + " .");
        } 
      }
      else if (response.error?.detail) {
        error += response.error?.detail;
      }
      else {
        error = response.message;
      }
  
      return throwError(()=>new Error(error));
    }

    getDeleteHttpHeadersOptions(id:number){
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          id: id
        },
      };
    }
}