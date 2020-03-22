import { Component, OnInit, OnChanges } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { NgForm } from '@angular/forms';
import { WhatsappMessageService } from '../services/whatsapp-message.service';
import { UserService } from '../services/user.service';
import { UserActivityService } from '../services/user-activity.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.scss']
})
export class AdminConsoleComponent implements OnInit {

  // Slider
  value = [30, 50];
  salaryValue = [10000, 30000];
  enabled = true;
  users;
  searchParam = '';
  phoneNumber = '';
  currentUserSearchParam;
  currentUserPossiblities = [];
  currentUser;

  // Dropdown
  optionsModel: number[];
  myOptions: IMultiSelectOption[];
  mySettings: IMultiSelectSettings = {
    enableSearch: false,
    buttonClasses: 'btn btn-default btn-block w-100',
    dynamicTitleMaxItems: 2,
    displayAllSelectedText: false
  };

  userSelected;
  userWhatsappNumber;
  // usersToSendWhatsappMessage = [];
  formInstace: NgForm;
  showConfirmMessageDialog = false;

  constructor(
    private userService: UserService,
    private db: AngularFirestore,
    private userActivityService: UserActivityService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.myOptions = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id: 3, name: 'Option 3' },
      { id: 5, name: 'Option 5' },
      { id: 4, name: 'Option 4' }
    ];
    this.userService.getUsers().subscribe((snaps: any[]) => {
      this.users = snaps.map(snap => {
        return {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data()
        };
      });
    });
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  onChange(event) {
  }

  getUsers = () => {
    this.userService.getUsers().subscribe((snaps: any[]) => {
      this.users = snaps.map(snap => {
        return {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data()
        };
      });
    });
  }

  applyFilter = (form: NgForm) => {
    this.userService.getUsers().subscribe((snaps: any[]) => {
      this.users = snaps.map(snap => {
        return {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data()
        };
      });
      // tslint:disable-next-line:max-line-length
      this.users = this.getDataWithinLimit(this.getDataWithinLimit(this.users, this.value[0], this.value[1], 'age'), this.salaryValue[0] * 12, this.salaryValue[1] * 12, 'salary');
    });
  }

  searchUser = (param) => {
    const searchedUsers = [];
    this.userService.getUsers().subscribe((snaps: any[]) => {
      this.users = snaps.map(snap => {
        return {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data()
        };
      });
      this.users.forEach(user => {
        if (user.name.toLowerCase().includes(param) || user.smid.toString().includes(param)) {
          searchedUsers.push(user);
        }
      });
      this.users = searchedUsers;
    });
  }

  selectedUser = (user) => {
    this.userSelected = user;
    this.userWhatsappNumber = this.currentUser && this.currentUser.whatsapp_number_primary ||
                              this.currentUser.whatsapp_number_secondary ||
                              this.currentUser.phone_number ||
                              this.currentUser.phone_number_secondary;
  }

  sendDetails = () => {
    // check whether the from id and to id syncs with in the matches table
    // if yes, do not update a record in matches table and do not create in user_Activity
    // console.log('userWhatsappNumber', this.userWhatsappNumber, this.userSelected);
    const searchObject = {
      user_profile_id: this.currentUser.id,
      partner_profile_id: this.userSelected.id,
      status: 'notified',
      type: 'relation_status',

    };
    return this.userActivityService.checkUserNotified(searchObject)
    .subscribe((snaps) => {
      if (snaps && snaps.length) {
        this.showConfirmMessageDialog = true;
        console.log(snaps);
      } else {
        const matchObject = {
          user_profile: this.currentUser,
          partner_profile: this.userSelected,
          user_profile_id: this.currentUser.id,
          partner_profile_id: this.userSelected.id,
          status: 'notified',
          type: 'relation_status',
          created_at: new Date(),
          Updated_at: new Date()
        };
        Promise.all([
          this.userActivityService.addUserActivity(matchObject),
          this.userActivityService.addUserRelation(matchObject)
        ]).then((res) => {
          console.log(res);
        });
      }
    });
  }

  resendProfile = () => {
    const matchObject = {
      user_profile: this.currentUser,
      partner_profile: this.userSelected,
      user_profile_id: this.currentUser.id,
      partner_profile_id: this.userSelected.id,
      status: 'notified',
      type: 'relation_status',
      created_at: new Date(),
      Updated_at: new Date()
    };
    this.userActivityService.addUserActivity(matchObject)
    .then((res) => {
      console.log('resresres', res);
    });
  }

  checkCurrentUser = (form: NgForm) => {
    this.formInstace = form;
    const currentUsers = [];
    this.userService.getUsers().subscribe((snaps: any[]) => {
      this.users = snaps.map(snap => {
        return {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data()
        };
      });
      this.users.forEach(user => {
        if (user.name.toLowerCase().includes(this.currentUserSearchParam.toLowerCase()) ||
            user.smid.toString().includes(this.currentUserSearchParam) ||
            user.phone_number == this.currentUserSearchParam ||
            user.phone_number_secondary == this.currentUserSearchParam ||
            user.whatsapp_number_primary == this.currentUserSearchParam ||
            user.whatsapp_number_secondary == this.currentUserSearchParam
        ) {
          currentUsers.push(user);
        }
      });
      this.currentUserPossiblities = currentUsers;
      if (currentUsers.length === 1) {
        this.formInstace.resetForm();
        sessionStorage.setItem('currentUser', JSON.stringify(currentUsers[0]));
        this.currentUser = currentUsers[0];
      }
    });
  }

  loggedInUser = (user, form: NgForm) => {
    this.currentUser = user;
    form.resetForm();
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  getDataWithinLimit = (users, minVal, maxVal, param) => {
    const filteredUsers = [];
    users.forEach((user) => {
      if (user[param] >= minVal && user[param] <= maxVal) {
        filteredUsers.push(user);
      }
    });
    return filteredUsers;
  }

  change = () => {
  }

  resetCurrentUser = () => {
    sessionStorage.removeItem('currentUser');
    this.currentUser = null;
    this.currentUserPossiblities = [];
  }

}
