import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

type PaneType = 'left' | 'right';
@Component({
  selector: 'app-view-left-right-panel',
  templateUrl: './view-left-right-panel.component.html',
  styleUrls: ['./view-left-right-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
    ])
  ]
})
export class ViewLeftRightPanelComponent implements OnInit {
  @Input() activePane: PaneType = 'left';
  constructor() { }

  ngOnInit() {
  }

}
