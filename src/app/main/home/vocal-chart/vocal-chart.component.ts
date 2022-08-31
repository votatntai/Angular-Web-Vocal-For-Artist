import { ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexStroke, ApexFill } from "ng-apexcharts";
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { SecondToHourPipe } from "src/app/pipes/time.pipe";
import { VocalService } from "src/app/services/vocal.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  stroke: ApexStroke;
  fill: ApexFill;
};

@Component({
  selector: 'app-vocal-chart',
  templateUrl: './vocal-chart.component.html',
  styleUrls: ['./vocal-chart.component.css']
})
export class VocalChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;

  public chartOptions: Partial<ChartOptions> | any;

  private pageSize: number = 10;
  private pageNumber: number = 1;
  loading: boolean = true;
  vocals: any[] = [];
  chartData: any = {
    labels: [],
    series: []
  };

  constructor(private service: VocalService, private time: SecondToHourPipe) {
    this.chartOptions = {
      chart: {
        type: "polarArea"
      },
      stroke: {
        colors: ["#fff"]
      },
      fill: {
        opacity: 0.8
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.getArtistVocal();
  }

  getArtistVocal() {
    this.service.getArtistVocal(this.pageNumber, this.pageSize).subscribe(result => {
      this.vocals = result.body!['data']['voices']
      var labels: string[] = []
      var series: number[] = []
      this.vocals.forEach(vocal => {
        var name: string = vocal.name
        if (name.length > 10) {
          name = name.slice(0, 10) + " ..."
        }
        labels.push(name + " - " + this.time.transform(vocal.listeningTime))
        series.push(vocal.listeningTime)
      })
      this.chartData.labels = labels
      this.chartData.series = series
      this.loading = false
    })
  }

}
