import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import simplicite from 'simplicite';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  error = '';
  grant = {};
  products = [];

  private debug = false;
  private app: any;
  constructor(private cdr: ChangeDetectorRef) {
    this.app = simplicite.session({
      url: 'https://demo.dev.simplicite.io',
      username: 'website',
      password: 'simplicite',
      debug: this.debug
    });
  }

  ngOnInit() {
    this.app.login().then((params: any) => {
      console.log('Logged in as ' + params.username);
      this.app.getGrant().then((grant: any) => {
        this.app.debug(grant);
        this.grant = grant;
        this.cdr.detectChanges();
        const prd = this.app.getBusinessObject('DemoProduct');
        prd.search(null, { inlineDocuments: [ 'demoPrdPicture' ] }).then((list: any) => {
          this.app.debug(list);
          this.products = list;
          this.cdr.detectChanges();
        });
      });
    }).catch((err: any) => {
      this.error = err.message;
      this.cdr.detectChanges();
    });
  }
}
