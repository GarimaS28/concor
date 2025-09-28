
  import { Component, OnInit } from '@angular/core';
  import { CustomerDashboardserviceService } from 'src/app/services/customerdashboardservice.service';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTitleSubtitle, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: string[];
  plotOptions: ApexPlotOptions;
};

export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  responsive: ApexResponsive[];
};

interface BookingData {
  CNSG_DATE: string;
  NOOF_BOOKING: string;
  EBOOK_FLAG: string;
}

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  colors: string[];
  legend: ApexLegend;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-dash-analytics',
  imports: [CommonModule, ChartComponent],
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export class DashAnalyticsComponent implements OnInit {
  public activitiesChartOptions!: ChartOptions;
  public pieChartOptions!: PieChartOptions;
  public donutChartOptions!: DonutChartOptions;
  public barChartOptions!: BarChartOptions;

  noOfRegn: number | null = null;

  activeCust: number = 0;
  totalCust: number = 0;

  makerCount = 0;
  checkerCount = 0;

  constructor(private CustomerDashboardserviceService: CustomerDashboardserviceService) {}

  ngOnInit(): void {
    this.fetchBookingData();
    this.loadTaskPerformance();
    this.loadContainerInventory();
    this.loadLastFourWeekColl();
    this.fetchData();
    this.fetchactiveData();
    this.fetchMakerCheckerData();
  }

  fetchBookingData() {
    this.CustomerDashboardserviceService.getDashboardBookingData().subscribe({
      next: (res: any) => {
        const data: BookingData[] = res.result.jsonRequestData;

        // Get unique dates for last 30 days sorted
        const dates = Array.from(new Set(data.map(d => d.CNSG_DATE))).sort(
          (a, b) => new Date(a.split('-').reverse().join('-')).getTime() - new Date(b.split('-').reverse().join('-')).getTime()
        );

        // Prepare E-Booking series
        const ebookSeries = dates.map(date =>
          data
            .filter(d => d.CNSG_DATE === date && d.EBOOK_FLAG === 'Y')
            .reduce((sum, b) => sum + Number(b.NOOF_BOOKING), 0)
        );

        // Prepare Normal Booking series
        const normalSeries = dates.map(date =>
          data
            .filter(d => d.CNSG_DATE === date && d.EBOOK_FLAG === 'N')
            .reduce((sum, b) => sum + Number(b.NOOF_BOOKING), 0)
        );

        // Set chart options
        this.activitiesChartOptions = {
          series: [
            { name: 'E-Booking', data: ebookSeries },
            { name: 'Normal Booking', data: normalSeries }
          ],
          chart: {
            type: 'bar',
            height: 350,
            stacked: false
          },
          xaxis: {
            categories: dates,
            labels: { rotate: -45 }
          },
          colors: ['#0d6efd', '#198754'],
          dataLabels: { enabled: true },
          title: {
            text: 'Customer Bookings Over Last 30 Days',
            align: 'center',
            style: { fontSize: '16px', fontWeight: 'bold' }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '50%',
              //endingShape: 'rounded'
            }
          }
        };
      },
      error: err => console.error(err)
    });
  }

  loadTaskPerformance() {
    this.CustomerDashboardserviceService.getTaskPerformance().subscribe({
      next: (res: any) => {
        const data = res.result.jsonRequestData;

        const series = data.map((d: { NOOFTASK_PERF: any; }) => Number(d.NOOFTASK_PERF));
        const labels = data.map((d: { TASK_CODE: any; }) => d.TASK_CODE);

        this.pieChartOptions = {
          series: series,
          chart: { type: 'pie', height: 350 },
          labels: labels,
          dataLabels: { enabled: true },
          title: { text: 'Task Performance', align: 'center', style: { fontSize: '16px', fontWeight: 'bold' } },
          legend: { position: 'bottom' }
        };
      },
      error: err => console.error(err)
    });
  }

  loadContainerInventory() {
    this.CustomerDashboardserviceService.getContainerInventory().subscribe({
      next: (res: any) => {
        const data = res.result.jsonRequestData;

        const series = data.map((d: { TUES: any; }) => Number(d.TUES));
        const labels = data.map((d: { TRMN_CODE: any; }) => d.TRMN_CODE);

        this.donutChartOptions = {
          series: series,
          chart: { type: 'donut', height: 350 },
          labels: labels,
          dataLabels: { enabled: true },
          title: { text: 'Container Inventory', align: 'center', style: { fontSize: '16px', fontWeight: 'bold' } },
          legend: { position: 'bottom' },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: { width: 300 },
                legend: { position: 'bottom' }
              }
            }
          ]
        };
      },
      error: err => console.error(err)
    });
  }

  loadLastFourWeekColl() {
    this.CustomerDashboardserviceService.getLastFourWeekCollection().subscribe({
      next: (res: any) => {
        const data = res.result.jsonRequestData;

        const categories = data.map((d: { WEEK_STARTDATE: any; }) => d.WEEK_STARTDATE);
        const amounts = data.map((d: { TOTAL_AMOUNT: any; }) => Number(d.TOTAL_AMOUNT));

        this.barChartOptions = {
          series: [
            {
              name: 'Weekly Collection',
              data: amounts
            }
          ],
          chart: { type: 'bar', height: 350 },
          xaxis: { categories: categories },
          colors: ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1'], // 5 different colors
          plotOptions: {
            bar: {
              columnWidth: '55%',
              distributed: true, // <--- ensures each bar has a different color
              borderRadius: 5
            }
          },
          dataLabels: { enabled: true },
          title: {
            text: 'Last Four Weeks Collection',
            align: 'center',
            style: { fontSize: '16px', fontWeight: 'bold' }
          },
          legend: { show: false }, // not needed since colors are per bar
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: { width: 300 },
                xaxis: { labels: { rotate: -45 } }
              }
            }
          ]
        };
      },
      error: err => console.error(err)
    });
  }

  fetchData() {
    const payload = { p_trmncode: 'TICD' }; // 👈 API input
    this.CustomerDashboardserviceService.getData(payload).subscribe(res => {
      this.noOfRegn = res.result?.jsonRequestData?.[0]?.NOOF_REGN || 0;
    });
  }

  fetchactiveData() {
    const payload = { p_trmncode: 'TICD' };
    this.CustomerDashboardserviceService.getactiveData(payload).subscribe(res => {
      const data = res.result?.jsonRequestData || [];
      this.activeCust = data.find((d: any) => d.CUST_TYPE === 'ACTIVE_CUST')?.NOOF_USER || 0;
      this.totalCust = data.find((d: any) => d.CUST_TYPE === 'TOTAL_CUST')?.NOOF_USER || 0;
    });
  }

  
  fetchMakerCheckerData() {
    const payload = { p_trmncode: 'TICD' };
    this.CustomerDashboardserviceService.getMakerCheckerData(payload)
      .subscribe(res => {
        const data = res.result?.jsonRequestData || [];
        this.makerCount = data.find((d: any) => d.STATUS === 'MAKER')?.NOOF_REQUEST || 0;
        this.checkerCount = data.find((d: any) => d.STATUS === 'CHECKER')?.NOOF_REQUEST || 0;
      });
  }

  
}
