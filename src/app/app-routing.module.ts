// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { LoginComponent } from './login/login.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { OtpverificationComponent } from './otpverification/otpverification.component';
import { RegisterComponent } from './register/register.component';
import { UserStatComponent } from './user-stat/user-stat.component';
import path from 'path';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';
import { UserComponent } from './theme/layout/user/user.component';
import { UserAdComponent } from './theme/layout/user-ad/user-ad.component';
import { RetrieveIndentComponent } from './Outward/indent/retrieve-indent/retrieve-indent.component';
import { AuthGuard } from './auth.guard';
export const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  { path: 'modify', component: RetrieveIndentComponent },
  // {
  //   path:'home',
  //   component:HomecomponentComponent
  // },
  {
    path: '',
    component: UserComponent,
    children:[
      
      {
        path: 'home',
        loadComponent: () => import('./homecomponent/homecomponent.component').then(m=>m.HomecomponentComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./demo/aboutus/aboutus.component').then(m=>m.AboutusComponent)
      },
      {
        path: 'faq',
        loadComponent: () => import('./demo/faq/faq.component').then(m => m.FAQComponent)
      },
      
      {
        path: 'Contact',
        loadComponent: () => import('./demo/contactus/contactus.component').then(m => m.ContactusComponent)
      },
      
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
        canActivate: [AuthGuard]
      },
      
      {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
      },
      
      {
        path: 'rgststat',
        loadComponent: () => import('./user-stat/user-stat.component').then(m => m.UserStatComponent)
      },
      
      // {
      //   path: 'rgststatview',
      //   loadComponent: () => import('./user-stat/viewuser/viewuser.component').then(m => m.ViewuserComponent)
      // },
      
      {
        path: 'forgetPasswd',
        loadComponent: () => import('./forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent)
      },
      {
        path: 'loader',
        loadComponent: () => import('./theme/shared/components/loader/loader.component').then(m=>m.LoaderComponent)
      }
     
    ]
  },
  {
    path:'captcha',
    component:CaptchaComponent
  },
  {
    path:'otp',
    component:OtpverificationComponent
  },
  {
    path: '',
    component: AdminComponent,
    children:[
      {
        path:'Location',
        children: [
      {
        path: 'DebitLocation',
        loadComponent: () => import('./CustomerAdmin/Location/debit-location/debit-location.component').then(m=>m.DebitLocationComponent)
      },
      {
        path: 'NewLocation',
        loadComponent: () => import('./CustomerAdmin/Location/new-location/new-location.component').then(m=>m.NewLocationComponent)
      }
      
    ]
      },
      {
        path:'SubTasks',
        children: [
      {
        path: 'SubIdGeneration',
        loadComponent: () => import('./CustomerAdmin/SubUser/sub-id-generation/sub-id-generation.component').then(m=>m.SubIdGenerationComponent)
      },
      {
        path: 'TaskAllocation',
        loadComponent: () => import('./CustomerAdmin/SubUser/task-allocation/task-allocation.component').then(m=>m.TaskAllocationComponent)
      }
      
    ]
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children:[
      {
        path:'Outward',
        children: [
      {
        path: 'Indent',
        loadComponent: () => import('./Outward/indent/indent.component').then(m=>m.IndentComponent)
      },
      {
        path: 'modifyIndent',
        loadComponent: () => import('./Outward/indent/retrieve-indent/retrieve-indent.component').then(m=>m.RetrieveIndentComponent)
      },
      {
        path: 'IndentCancellation',
        loadComponent: () => import('./Outward/indent-cancellation/indent-cancellation.component').then(m=>m.IndentCancellationComponent)
      },
      {
        path: 'ContainerAllocation',
        loadComponent: () => import('./Outward/container-allocation/container-allocation.component').then(m=>m.ContainerAllocationComponent)
      },
      {
        path: 'AllottedContainerCancellation',
        loadComponent: () => import('./Outward/alloted-container-cancellation/alloted-container-cancellation.component').then(m=>m.AllotedContainerCancellationComponent)
      },
      {
        path: 'SealAllocation',
        loadComponent: () => import('./Outward/seal-allocation/seal-allocation.component').then(m=>m.SealAllocationComponent)
      },
      {
        path: 'ForwardingNote',
        loadComponent: () => import('./Outward/forwarding-note/forwarding-note.component').then(m=>m.ForwardingNoteComponent)
      },
      {
        path: 'OnlineIWB',
        loadComponent: () => import('./Outward/online-iwb/online-iwb.component').then(m=>m.OnlineIWBComponent)
      }
      ,
      {
        path: 'emptyloading',
        loadComponent: () => import('./Outward/empty-loading/empty-loading.component').then(m=>m.EmptyLoadingComponent)
      }
      
    ]
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children:[
      {
        path:'Inward',
         children: [
      {
        path: 'BookDelivery',
        loadComponent: () => import('./Inward/book-delivery/book-delivery.component').then(m=>m.BookDeliveryComponent)
      },
      {
        path: 'EmptyDeclaration',
        loadComponent: () => import('./Inward/empty-declaration/empty-declaration.component').then(m=>m.EmptyDeclarationComponent)
      },
      {
        path: 'SealCutting',
        loadComponent: () => import('./Inward/seal-cutting/seal-cutting.component').then(m=>m.SealCuttingComponent)
      }
      
    ]
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path:'GateActivities',
        children:[
          {
            path:'Outward',
            children:[
                 {
                  path: 'GateInPassOutward',
                  loadComponent: () => import('./GateActivities/Outward/gate-in-pass/gate-in-pass.component').then(m=>m.GateInPassOutwardComponent)
                },
                {
                  path: 'GateOutPassOutward',
                  loadComponent: () => import('./GateActivities/Outward/gate-out-pass/gate-out-pass.component').then(m=>m.GateOutPassOutwardComponent)
                },
                {
                  path: 'JobOrderOutward',
                  loadComponent: () => import('./GateActivities/Outward/job-order/job-order.component').then(m=>m.JobOrderOutwardComponent)
                },
                {
                  path: 'GateInPassStuffingOutward',
                  loadComponent: () => import('./GateActivities/Outward/gate-in-pass-stuffing/gate-in-pass-stuffing.component').then(m=>m.GateInPassStuffingOutwardComponent)
                },
                {
                  path: 'GateOutPassStuffingOutward',
                  loadComponent: () => import('./GateActivities/Outward/gate-out-pass-stuffing/gate-out-pass-stuffing.component').then(m=>m.GateOutPassStuffingOutwardComponent)
                },
                {
                  path: 'GateInPassCargoOutward',
                  loadComponent: () => import('./GateActivities/Outward/gate-incargo/gate-incargo.component').then(m=>m.GateINCargoComponent)
                }
                ,
                {
                  path: 'GateOutPassCargoOutward',
                  loadComponent: () => import('./GateActivities/Outward/gate-outcargo/gate-outcargo.component').then(m=>m.GateOUTCargoComponent)
                }
            ]
          },
          {
            path:'Inward',
            children:[
                {
                  path: 'GateInPassInward',
                  loadComponent: () => import('./GateActivities/Inward/gate-in-pass/gate-in-pass.component').then(m=>m.GateInPassInwardComponent)
                },
                {
                  path: 'GateOutPassInward',
                  loadComponent: () => import('./GateActivities/Inward/gate-out-pass/gate-out-pass.component').then(m=>m.GateOutPassInwardComponent)
                },
                {
                  path: 'JobOrderInward',
                  loadComponent: () => import('./GateActivities/Inward/job-order/job-order.component').then(m=>m.JobOrderInwardComponent)
                },
                {
                  path: 'GateInPassStuffingInward',
                  loadComponent: () => import('./GateActivities/Inward/gate-in-pass-stuffing/gate-in-pass-stuffing.component').then(m=>m.GateInPassStuffingInwardComponent)
                },
                {
                  path: 'GateOutPassStuffingOutward',
                  loadComponent: () => import('./GateActivities/Inward/gate-out-pass-stuffing/gate-out-pass-stuffing.component').then(m=>m.GateOutPassStuffingInwardComponent)
                }
            ]
          }
        ]
      }
      
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'design1',
        loadComponent: () => import('./designs/design1/design1.component').then(m=>m.Design1Component)
      }
      
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      // {
      //   path: 'analytics',
      //   loadComponent: () => import('./demo/dashboard/dash-analytics.component')
      // },
      
      {
        path: 'analytics',
        loadComponent: () => import('./demo/dashboard/dash-analytics.component').then(m=>m.DashAnalyticsComponent)
      },
      {
        path: 'myprofile',
        loadComponent: () => import('./demo/myprofile/myprofile.component').then(m => m.MyprofileComponent)
      },
      {
        path: 'changepswd',
        loadComponent: () => import('./demo/changepassword/changepassword.component').then(m => m.ChangepasswordComponent)
      },
      {
        path: 'pndngIndents',
        loadComponent: () => import('./Indent/pending-indents/pending-indents.component').then(m => m.PendingRequestsComponent)
      },
      {
        path: 'notification',
        loadComponent: () => import('./notification/notification.component').then(m => m.NotificationComponent)
      },
      {
        path: 'notificationex',
        loadComponent: () => import('./notification/notificationexp/notificationexp.component').then(m => m.NotificationexpComponent)
      },
      {
        path: 'chart',
        loadComponent: () => import('./demo/chart-maps/core-apex.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      }
    ]
  }, 
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'successstat',
        loadComponent: () => import('./status/success-popup/success-popup.component').then(m=>m.SuccessPopupComponent)
      },
      {
        path: 'failedstat',
        loadComponent: () => import('./status/failed-popup/failed-popup.component').then(m=>m.FailedPopupComponent)
      },{
        path: 'comnsuccessstat',
        loadComponent: () => import('./status/commonsuccess/commonsuccess.component').then(m=>m.CommonsuccessComponent)
      },
      {
        path: 'comnfailedstat',
        loadComponent: () => import('./status/commonfailed/commonfailed.component').then(m=>m.CommonfailedComponent)
      },
      {
        path: 'loader',
        loadComponent: () => import('./theme/shared/components/loader/loader.component').then(m=>m.LoaderComponent)
      }
      ,
      {
        path: 'paymentFailed',
        loadComponent: () => import('./status/payment/payment-failed/payment-failed.component').then(m=>m.PaymentFailedComponent)
      },
      {
        path: 'paymentsuccess',
        loadComponent: () => import('./status/payment/payment-success/payment-success.component').then(m=>m.PaymentSuccessComponent)
      }
      
      
    ]
  }, 
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'homesuccessstat',
        loadComponent: () => import('./status/homesuccessstat/homesuccessstat.component').then(m=>m.HomesuccessstatComponent)
      },
      {
        path: 'homefailedstat',
        loadComponent: () => import('./status/homefailedstat/homefailedstat.component').then(m=>m.HomefailedstatComponent)
      },
      {
        path: 'loader',
        loadComponent: () => import('./theme/shared/components/loader/loader.component').then(m=>m.LoaderComponent)
      }
      
      
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children:[
      {
        path:'Payment',
         children: [
      {
        path: 'CPDAPayment',
        loadComponent: () => import('./payment/online-pymnt-cpda/online-pymnt-cpda.component').then(m=>m.OnlinePymntCPDAComponent)
      }
      
    ]
      }
    ]
  },
  {
    path: '',
    component: UserAdComponent,
    children: [
      
      {
        path: 'useranalytics',
        loadComponent: () => import('./UserAD/dashboard/dashboard.component')
      },
      {
        path: 'myprofile',
        loadComponent: () => import('./demo/myprofile/myprofile.component').then(m => m.MyprofileComponent)
      },
      {
        path: 'changepswd',
        loadComponent: () => import('./demo/changepassword/changepassword.component').then(m => m.ChangepasswordComponent)
      },
      {
        path: 'pndngIndents',
        loadComponent: () => import('./Indent/pending-indents/pending-indents.component').then(m => m.PendingRequestsComponent)
      },
      {
        path: 'notification',
        loadComponent: () => import('./notification/notification.component').then(m => m.NotificationComponent)
      },
      {
        path: 'notificationex',
        loadComponent: () => import('./notification/notificationexp/notificationexp.component').then(m => m.NotificationexpComponent)
      },
      {
        path: 'chart',
        loadComponent: () => import('./demo/chart-maps/core-apex.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      }
    ]
  },
  {
    path: '',
    component: UserAdComponent,
    children:[
      {
        path:'Approve',
         children: [
      {
        path: 'Approver',
        loadComponent: () => import('./UserAD/maker-checker/maker-checker.component').then(m=>m.MakerCheckerComponent)
      },{
        path:'ChangeRole',
        loadComponent: () => import('./UserAD/Admin/change-role/change-role.component').then(m=>m.ChangeRoleComponent)
      }
      
    ]
      }
    ]
  },
  {
    path: '',
    component: UserAdComponent,
    children:[
      {
        path:'OutwardUser',
        children: [
      
      {
        path: 'SealAllocation',
        loadComponent: () => import('./Outward/seal-allocation/seal-allocation.component').then(m=>m.SealAllocationComponent)
      }
      
    ]
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
