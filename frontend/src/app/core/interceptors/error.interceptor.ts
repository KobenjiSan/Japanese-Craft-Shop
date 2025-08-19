import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.error?.detail){
        toastr.error(error.error.detail);
      } else if (typeof error.error === 'string'){
        toastr.error(error.error);
      } else {
        toastr.error('something went wrong', error.status.toString());
      }
      return throwError(() => error);
    })
  );
};
