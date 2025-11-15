import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-distance',
  imports: [CommonModule, RouterModule],
  templateUrl: './search-distance.html',
  styleUrl: './search-distance.css',
})
export class SearchDistance {
  activeTab: string = 'quan-an';

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
