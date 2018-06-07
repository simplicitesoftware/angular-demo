import { Component, OnInit } from '@angular/core';
import Simplicite from 'simplicite';

@Component({
	selector: 'app-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
	app = {};
	user = '';

	constructor() {
		this.app = Simplicite.session({
			url: 'https://demo.dev.simplicite.io',
			username: 'website',
			password: 'simplicite',
			debug: false
		});
	}

	ngOnInit() {
		let self = this;
		self.app.login().then(function(params) {
			console.log('Logged in as ' + params.username);
			self.user = params.username;
			self.app.getGrant().then(function(grant) {
				console.log(grant);
				// Etc.
			});
		}).fail(function(reason) {
			console.log('Login failed (status: ' + reason.status + ', message: ' + reason.message + ')');
		});
	}
}
