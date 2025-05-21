import { Component, input } from '@angular/core';
import { TreeNode } from '../../utils/models/tree-model';
import { CommonModule } from '@angular/common';
import { DefaultPipe } from "../../utils/default.pipe";
import { CheckValueDirective } from '../../utils/check-value.directive';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule, DefaultPipe, CheckValueDirective],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss'
})
export class TreeComponent {
  nodes = input.required<TreeNode[]>();
  selectedIds = new Set<string>();


  isChecked(id: string): boolean {
    return this.selectedIds.has(id);
  }

  onToggle(node: TreeNode, event: Event) {
    const targetElement = event.target;

    if (targetElement instanceof HTMLInputElement) {
      if (targetElement.checked) {
        this.selectNodeAndChildren(node);
      } else {
        this.deselectNodeAndChildren(node);
      }
      this.updateParents(node.parent);
    }
  }

  private selectNodeAndChildren(node: TreeNode) {
    this.selectedIds.add(node.id);
    node.children?.forEach(child => this.selectNodeAndChildren(child));
  }

  private deselectNodeAndChildren(node: TreeNode) {
    this.selectedIds.delete(node.id);
    node.children?.forEach(child => this.deselectNodeAndChildren(child));
  }

  private updateParents(node?: TreeNode) {
    if (!node) return;
    if (node.children && node.children.length > 0) {
      const allChildrenSelected = node.children.every(child => this.selectedIds.has(child.id));
      if (allChildrenSelected) {
        this.selectedIds.add(node.id);
      } else {
        this.selectedIds.delete(node.id);
      }
    }
    this.updateParents(node.parent);
  }
}
