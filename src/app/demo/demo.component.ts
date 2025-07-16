import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import simplicite from 'simplicite';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  error = '';
  grant: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
  products: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any

  private debug = false;
  private app: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    // Explicit URL needed for a standalone deployment, remove it when deploying in Simplicité
    this.app = simplicite.session({
      url: 'https://demo.dev2.simplicite.io',
      username: 'website',
      password: 'simplicite',
      debug: this.debug
    });
    this.app.info(`Version: ${simplicite.constants.MODULE_VERSION}`);
    this.app.debug(this.app.parameters);
  }

  async ngOnInit() {
    try {
      const user: any = await this.app.login(); // eslint-disable-line @typescript-eslint/no-explicit-any
      this.app.info('Logged in as ' + user.username);
      const grant: any = await this.app.getGrant(); // eslint-disable-line @typescript-eslint/no-explicit-any
      this.app.debug(grant);
      this.grant = grant;
      this.cdr.detectChanges();
      const prd = this.app.getBusinessObject('DemoProduct');
      const list: any[] = await prd.search(null, { inlineDocuments: [ 'demoPrdPicture' ] }); // eslint-disable-line @typescript-eslint/no-explicit-any
      this.app.debug(list);
      this.products = list;
      this.cdr.detectChanges();
    } catch(err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      this.error = err.message;
      this.cdr.detectChanges();
    }
  }
}
