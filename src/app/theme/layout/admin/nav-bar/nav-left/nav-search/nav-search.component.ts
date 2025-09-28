// angular import
import { Component,OnInit } from '@angular/core';
import { AboutusComponent } from 'src/app/demo/aboutus/aboutus.component';
import { FAQComponent } from 'src/app/demo/faq/faq.component';
import { ContactusComponent } from 'src/app/demo/contactus/contactus.component';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Router,Route } from '@angular/router';
import { getAdminRoutes } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-nav-search',
  imports: [SharedModule,FormsModule],
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent {
  searchOn: boolean = false;
  searchQuery: string = '';

  // Define routes for components
  // components = [
  //   { name: 'Allotment', route: '/allotment' },
  //   { name: 'About', route: '/About' },
  //   { name: 'Contact', route: '/Contact' },
  //   { name: 'Faq', route: '/FAQ' },
  //   { name: 'Notification', route: '/notification' },
  //   { name: 'Home', route: '/analytics' }
  // ];

  components: { name: string, route: string }[] = [];

  filteredComponents: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Load routes from router config
    //this.loadRoutes();
    this.components=getAdminRoutes();
  }

  // Dynamically fetch route paths and components
  loadRoutes() {
    this.components = this.router.config
      .filter(route => route.path && route.component) // filter routes with path and component
      .map((route: Route) => ({
        name: this.getFriendlyName(route.component),
        route: '/' + route.path
      }));
  }

  getFriendlyName(component: any): string {
    const name = component.name;
    // Remove 'Component' from the name and capitalize first letter
    return name.replace('Component', '').replace(/([A-Z])/g, ' $1').trim();
  }

  // Filter the list based on the search input
  // filterComponents() {
  //   if (this.searchQuery.trim()) {
  //     this.filteredComponents = this.components.filter(comp =>
  //       comp.name.toLowerCase().includes(this.searchQuery.toLowerCase())
  //     );
  //   } else {
  //     this.filteredComponents = [];
  //   }
  // }

  filterComponents() {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredComponents = query
      ? this.components.filter(comp =>
          comp.name.toLowerCase().includes(query)
        )
      : [];
  }

  // Navigate to the selected component
  navigateToComponent(route: string) {
    this.router.navigate([route]);
    this.closeSearch();
  }

  // Handle Enter key press
  handleEnterKey() {
    const matchedComponent = this.components.find(comp => 
      comp.name.toLowerCase() === this.searchQuery.toLowerCase()
    );

    if (matchedComponent) {
      this.navigateToComponent(matchedComponent.route);
    }
  }

  // Close search after navigation
  closeSearch() {
    this.searchOn = false;
    this.searchQuery = '';
    this.filteredComponents = [];
  }
}
