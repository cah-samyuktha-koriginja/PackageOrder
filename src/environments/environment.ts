// let win=window;
// let env='';
// if(win.location.origin=='http://localhost:4200'){
// console.log("localhost");
// env=win.location.origin;
// }
// else if(win.location.origin=='https://wbd-support-order-placing.apps.cf.np.gc.cahcloud.net'){
//   console.log("dev url");
//   env=win.location.origin;
// }


export const environment = {
  production: false,
  //API_URL: window.location.origin+'/wbd/order/api/v1/compliancePackageOrder/save'
  //API_URL: 'https://api.dev.cardinalhealth.com/wbd/order/api/v1/compliancePackageOrder/save'
  API_URL:'https://wbd-support-order-placing.apps.cf.np.gc.cahcloud.net/wbd/order/api/v1/compliancePackageOrder/save'
};
