import { ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexPlotOptions, ApexGrid } from "ng-apexcharts";
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { VocalService } from "src/app/services/vocal.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  grid: ApexGrid
};

@Component({
  selector: 'app-project-chart',
  templateUrl: './project-chart.component.html',
  styleUrls: ['./project-chart.component.css']
})
export class ProjectChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;

  public chartOptions: Partial<ChartOptions> | any;

  loading: boolean = true;
  chartData: any = {
    labels: [],
    series: []
  };

  constructor(private service: VocalService) {
    this.chartOptions = {
      chart: {
        type: "donut"
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      responsive: [
        {
          breakpoint: 2048,
          options: {
            legend: {
              position: 'bottom'
            },
            grid: {
              padding: {
                bottom: -250
              }
            }
          },
        },
        {
          breakpoint: 1600,
          options: {
            legend: {
              position: 'bottom'
            },
            grid: {
              padding: {
                bottom: -80
              }
            }
          },
        }
      ]
    };
  }

  ngOnInit(): void {
    this.getArtistProject();
  }

  getArtistProject() {
    this.service.getArtistProject().subscribe(result => {
      var project = result.body!['data']
      this.chartData.labels = ['Đã tham gia', 'Đã hoàn thành', 'Chờ xác nhận', 'Đã từ chối']
      this.chartData.series = [project.totalAcceptProject, project.totalDoneProject, project.totalPendingProject, project.totalDenyProject]
      this.loading = false
    })
  }

}
