import { NgModule } from '@angular/core';
import { DateAgoPipe } from './date-ago-pipe'
import { UsNumberPipe } from './us-number-pipe'

@NgModule({
  declarations: [DateAgoPipe, UsNumberPipe],
  imports: [],
  exports: [DateAgoPipe, UsNumberPipe],
})
export class CustomPipesModule {
}

