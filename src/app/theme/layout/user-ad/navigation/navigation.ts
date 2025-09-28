export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'Usernavigation',
    title: 'Home',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'Userdashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/useranalytics',
        icon: 'feather icon-home',
        breadcrumbs: false,
      }
    ]
  },
  
  {
    id: 'Admin',
    title: 'Admin',
    type: 'group',
    icon: 'icon-group',
    children: [
      // {
      //   id: 'Approve',
      //   title: 'Approve',
      //   type: 'collapse',
      //   icon: 'feather icon-user',
      //   children: [ 
      //     {
      //       id: 'Approve',
      //       title: 'Approver',
      //       type: 'item',
      //       url: '/Approve/Approver',
      //       breadcrumbs: false
      //     }
          
      //   ]
      // }

      {
        id: 'Approve',
        title: 'Approve',
        type: 'item',
        url: '/Approve/Approver',
        icon: 'feather icon-user',
        breadcrumbs: false,
      },
      {
        id: 'ChangeRole',
        title: 'ChangeRole',
        type: 'item',
        url: '/Approve/ChangeRole',
        icon: 'feather icon-user',
        breadcrumbs: false,
      }
    ]
  },
  {
    id: 'Activities',
    title: 'Activities',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'Outward',
        title: 'Outward',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'sealAllocation',
            title: 'SealAllocation',
            type: 'item',
            url: '/OutwardUser/SealAllocation',
            breadcrumbs: false
          }
          
        ]
      }
    ]
  }
  
];
