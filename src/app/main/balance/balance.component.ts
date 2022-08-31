import { Component, OnInit, ViewChild } from '@angular/core';
import { Artist, YearSalary } from 'src/app/models/artist.model';
import { User } from 'src/app/models/user.model';
import { ArtistService } from 'src/app/services/artist.service';
import { environment } from 'src/environments/environment';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTooltip, ApexStroke } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  salary: YearSalary;
  artist: Artist = {
    id: '', username: '', firstName: '', lastName: '', avatar: '', email: '', phone: '', bio: '', gender: '',
    studio: false, price: 0, rate: 0, status: '', countries: [], voiceStyles: [], voiceDemos: [], bankName: '', bankAccountNumber: '', bankAccountOwner: '', bankBranch: ''
  };
  defaultAvatar: string = environment.defaultAvatar;
  balance: number = 0;
  loading: boolean = false;

  constructor(private artistService: ArtistService) {
    this.chartOptions = {
      series: [
        {
          name: "Tổng doanh thu",
          data: [0, 0, 0, 0, 0, 2245682, 4325415, 1547812, 0, 0, 0, 0]
        }
      ],
      chart: {
        height: 300,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: ["2022-01", "2022-02", "2022-03", "2022-04", "2022-05", "2022-06",
          "2022-07", "2022-08", "2022-09", "2022-10", "2022-11", "2022-12"]
      },
      tooltip: {
        x: {
          format: "MM/yy"
        }
      }
    };
  }

  ngOnInit(): void {
    this.getArtistInfo();
    this.getYearSalary();
    this.getBalance();
  }

  getArtistInfo() {
    this.artistService.getArtistGlobal().subscribe(result => {
      this.artist = result;
    })
    var data = localStorage.getItem('USER');
    if (data) {
      var user: User = JSON.parse(data);
      this.artistService.getArtistInfo(user.id).subscribe(result => {
        if (result.body !== null) {
          this.artistService.setArtistGlobal(result.body);
        }
      }, error => {
        console.log(error);
      })
    }
  }

  getYearSalary() {
    var currentYear: number = new Date().getFullYear();
    this.artistService.getYearSalary(currentYear).subscribe(result => {
      this.salary = result.body!["data"];
      // console.log(this.salary);
      // var data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      // this.salary.monthlyRevenues.forEach(revenues => {
      //   var index = parseInt(revenues.date.split('/')[0]);
      //   console.log(index);
      //   data = data.splice(0, index, revenues.total);
      // })
      // console.log(data);
      // this.chartOptions.series[0].data = data;
    })
  }

  getBalance() {
    this.artistService.getBalanceGlobal().subscribe(result => {
      this.balance = result
    })
    this.artistService.getBalance().subscribe(result => {
      var balance: number = result.body!;
      this.artistService.setBalanceGlobal(balance);
      this.loading = true;
    })
  }

}
