import { Component, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Subject } from 'rxjs';
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
    { name: 'John', color: 'red' },
    { name: 'Mary', color: 'orange'},
    { name: 'Bob', color: 'blue'}
  ];

  posts = [
    { postInfo: { id: 1, name: 'John' }, },
    { postInfo: { id: 2, name: 'Mary' }, },
    { postInfo: { id: 3, name: 'Bob' }, },
  ]

  postsLike = [
    { postInfo: { id: 1, name: 'John' }, likes: [1, 2, 3]},
    { postInfo: { id: 2, name: 'Mary' }, likes: [4, 5]},
  ]

  idPosts = [1, 2, 3, 4]

  info = new Map()
  infoMap$ = new BehaviorSubject(this.info)

  click() {
    this.idPosts.forEach(id => {
      const obj = this.postsLike.find(obj => obj.postInfo.id === id);
      if(obj) {
        this.info.set(id, obj.likes.length)
      } else {
        this.info.set(id, 0)
      }
      this.infoMap$.next(this.info)
    })
    console.log(this.info)
    console.log(this.infoMap$.getValue())
  }


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
  
  allAisChecked:boolean = false;

  buttonAisState = this.data.map(button => {
    return { ...button, isChecked: false };
  });

  updateAllAisComplete() {
    this.allAisChecked = this.buttonAisState.every(t => t.isChecked)
  }
  setAllAisToggle(completed: boolean) {
    this.allAisChecked = completed;
    this.buttonAisState.forEach(t => (t.isChecked = completed));
  }
}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
