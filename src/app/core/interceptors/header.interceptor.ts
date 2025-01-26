import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = getAuthToken()
  console.log("authToken", authToken)
  const modifiedRequest = req.clone({
    setHeaders:{
      ...(authToken && {Authorization: authToken}),
      'Content-Type':req.headers.get('Content-Type') || 'application/json',
      Accept: 'application/json'
    }
  })
  return next(modifiedRequest);

};

const getAuthToken = () => {
  const authToken = localStorage.getItem('authToken')
  return authToken
}


