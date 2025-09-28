import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Notification {
  id: number;
  sender: string;
  message: string;
  time: string;
  type: 'file' | 'task' | 'comment';
  read: boolean;
  selected: boolean;
  avatar: string;
  images?: { url: string; title: string; size: string }[];
}

@Component({
  selector: 'app-notificationexp',
  standalone: true,
  imports: [CommonModule, FormsModule],  // ✅ ngModel + ngClass enable
  templateUrl: './notificationexp.component.html',
  styleUrls: ['./notificationexp.component.scss']
})
export class NotificationexpComponent {
  notifications: Notification[] = [
  {
    id: 1,
    sender: 'Eddie',
    message: 'Uploaded new files for project update and review. Lorem Ipsum dummy text for testing.',
    type: 'file',
    time: '2 hours ago',
    read: false,
    selected: false,
    avatar: 'https://i.pravatar.cc/40?img=1',
    images: [
      { url: 'https://via.placeholder.com/150/92c952', title: 'Old Scooter', size: 'PNG - 100KB' },
      { url: 'https://via.placeholder.com/150/771796', title: 'Wall Art', size: 'PNG - 150KB' }
    ]
  },
  {
    id: 2,
    sender: 'Sarah',
    message: 'Marked pending review task for approval check. Please check the latest updates.',
    type: 'task',
    time: '3 hours ago',
    read: false,
    selected: false,
    avatar: 'https://i.pravatar.cc/40?img=2'
  },
  {
    id: 3,
    sender: 'Abhishek',
    message: 'Posted a task: Design new homepage and wireframes for client presentation.',
    type: 'comment',
    time: '6 hours ago',
    read: false,
    selected: false,
    avatar: 'https://i.pravatar.cc/40?img=3'
  },
  {
    id: 4,
    sender: 'John',
    message: 'Uploaded customer feedback document for review. Kindly verify before next meeting.',
    type: 'file',
    time: '7 hours ago',
    read: false,
    selected: false,
    avatar: 'https://i.pravatar.cc/40?img=4'
  },
  {
    id: 5,
    sender: 'Alex',
    message: 'Created new sprint board for project planning and task assignment. Review please.',
    type: 'task',
    time: '10 hours ago',
    read: false,
    selected: false,
    avatar: 'https://i.pravatar.cc/40?img=5'
  },
  {
    id: 6,
    sender: 'Ravi',
    message: 'Completed UI design for dashboard and pushed changes for review.',
    type: 'comment',
    time: '12 hours ago',
    read: false,
    selected: false,
    avatar: 'https://i.pravatar.cc/40?img=6',
    images: [
      { url: 'https://via.placeholder.com/150/24f355', title: 'Dashboard UI', size: 'JPG - 200KB' }
    ]
  },
  {
    id: 7,
    sender: 'Priya',
    message: 'Uploaded financial report for Q2 performance review and forecasting.',
    type: 'file',
    time: '14 hours ago',
    read: false,
    selected: false,
    avatar: 'https://i.pravatar.cc/40?img=7'
  },
  {
    id: 8,
    sender: 'Amit',
    message: 'Shared meeting notes for the product launch discussion. Please confirm.',
    type: 'task',
    time: '16 hours ago',
    read: false,
    selected: false,
    avatar: 'https://i.pravatar.cc/40?img=8'
  },
  {
    id: 9,
    sender: 'Sneha',
    message: 'Posted feedback on wireframes and suggested improvements for homepage.',
    type: 'comment',
    time: '18 hours ago',
    read: false,
    selected: false,
    avatar: 'https://i.pravatar.cc/40?img=9'
  },
  {
    id: 10,
    sender: 'Raj',
    message: 'Uploaded sales data for analysis and review before quarterly meeting.',
    type: 'file',
    time: '20 hours ago',
    read: false,
    selected: false,
    avatar: 'https://i.pravatar.cc/40?img=10'
  }
];


  currentPage = 0;
  pageSize = 7; // ✅ ek page pe 7 notifications
  expandedId: number | null = null;

  get paginatedNotifications() {
    const start = this.currentPage * this.pageSize;
    return this.notifications.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.notifications.length / this.pageSize);
  }

  toggleExpand(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }

  hasSelected(): boolean {
    return this.notifications.some(n => n.selected);
  }

  selectedAreAllRead(): boolean {
    return this.notifications.filter(n => n.selected).every(n => n.read);
  }

  markAsRead() {
    this.notifications.forEach(n => {
      if (n.selected) {
        n.read = true;
        n.selected = false;
      }
    });
  }

  markAsUnread() {
    this.notifications.forEach(n => {
      if (n.selected) {
        n.read = false;
        n.selected = false;
      }
    });
  }
  // Dynamic label
get actionButtonLabel(): string {
  if (!this.hasSelected()) return 'Mark as Read'; 
  return this.selectedAreAllRead() ? 'Mark as Unread' : 'Mark as Read';
}

// Single toggle method
toggleReadUnread() {
  if (this.selectedAreAllRead()) {
    this.markAsUnread();   // agar sab selected read hain -> unread kar do
  } else {
    this.markAsRead();     // warna -> read kar do
  }
}


  deleteSelected() {
    this.notifications = this.notifications.filter(n => !n.selected);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 0) this.currentPage--;
  }
}
