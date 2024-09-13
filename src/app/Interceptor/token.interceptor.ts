// import { HttpErrorResponse, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AuthService } from '../Service/auth.service';
// import { catchError, switchMap, throwError } from 'rxjs';
// import { TokenApiModel } from '../Model/token-api.model';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//   const myToken = inject(AuthService).getToken();
//   if (myToken) {
//     req = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${myToken}`,
//       },
//     });
//   }
//   return next(req).pipe(
//     catchError((err: any) => {
//       if (err instanceof HttpErrorResponse) {
//         if (err.status === 401) {
//           //
//           //

//               return this.handleUnauthorizedError(req,next);


//         }
//       }

//       return throwError(() => err);
//     }
//   )
//   );

// };

// handleUnauthorizedError(req: HttpRequest<any>,next: HttpHandler)
// {
//  const accessToken =this.auth.getToken();
//  const refreshToken=this.auth.refreshToken();
//  let tokenApiModel=new TokenApiModel();

//  return this.auth.renewToken(tokenApiModel).pipe(
//   switchMap((data: TokenApiModel)=>
//   {
//     this.auth.storeRefreshToken(data.refreshToken);
//     this.auth.storeToken(data.refreshToken);

//     req = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${myToken}`,
//       },
//     });

//     return next.handle(req);
//    }),
//    catchError((err:any)=>
//   {
//     return throwError(()=>
    
//     )
//   })
//  )
// }
import { HttpErrorResponse, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenApiModel } from '../Model/token-api.model';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const myToken = authService.getToken();
  
  if (myToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${myToken}`,
      },
    });
  }

  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return handleUnauthorizedError(req, next, authService);
      }
      return throwError(() => err);
    })
  );
};

const handleUnauthorizedError = (req: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService) => {
 
  const tokenApiModel = new TokenApiModel();
  
  const refreshToken = authService.getRefreshToken();
  const accessToken=authService.getToken();
  return authService.renewToken(tokenApiModel).pipe(
    switchMap((data: TokenApiModel) => {
      authService.storeRefreshToken(data.refreshToken);
      authService.storeToken(data.accessToken);

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      });

      return next(req);
    }),
    catchError((err: any) => {
      return throwError(() => err);
    })
  );
};
