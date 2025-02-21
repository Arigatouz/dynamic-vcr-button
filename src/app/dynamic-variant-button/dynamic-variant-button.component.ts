import { ChangeDetectionStrategy, Component, computed, effect, inject, Injector, input, StaticProvider, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { MatButton, MatButtonModule, } from '@angular/material/button';


/** List of classes to add to buttons instances based on host attribute selector. */
const HOST_SELECTOR_MDC_CLASS_PAIR: {attribute: string; mdcClasses: string[]}[] = [
  {
    attribute: 'mat-button',
    mdcClasses: ['mdc-button', 'mat-mdc-button'],
  },
  {
    attribute: 'mat-flat-button',
    mdcClasses: ['mdc-button', 'mdc-button--unelevated', 'mat-mdc-unelevated-button'],
  },
  {
    attribute: 'mat-raised-button',
    mdcClasses: ['mdc-button', 'mdc-button--raised', 'mat-mdc-raised-button'],
  },
  {
    attribute: 'mat-stroked-button',
    mdcClasses: ['mdc-button', 'mdc-button--outlined', 'mat-mdc-outlined-button'],
  },
  {
    attribute: 'mat-fab',
    mdcClasses: ['mdc-fab', 'mat-mdc-fab-base', 'mat-mdc-fab'],
  },
  {
    attribute: 'mat-mini-fab',
    mdcClasses: ['mdc-fab', 'mat-mdc-fab-base', 'mdc-fab--mini', 'mat-mdc-mini-fab'],
  },
  {
    attribute: 'mat-icon-button',
    mdcClasses: ['mdc-icon-button', 'mat-mdc-icon-button'],
  },
];


export type ButtonVariant = "basic" | "raised" | "stroked" | "flat";

@Component({
  selector: 'app-dynamic-variant-button',
  imports: [MatButtonModule],
  template: `
    <ng-template #body let-prefix="prefix">
      <ng-content></ng-content>
 
    </ng-template>
  `,
  styleUrl: './dynamic-variant-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicVariantButton {

  variant = input.required<ButtonVariant>();

  variantPrefixes = computed(() => {
    switch(this.variant()) {
      case 'basic': return "mat-button";
      case 'raised': return "mat-raised-button";
      case 'stroked': return "mat-stroked-button";
      case 'flat': return "mat-flat-button";
    }
  });

  vcr = inject(ViewContainerRef);

  tpl = viewChild<TemplateRef<unknown>>("body");

  constructor(){
    effect(() => {
      if(this.tpl()){
        if(this.tpl()){
          const nodes = this.tpl()?.createEmbeddedView(undefined).rootNodes;
          const buttonEl = this.vcr.createComponent(MatButton, { projectableNodes: [nodes as any[]]});
          
          if(this.variant() !== "basic") {
            const variantClasses = HOST_SELECTOR_MDC_CLASS_PAIR.find((variant) => variant.attribute === this.variantPrefixes());

            if(variantClasses?.mdcClasses) {
              buttonEl.location.nativeElement.classList.remove("mdc-button");
              buttonEl.location.nativeElement.classList.remove("mat-mdc-button");

              for (let i = 0; i < variantClasses?.mdcClasses.length; i++) {
                buttonEl.location.nativeElement.classList.add(variantClasses?.mdcClasses[i]);
              }
            }
          }
        }
      }
    
    });

  }
}

