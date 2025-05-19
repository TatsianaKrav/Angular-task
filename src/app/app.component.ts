import { Component, OnInit } from '@angular/core';
import { TreeComponent } from './components/tree/tree.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TreeNode } from './utils/models/tree-model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { treeData } from './utils/data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ReactiveFormsModule, TreeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  selectedIds$!: Observable<string[]>;

  treeData: TreeNode[] = treeData;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setParents(this.treeData);
    this.setLevels(this.treeData);

    this.form = this.fb.group({
      selectedIds: [[]]
    });
  }

  setParents(nodes: TreeNode[], parent?: TreeNode): void {
    nodes.forEach(node => {
      node.parent = parent;
      if (node.children) {
        this.setParents(node.children, node);
      }
    });
  }

  setLevels(nodes: TreeNode[], level: number = 0): void {
    nodes.forEach(node => {
      node.level = level;
      if (node.children) {
        this.setLevels(node.children, level + 1);
      }
    });
  }
}
