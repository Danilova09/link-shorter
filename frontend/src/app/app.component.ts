import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LinksService } from './services/links.service';
import { Subscription } from 'rxjs';
import { Link } from './models/link.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('form') form!: NgForm;
  shortUrl!: string;
  addingLink = false;
  shortUrlSubscription!: Subscription;
  addingLinkSubscription!: Subscription;

  constructor(
    private linksService: LinksService,
  ) {}

  ngOnInit(): void {
    this.shortUrlSubscription = this.linksService.shortUrlChange.subscribe((link: Link) => {
      this.shortUrl = link.shortUrl;
    });
    this.addingLinkSubscription = this.linksService.addingLink.subscribe((adding: boolean) => {
      this.addingLink = adding;
    });
  }

  onSubmit() {
    let randomUrl = this.getRandomUrl();
    if (this.form.valid) {
      const linkData = {
        shortUrl: randomUrl,
        originalUrl: this.form.value.originalUrl,
      };
      this.linksService.addLink(linkData);
    }
  }

  getRandomUrl() {
    return Math.random().toString(36).replace('0.', '');
  }

  ngOnDestroy(): void {
    this.shortUrlSubscription.unsubscribe();
    this.addingLinkSubscription.unsubscribe();
  }
}
