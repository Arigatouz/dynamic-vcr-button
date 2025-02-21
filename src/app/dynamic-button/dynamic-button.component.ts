import { ChangeDetectionStrategy, Component, effect, inject, input, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { MatButton, MatButtonModule} from '@angular/material/button'

@Component({
  selector: 'app-dynamic-button',
  imports: [MatButtonModule],
  template: `
  
    <ng-template #body>
      <ng-content></ng-content>
    </ng-template>
  `,
  styleUrl: './dynamic-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicButton { 

  vcr = inject(ViewContainerRef);

  tpl = viewChild<TemplateRef<unknown>>("body");

  constructor(){
    effect(() => {
      if(this.tpl()){
        const nodes = this.tpl()?.createEmbeddedView(undefined).rootNodes;
        this.vcr.createComponent(MatButton, { projectableNodes: [nodes as any[]]});
      }
    });

  }
}
