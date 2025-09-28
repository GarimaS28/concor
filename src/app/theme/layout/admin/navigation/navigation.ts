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
    id: 'navigation',
    title: 'Home',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/analytics',
        icon: 'feather icon-home',
        breadcrumbs: false,
      }
    ]
  },
  {
    id: 'CustAdmin',
    title: 'Customer',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'CustLocation',
        title: 'Location',
        type: 'collapse',
        icon: 'feather icon-user-plus',
        children: [
          {
            id: 'DebitLocation',
            title: 'Debit Location',
            type: 'item',
            url: '/Location/DebitLocation',
            breadcrumbs: false
          },
          {
            id: 'newLocation',
            title: 'New Location',
            type: 'item',
            url: '/Location/NewLocation',
            breadcrumbs: false
          },
          
         
          
        ]
      },
      {
        id: 'SubTasks',
        title: 'Sub-Tasks',
        type: 'collapse',
        icon: 'feather icon-list',
        children: [
          {
            id: 'SubIDGnertion',
            title: 'Sub-ID Generation',
            type: 'item',
            url: '/SubTasks/SubIdGeneration',
            breadcrumbs: false
          },
          {
            id: 'TaskAllocation',
            title: 'Task Allocation',
            type: 'item',
            url: '/SubTasks/TaskAllocation',
            breadcrumbs: false
          },
          
         
          
        ]
      }
    ]
  },
  {
    id: 'outwardgrid',
    title: 'Outward',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'outward',
        title: 'Outward',
        type: 'collapse',
        icon: 'feather icon-home',
        children: [
          {
            id: 'IndentBooking',
            title: 'Indent',
            type: 'item',
            url: '/Outward/Indent',
            breadcrumbs: false
          },{
            id: 'emptyIndentBooking',
            title: 'empty Indent Booking',
            type: 'item',
            url: '/Outward/emptyloading',
            breadcrumbs: false
          },
          {
            id: 'IndntCncltion',
            title: 'Indent Cancellation',
            type: 'item',
            url: '/Outward/IndentCancellation',
            breadcrumbs: false
          },
          {
            id: 'CtnrALoction',
            title: 'Container Allocation',
            type: 'item',
            url: '/Outward/ContainerAllocation',
            breadcrumbs: false
          },
          {
            id: 'AlotedCtnrCncltion',
            title: 'Alloted Conatiner Cancellation',
            type: 'item',
            url: '/Outward/AllottedContainerCancellation',
            breadcrumbs: false
          },
          {
            id: 'SealALoction',
            title: 'Seal Allocation',
            type: 'item',
            url: '/Outward/modifyIndent',
            breadcrumbs: false
          },
          {
            id: 'FrwdingNote',
            title: 'Forwarding Note',
            type: 'item',
            url: '/Outward/ForwardingNote',
            breadcrumbs: false
          },
          {
            id: 'OnlnIWB',
            title: 'Online IWB',
            type: 'item',
            url: '/Outward/OnlineIWB',
            breadcrumbs: false
          },
          {
            id: 'pendingIndents',
            title: 'pending Indents',
            type: 'item',
            url: '/pndngIndents',
            breadcrumbs: false
          }
          
        ]
      }
    ]
  },
  {
    id: 'Inwardgrid',
    title: 'Inward',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'Inward',
        title: 'Inward',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'BookDlvry',
            title: 'Book Delivery',
            type: 'item',
            url: '/Inward/BookDelivery',
            breadcrumbs: false
          },
          {
            id: 'SealCuting',
            title: 'Seal Cutting',
            type: 'item',
            url: '/Inward/SealCutting',
            breadcrumbs: false
          },
          {
            id: 'emptydclrtion',
            title: 'Empty declaration',
            type: 'item',
            url: '/Inward/EmptyDeclaration',
            breadcrumbs: false
          }
          
        ]
      }
    ]
  },
  {
    id: 'gateActvt',
    title: 'Gate Activities ',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'gateActvtIO',
        title: 'Gate Activities (Party Only)',
        type: 'collapse',
        icon: 'feather icon-menu',
        children: [
          
          {
            id: 'GateActvtOtwd',
            title: 'Outward',
            type: 'collapse',
            children: [
              {
                id: 'GGateInPassOutward',
                title: 'Gate-In Pass',
                type: 'item',
                url: '/GateActivities/Outward/GateInPassOutward',
                external: true,
                 breadcrumbs: false
              },
              {
                id: 'GGateOutPassOutward',
                title: 'Gate-Out Pass',
                type: 'item',
                url: '/GateActivities/Outward/GateOutPassOutward',
                external: true,
                 breadcrumbs: false
              },
              {
                id: 'GJobOrderOutward',
                title: 'Job Order',
                type: 'item',
                url: '/GateActivities/Outward/JobOrderOutward',
                external: true,
                 breadcrumbs: false
              },
              {
                id: 'GGateInPassOutwardFS',
                title: 'Gate-In Pass (Loaded Container After Factory Stuffing)',
                type: 'item',
                url: '/GateActivities/Outward/GateInPassStuffingOutward',
                external: true,
                 breadcrumbs: false
              },
              {
                id: 'GGateOutPassOutwardFS',
                title: 'Gate-Out Pass (Empty Container For Factory Sstuffing)',
                type: 'item',
                url: '/GateActivities/Outward/GateOutPassStuffingOutward',
                external: true,
                 breadcrumbs: false
              },
              {
                id: 'GGateInPassCargoOutward',
                title: 'Gate-In Pass (Cargo)',
                type: 'item',
                url: '/GateActivities/Outward/GateInPassCargoOutward',
                external: true,
                 breadcrumbs: false
              },
              {
                id: 'GGateOutPassCargoOutward',
                title: 'Gate-Out Pass (Cargo)',
                type: 'item',
                url: '/GateActivities/Outward/GateOutPassCargoOutward',
                external: true,
                 breadcrumbs: false
              }
            ]
          },
          {
            id: 'GateActvtInwd',
            title: 'Inward',
            type: 'collapse',
            children: [
              {
                id: 'GGateInPassInward',
                title: 'Gate-In Pass (Trailer/Cargo)',
                type: 'item',
                url: '/GateActivities/Inward/GateInPassInward',
                external: true,
                 breadcrumbs: false
              },
              {
                id: 'GGateOutPassInward',
                title: 'Gate-Out Pass',
                type: 'item',
                url: '/GateActivities/Inward/GateOutPassInward',
                external: true,
                 breadcrumbs: false
              },
              {
                id: 'GJobOrderInward',
                title: 'Job Order',
                type: 'item',
                url: '/GateActivities/Inward/JobOrderInward',
                external: true,
                 breadcrumbs: false
              },
              {
                id: 'GGateInPassInwardFS',
                title: 'Gate-In Pass (For FDS Containers)',
                type: 'item',
                url: '/GateActivities/Inward/GateInPassStuffingInward',
                external: true,
                 breadcrumbs: false
              },
              {
                id: 'GGateOutPassInwardFS',
                title: 'Gate-Out Pass',
                type: 'item',
                url: '/GateActivities/Inward/GateOutPassStuffingOutward',
                external: true,
                 breadcrumbs: false
              }
            ]
          }
        ]
      }
    ]
  },
  
  {
    id: 'payment',
    title: 'Payment',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'OnlinePayment',
        title: 'Payment',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'cpdaPayment',
            title: 'Online Payment in CPDA',
            type: 'item',
            url: '/Payment/CPDAPayment',
            breadcrumbs: false
          }
          
        ]
      }
    ]
  },
 
  {
    id: 'Practice',
    title: 'practice',
    type: 'group',
    icon: 'icon-group',
    children: [
      
      {
        id: 'loader',
        title: 'Chart',
        type: 'item',
        url: '/loader',
        //classes: 'nav-item',
        icon: 'feather icon-pie-chart',
         breadcrumbs: false 
      }
    ]
  },
  
];
