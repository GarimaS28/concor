import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-indents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-indents.component.html',
  styleUrls: ['./pending-indents.component.scss']
})
export class PendingRequestsComponent implements OnInit {
  constructor(private router: Router) {}

  pendingRequests = [
    {
      name: 'Ramesh Transport',
      date: '2025-07-28',
      consignmentId: 'TICD2509389',
      sttnFrom: 'Mumbai',
      sttnTo: 'Delhi',
      noOfTUEs: 3,
      status: 'Pending'
    },
    {
      name: 'Verma Logistics',
      date: '2025-07-27',
      consignmentId: 'TICD2509401',
      sttnFrom: 'Kanpur',
      sttnTo: 'Kolkata',
      noOfTUEs: 2,
      status: 'Pending'
    },
    {
      name: 'Singh Freightways',
      date: '2025-07-26',
      consignmentId: 'TICD2509402',
      sttnFrom: 'Ludhiana',
      sttnTo: 'Jaipur',
      noOfTUEs: 1,
      status: 'Pending'
    },
    {
      name: 'Kashyap Carriers',
      date: '2025-07-25',
      consignmentId: 'TICD2509403',
      sttnFrom: 'Patna',
      sttnTo: 'Chennai',
      noOfTUEs: 2,
      status: 'Pending'
    },
    {
      name: 'Eastern Movers',
      date: '2025-07-23',
      consignmentId: 'TICD2509404',
      sttnFrom: 'Kolkata',
      sttnTo: 'Hyderabad',
      noOfTUEs: 2,
      status: 'Pending'
    },
    {
      name: 'Sharma Freight Corp',
      date: '2025-07-24',
      consignmentId: 'TICD2509297',
      sttnFrom: 'Jaipur',
      sttnTo: 'Ahmedabad',
      noOfTUEs: 2,
      status: 'Pending'
    },
    {
      name: 'Patel Translines',
      date: '2025-07-22',
      consignmentId: 'TICD2509298',
      sttnFrom: 'Surat',
      sttnTo: 'Nagpur',
      noOfTUEs: 2,
      status: 'Pending'
    },
    {
      name: 'SouthStar Freight',
      date: '2025-07-21',
      consignmentId: 'TICD2509332',
      sttnFrom: 'Chennai',
      sttnTo: 'Bangalore',
      noOfTUEs: 3,
      status: 'Pending'
    },
    {
      name: 'Goel Logistics',
      date: '2025-07-20',
      consignmentId: 'TICD2509301',
      sttnFrom: 'Panipat',
      sttnTo: 'Bhopal',
      noOfTUEs: 5,
      status: 'Pending'
    },
    {
      name: 'Jain Express Movers',
      date: '2025-07-19',
      consignmentId: 'TICD2509302',
      sttnFrom: 'Indore',
      sttnTo: 'Lucknow',
      noOfTUEs: 3,
      status: 'Pending'
    },
    {
      name: 'Royal North Cargo',
      date: '2025-07-18',
      consignmentId: 'TICD2509306',
      sttnFrom: 'Guwahati',
      sttnTo: 'Delhi',
      noOfTUEs: 2,
      status: 'Pending'
    },
    {
      name: 'Bharat Haulage',
      date: '2025-07-17',
      consignmentId: 'TICD2509299',
      sttnFrom: 'Ranchi',
      sttnTo: 'Visakhapatnam',
      noOfTUEs: 3,
      status: 'Pending'
    }
  ];

