import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from 'src/app/models/artist.model';
import { User } from 'src/app/models/user.model';
import { ArtistService } from 'src/app/services/artist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  artist: Artist = {
    id: '', username: '', firstName: '', lastName: '', avatar: '', email: '', phone: '', bio: '', gender: '',
    studio: false, price: 0, rate: 0, status: '', countries: [], voiceStyles: [], voiceDemos: [], bankName: '', bankAccountNumber: '', bankAccountOwner: '', bankBranch: ''
  };

  defaultAvatar: string = environment.defaultAvatar;

  balance: number = 0;

  constructor(private router: Router, private artistService: ArtistService) { }

  ngOnInit(): void {
    this.getArtistInfo();
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

  getBalance() {
    this.artistService.getBalanceGlobal().subscribe(result => {
      this.balance = result;
    })
    this.artistService.getBalance().subscribe(result => {
      var balance: number = result.body!;
      this.artistService.setBalanceGlobal(balance);
    })
  }

  signOut() {
    localStorage.removeItem("USER");
    this.router.navigate(['']);
  }

}
