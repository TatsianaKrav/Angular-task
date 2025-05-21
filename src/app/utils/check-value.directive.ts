import { AfterContentChecked, Directive, ElementRef, Renderer2 } from '@angular/core';
import { SearchService } from '../services/search.service';

@Directive({
  selector: '[checkValue]'
})
export class CheckValueDirective implements AfterContentChecked {

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2,
    private searchService: SearchService) {
  }

  ngAfterContentChecked(): void {
    const elementValue = this.elementRef.nativeElement.innerText;

    this.searchService.inputValue$.subscribe(value => {

      if (value) {
        if (value.toLowerCase().trim() === elementValue.toLowerCase().trim()) {
          this.renderer.setStyle(
            this.elementRef.nativeElement,
            'background-color',
            '#92f092'
          )
        } else {
          const input = this.elementRef.nativeElement.firstChild;

          if (input && input instanceof HTMLInputElement) {
            this.renderer.setProperty(
              input,
              'disabled',
              true
            )
          }
        }

      } else {
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          'background-color',
          'transparent'
        );

        const input = this.elementRef.nativeElement.firstChild;

        if (input && input instanceof HTMLInputElement) {
          this.renderer.setProperty(
            input,
            'disabled',
            false
          )
        }
      }
    })
  }

}
