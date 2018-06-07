import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Simplicite from 'simplicite';

@Component({
	selector: 'app-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
	grant = {};
	products = [];

	private debug = false;
	private app;
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
		self.app.login().then(function(params) {
			console.log('Logged in as ' + params.username);
			self.app.getGrant().then(function(grant) {
				if (self.debug) console.log(grant);
				self.grant = grant;
				self.cdr.detectChanges();
				let prd = self.app.getBusinessObject('DemoProduct');
				prd.search().then(function(list) {
					if (self.debug) console.log(list);
					self.products = list;
					self.cdr.detectChanges();
				});
			});
		}).fail(function(reason) {
			console.log('Login failed (status: ' + reason.status + ', message: ' + reason.message + ')');
		});
	}
}