  //  pendingRequests = [
  //   {
  //     name: 'Ramesh Transport',
  //     state: 'Maharashtra',
  //     sttnFrom: 'Mumbai',
  //     sttnTo: 'Delhi',
  //     dateFrom: '2025-07-28',
  //     dateTo: '2025-07-30',
  //     status: 'Pending',
  //     containers: [
  //       { type: '20ft', size: 'Small', qty: 2 },
  //       { type: '40ft', size: 'Large', qty: 1 }
  //     ]
  //   },
  //   {
  //     name: 'Verma Logistics',
  //     state: 'Uttar Pradesh',
  //     sttnFrom: 'Kanpur',
  //     sttnTo: 'Kolkata',
  //     dateFrom: '2025-07-27',
  //     dateTo: '2025-07-29',
  //     status: 'Pending',
  //     containers: [
  //       { type: '20ft', size: 'Small', qty: 4 },
  //       { type: '40ft', size: 'Large', qty: 2 }
  //     ]
  //   },
  //   {
  //     name: 'Singh Freightways',
  //     state: 'Punjab',
  //     sttnFrom: 'Ludhiana',
  //     sttnTo: 'Jaipur',
  //     dateFrom: '2025-07-26',
  //     dateTo: '2025-07-28',
  //     status: 'Approved',
  //     containers: [
  //       { type: '20ft', size: 'Small', qty: 3 }
  //     ]
  //   },
  //   {
  //     name: 'Kashyap Carriers',
  //     state: 'Bihar',
  //     sttnFrom: 'Patna',
  //     sttnTo: 'Chennai',
  //     dateFrom: '2025-07-25',
  //     dateTo: '2025-07-27',
  //     status: 'Pending',
  //     containers: [
  //       { type: '40ft', size: 'Large', qty: 2 },
  //       { type: '20ft', size: 'Small', qty: 1 }
  //     ]
  //   },
  //   {
  //     name: 'Eastern Movers',
  //     state: 'West Bengal',
  //     sttnFrom: 'Kolkata',
  //     sttnTo: 'Hyderabad',
  //     dateFrom: '2025-07-23',
  //     dateTo: '2025-07-25',
  //     status: 'Approved',
  //     containers: [
  //       { type: '20ft', size: 'Small', qty: 5 }
  //     ]
  //   },
  //   {
  //     name: 'Sharma Freight Corp',
  //     state: 'Rajasthan',
  //     sttnFrom: 'Jaipur',
  //     sttnTo: 'Ahmedabad',
  //     dateFrom: '2025-07-24',
  //     dateTo: '2025-07-26',
  //     status: 'Pending',
  //     containers: [
  //       { type: '40ft', size: 'Large', qty: 3 }
  //     ]
  //   },
  //   {
  //     name: 'Patel Translines',
  //     state: 'Gujarat',
  //     sttnFrom: 'Surat',
  //     sttnTo: 'Nagpur',
  //     dateFrom: '2025-07-22',
  //     dateTo: '2025-07-24',
  //     status: 'Pending',
  //     containers: [
  //       { type: '20ft', size: 'Small', qty: 2 }
  //     ]
  //   },
  //   {
  //     name: 'SouthStar Freight',
  //     state: 'Tamil Nadu',
  //     sttnFrom: 'Chennai',
  //     sttnTo: 'Bangalore',
  //     dateFrom: '2025-07-21',
  //     dateTo: '2025-07-23',
  //     status: 'Pending',
  //     containers: [
  //       { type: '40ft', size: 'Large', qty: 2 },
  //       { type: '20ft', size: 'Small', qty: 2 }
  //     ]
  //   },
  //   {
  //     name: 'Goel Logistics',
  //     state: 'Haryana',
  //     sttnFrom: 'Panipat',
  //     sttnTo: 'Bhopal',
  //     dateFrom: '2025-07-20',
  //     dateTo: '2025-07-22',
  //     status: 'Approved',
  //     containers: [
  //       { type: '20ft', size: 'Small', qty: 3 }
  //     ]
  //   },
  //   {
  //     name: 'Jain Express Movers',
  //     state: 'Madhya Pradesh',
  //     sttnFrom: 'Indore',
  //     sttnTo: 'Lucknow',
  //     dateFrom: '2025-07-19',
  //     dateTo: '2025-07-21',
  //     status: 'Pending',
  //     containers: [
  //       { type: '40ft', size: 'Large', qty: 1 }
  //     ]
  //   },
  //   {
  //     name: 'Royal North Cargo',
  //     state: 'Assam',
  //     sttnFrom: 'Guwahati',
  //     sttnTo: 'Delhi',
  //     dateFrom: '2025-07-18',
  //     dateTo: '2025-07-20',
  //     status: 'Pending',
  //     containers: [
  //       { type: '20ft', size: 'Small', qty: 4 }
  //     ]
  //   },
  //   {
  //     name: 'Bharat Haulage',
  //     state: 'Jharkhand',
  //     sttnFrom: 'Ranchi',
  //     sttnTo: 'Visakhapatnam',
  //     dateFrom: '2025-07-17',
  //     dateTo: '2025-07-19',
  //     status: 'Pending',
  //     containers: [
  //       { type: '40ft', size: 'Large', qty: 2 },
  //       { type: '20ft', size: 'Small', qty: 1 }
  //     ]
  //   }
  // ];

  dateFrom: string | null = null;
  dateTo: string | null = null;

  filteredRequests: any[] = [];
  selectedRequest: any = null;
  selectedFilter: 'all' | 'pending' | 'approved' | 'cancelled' = 'all';

