import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService) { }
  selectedUser;
  ngOnInit() {
    window.scrollTo(0, 0);
    this.userService.getUserDetail(this.route.snapshot.params['id'])
    .subscribe((snapshot) => {
      this.selectedUser = snapshot.data();
    });
  }

}
