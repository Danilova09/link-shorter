import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Link, LinkData } from '../models/link.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  shortUrlChange = new Subject<Link>();
  addingLink = new Subject<boolean>();

  constructor(
    private http: HttpClient,
  ) {}

  addLink(linkData: LinkData) {
    this.addingLink.next(true);
    this.http.post<Link>('http://localhost:8000/links', linkData).subscribe({
      next: (newLink: Link) => {
        this.shortUrlChange.next(newLink);
        this.addingLink.next(false);
      },
      error: () => this.addingLink.next(false)
    });
  }
}
