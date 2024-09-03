import { AfterViewInit, Component, computed, ElementRef, OnInit, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { createSwapy } from "swapy";
import { DndContainerComponent } from './components/dnd-container/dnd-container.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DndContainerComponent,
    MatSlideToggleModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
