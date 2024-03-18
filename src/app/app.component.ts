import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgStyle,RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  screenHeight:any;
  screenWidth:any;
  footerMaxHeight:any;
  
  constructor()
  {
    this.getScreenSize(event);
  }

  @HostListener('window:resize',['$event'])
  getScreenSize(event:any)
  {
    this.screenHeight=window.innerHeight;
    this.screenWidth=window.innerWidth;
    this.footerMaxHeight=this.screenHeight-160;
  }
}
