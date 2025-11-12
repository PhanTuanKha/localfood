import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css',
})
export class Mainpage {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(){

  }
  scrollLeft(){
    const container=this.scrollContainer.nativeElement;
    if (container.scrollLeft <=0){
      container.scrollTo({
        left: container.scrollWidth,
        behavior: 'smooth'
      })
    } else {
      container.scrollBy({
        left: -300,
        behavior: 'smooth'
      })
    }
  }
  scrollRight() {
    const container = this.scrollContainer.nativeElement
    
    const maxScrollLeft = container.scrollWidth - container.clientWidth
    if (container.scrollLeft >= maxScrollLeft - 5) {
      container.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    } else {
      container.scrollBy({
        left: 300,
        behavior: 'smooth',
      })
    }
  }
}
