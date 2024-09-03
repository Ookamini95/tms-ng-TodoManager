import { AfterViewInit, Component, computed, ElementRef, OnInit, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { createSwapy } from "swapy";
import { DndContainerComponent } from './components/dnd-container/dnd-container.component';
import { DndSlotComponent } from './components/dnd-container/dnd-slot/dnd-slot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DndContainerComponent,
    DndSlotComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

  _container2 = viewChild<ElementRef<HTMLDivElement>>("container2");
  container2 = computed(() => this._container2()?.nativeElement);


  ngAfterViewInit(): void {
    console.log(this.container2());

  
    const swap2 = createSwapy(this.container2() as Element, {
      animation: 'dynamic',
      continuousMode: false
    })

    swap2.onSwap((event) => {
      console.log('swapy2 event', event.data)
    })

    console.log(swap2);


  }


}