  searchTerm: string = '';

  ngOnInit() {
    this.filterRequests('all');
  }

  onDateFromChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dateFrom = input.value;
  }

  // 📅 Capture To Date
  onDateToChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dateTo = input.value;
  }

  // 🔘 Apply all filters (status + name + date)
  applyDateFilter() {
    this.filterRequests(this.selectedFilter);
  }

  openModifyModal(request: any) {
    this.selectedRequest = request;
    const modal: any = document.getElementById('modifyModal');
    if (modal) modal.style.display = 'block';
  }

  closeModal() {
    const modal: any = document.getElementById('modifyModal');
    if (modal) modal.style.display = 'none';
  }

  filterRequests(status: 'all' | 'pending' | 'approved' | 'cancelled' = 'all'): void {
    this.selectedFilter = status;

    let list: any[] = [];
    if (status === 'all') {
      list = this.pendingRequests;
    } else {
      list = this.pendingRequests.filter((req) => req.status?.toLowerCase() === status);
    }

    // 🔍 Apply name search
    if (this.searchTerm.trim() !== '') {
      list = list.filter((req) => req.name?.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

    // 📅 Apply date filter
    const fromDate = this.dateFrom ? new Date(this.dateFrom) : null;
    const toDate = this.dateTo ? new Date(this.dateTo) : null;

    if (fromDate || toDate) {
      list = list.filter((item) => {
        const itemFrom = new Date(item.dateFrom);
        const itemTo = new Date(item.dateTo);

        if (fromDate && toDate) {
          return itemFrom >= fromDate && itemTo <= toDate;
        } else if (fromDate) {
          return itemTo >= fromDate;
        } else if (toDate) {
          return itemFrom <= toDate;
        }
        return true;
      });
    }

    this.filteredRequests = list;
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value || '';
    this.filterRequests(this.selectedFilter);
  }

  dateFromFocus = false;
  dateToFocus = false;
  dateFromValue: string = '';
  dateToValue: string = '';

  onDatefromChange(event: any) {
    this.dateFromValue = event.target.value;
  }

  onDatetoChange(event: any) {
    this.dateToValue = event.target.value;
  }

  // 🔘 Add variable for search mode
  searchMode: 'name' | 'date' | null = null;

  // 🔘 Function to set mode when radio button changes
  setSearchMode(mode: 'name' | 'date') {
    this.searchMode = mode;
    // reset search term or dates if switching modes
    if (mode === 'name') {
      this.dateFromValue = '';
      this.dateToValue = '';
      this.dateFrom = null;
      this.dateTo = null;
    } else if (mode === 'date') {
      this.searchTerm = '';
    }
  }

  // Existing search functions remain the same
  onsearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value || '';
    this.filterRequests(this.selectedFilter);
  }

  applydateFilter() {
    this.selectedFilter = this.selectedFilter || 'all';

    let list: any[] = [];

    // Filter by status
    if (this.selectedFilter === 'all') {
      list = this.pendingRequests;
    } else {
      list = this.pendingRequests.filter((req) => req.status?.toLowerCase() === this.selectedFilter);
    }

    // Filter by date
    const fromDate = this.dateFromValue ? new Date(this.dateFromValue) : null;
    const toDate = this.dateToValue ? new Date(this.dateToValue) : null;

    if (fromDate || toDate) {
      list = list.filter((item) => {
        const itemFrom = new Date(item.dateFrom);
        const itemTo = new Date(item.dateTo);

        if (fromDate && toDate) {
          return itemFrom >= fromDate && itemTo <= toDate;
        } else if (fromDate) {
          return itemTo >= fromDate;
        } else if (toDate) {
          return itemFrom <= toDate;
        }
        return true;
      });
    }

    this.filteredRequests = list;
  }

  onDateffromChange(event: any) {
    this.dateFromValue = event.target.value; // store selected date
  }

  onDatettoChange(event: any) {
    this.dateToValue = event.target.value; // store selected date
  }

  // On blur
  onDateFromBlur() {
    this.dateFromFocus = false;
    // keep the value displayed if user selected date
    if (!this.dateFromValue) {
      this.dateFromValue = '';
    }
  }

  onDateToBlur() {
    this.dateToFocus = false;
    if (!this.dateToValue) {
      this.dateToValue = '';
    }
  }

  goToModify(req: any) {
    this.router.navigate(['/modifyIndent']); // navigate to new component with id
  }
}
