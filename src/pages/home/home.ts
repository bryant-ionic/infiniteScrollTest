import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users = [];
  page = 0;
  maximumPages = 4;

  constructor(public navCtrl: NavController, private httpClient: HttpClient) {
    console.log("Getting users")
    this.loadUsers();
  }

  loadUsers(infiniteScroll?) {
    this.httpClient.get(`https://randomuser.me/api/?results=20&page=${this.page}`)
    .subscribe( res => {
      this.users = this.users.concat(res['results']);

      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    });
  }

  loadMore(infiniteScroll) {
    this.page++;
    this.loadUsers(infiniteScroll);

    if (this.page === this.maximumPages) {
      infiniteScroll.enable(false);
    }
  }

}
