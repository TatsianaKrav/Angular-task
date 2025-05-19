import { Component, input } from '@angular/core';
import { TreeModel } from '../../utils/models/tree-model';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [TreeComponent],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss'
})
export class TreeComponent {
  nodes = input.required<TreeModel[]>();
}
