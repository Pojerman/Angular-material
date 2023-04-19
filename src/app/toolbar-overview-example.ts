import { Component, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
/**
 * @title Toolbar overview
 */
@Component({
  selector: 'toolbar-overview-example',
  templateUrl: 'toolbar-overview-example.html',
  styleUrls: ['toolbar-overview-example.css'],
})
export class ToolbarOverviewExample {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  
  tabs:any [] = [];
  panelOpenState = false;
  activeName!: string|null;
  selectedTabs: number;
  data = [
    { name: 'John', color: 'red', completed: false, toggle: true },
    { name: 'Mary', color: 'orange', completed: false, toggle: false },
    { name: 'Bob', color: 'blue', completed: false, toggle: true }
  ];
  data1 = [
    { name: 'John', color: 'red', completed: false, toggle: true },
    { name: 'Mary', color: 'orange', completed: false, toggle: false },
    { name: 'Bob', color: 'blue', completed: false, toggle: true }
  ];
  toggle(sidenavName: string) {
    if (this.activeName === sidenavName && this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.activeName = sidenavName;
      const tabsItem = this.tabGroup._tabs.toArray()
      const tabIndex = tabsItem.findIndex((tab:any) => tab.textLabel === sidenavName)
      this.tabGroup.selectedIndex = tabIndex
      if (this.tabs.length !== this.tabGroup._tabs.length) {
        this.tabs.push(sidenavName);
      }
      this.sidenav.open();
      console.log(this.tabs)
    }
  }

  onSelectChange(name:any) {
    const tabsItem = this.tabGroup._tabs.toArray()
    this.tabGroup.selectedIndex = tabsItem.findIndex((tab:any) => tab.textLabel === this.activeName)
  }

  closeSelectedTab() {
    const tabsItem = this.tabGroup._tabs.toArray()
    const tabIndex = this.tabs.findIndex((tab:any) => tab === this.activeName)
    if (tabIndex !== -1) {
      this.tabs.splice(tabIndex, 1)
      this.tabs.length === 0 ? this.sidenav.close() : '';
      if (this.tabs.length !== 0) {
        
        const nextTabIndex = tabIndex < this.tabs.length ? tabIndex : tabIndex - 1;
        const nextTabName = this.tabs[nextTabIndex];
        this.activeName = nextTabName;
        this.onSelectChange(this.activeName);
      }
    }
  }
  closeSidenav() {
    this.sidenav.close()
  }
  toggles: Subject<any> = new Subject();

  reset() {
    this.toggles.next([]);
  }
  allSelectedSlide: boolean = false;
  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.data.every(t => t.completed);
  }
  updateAllCompleteToggle() {
    this.allSelectedSlide = this.data1.every(t => t.completed);
  }
  someComplete(): boolean {
    return this.data.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    this.data.forEach(t => (t.completed = completed));
  }
  setAllToogle(completed: boolean) {
    this.allSelectedSlide = completed;
    this.data1.forEach(t => (t.completed = completed));
  }
}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
