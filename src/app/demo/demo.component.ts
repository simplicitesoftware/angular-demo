import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Simplicite from 'simplicite';

@Component({
	selector: 'app-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
	error = '';
	grant = {};
	products = [];

	private debug: boolean = false;
	private app: any;
	constructor(private cdr: ChangeDetectorRef) {
		this.app = Simplicite.session({
			url: 'https://demo.dev.simplicite.io',
			username: 'website',
			password: 'simplicite',
			debug: this.debug
		});
	}

	ngOnInit() {
		let self = this;
		self.app.login().then((params: any) => {
			console.log('Logged in as ' + params.username);
			self.app.getGrant().then(function(grant) {
				if (self.debug) console.log(grant);
				self.grant = grant;
				self.cdr.detectChanges();
				let prd = self.app.getBusinessObject('DemoProduct');
				prd.search(null, { inlineDocuments: [ 'demoPrdPicture' ] }).then((list: any) => {
					if (self.debug) console.log(list);
					self.products = list;
					self.cdr.detectChanges();
				});
			});
		}).catch((err: any) => {
			self.error = err.message;
			self.cdr.detectChanges();
		});
	}
}
