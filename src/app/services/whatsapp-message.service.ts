import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WhatsappMessageService {

  constructor(private http: HttpClient) { }

  // heroesUrl = 'https://api.twilio.com/2010-04-01/Accounts/ACf1abd708f32565c60d15cccca8605535/Messages.json';
  // hero = {
  //   "To":"whatsapp:+919566457482",
  //   "From":"whatsapp:+14155238886",
  //   "Body":"Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019."
  //   }

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/x-www-form-urlencoded',
  //     'Authorization': 'Basic QUNmMWFiZDcwOGYzMjU2NWM2MGQxNWNjY2NhODYwNTUzNTpiOTFkNDZhMDE3NmFkZTkyZWVlOWE1ZDM4OWJjMzM1YQ=='
  //   })
  // };

  /** POST: add a new hero to the database */
  // sendWhatsappMessage = () => {
  //   console.log('comes',this.heroesUrl, this.hero, this.httpOptions)
  //   return this.http.post(this.heroesUrl, this.hero, this.httpOptions)
  //   .pipe(map(user => {
  //     console.log(user);

  // }));
// tslint:disable-next-line:max-line-length
// var data = "To=whatsapp%3A%2B919566457482&From=whatsapp%3A%2B14155238886&Body=Your%20Yummy%20Cupcakes%20Company%20order%20of%201%20dozen%20frosted%20cupcakes%20has%20shipped%20and%20should%20be%20delivered%20on%20July%2010%2C%202019.";

// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === 4) {
//     console.log(this.responseText);
//   }
// });

// xhr.open("POST", "https://api.twilio.com/2010-04-01/Accounts/ACf1abd708f32565c60d15cccca8605535/Messages.json");
// tslint:disable-next-line:max-line-length
// xhr.setRequestHeader("authorization", "Basic QUNmMWFiZDcwOGYzMjU2NWM2MGQxNWNjY2NhODYwNTUzNTo4ODQzNWJlZjM5ZjJhNzJkYjIwNTkwNzg1MjgxMzhkZg==");
// xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

// xhr.send(data);
//   }

  // sendWhatsappMessage = () => {
  //   console.log('called');
  //   Twilio('ACf1abd708f32565c60d15cccca8605535', '88435bef39f2a72db2059078528138df').messages 
  //         .create({
  // tslint:disable-next-line:max-line-length
  //            body: 'Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/',
  //            from: 'whatsapp:+14155238886',
  //            to: 'whatsapp:+919566457482'
  //          })
  //         .then(message => console.log(message.sid))
  //         .catch(err => console.log(err))
  // }

  // configUrl = 'assets/config.json';

  // getConfig() {
  //   return this.http.get(this.configUrl);
  // }


}