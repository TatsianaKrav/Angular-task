import { Component, forwardRef, input } from '@angular/core';
import { TreeModel } from '../../utils/models/tree-model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [TreeComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeComponent),
      multi: true
    }
  ],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss'
})
export class TreeComponent implements ControlValueAccessor {
  nodes = input.required<TreeModel[]>();
  private onChange!: (value: TreeModel[]) => void;
  private onTouched!: () => void;
  arrOfNodes: TreeModel[] = [];

  writeValue(nodes: TreeModel[]): void {
    if (nodes) {
      this.arrOfNodes = nodes;
    }
  }

  registerOnChange(fn: (value: TreeModel[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
