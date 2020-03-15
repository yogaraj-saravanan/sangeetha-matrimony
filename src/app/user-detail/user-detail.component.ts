import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }
  selectedUser;
  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.selectedUser = {
      "slno": 1,
      "smid": 121218,
      "name": "G.LOKESH",
      "dob": "04-02-1995",
      "age": 23,
      "phone_number": "",
      "whatsapp_number_primary": "",
      "whatsapp_number_secondary": "",
      "phone_number_secondary": "",
      
      "second_marriage": "",

      "caste": "AGAMUDAYAR",
      "raasi": "MESHAM",
      "star": "VIRUCHAGAM",

      "education": "D.E.E.E",
      "occupation_location": "R.T.E",
      "salary": 144000,
      
      "profile_picture_url": "",
      "jadagam_url": "",
      "bio_data_url": ""
    }
  }

}


