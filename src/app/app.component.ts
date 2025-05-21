import { Component, DestroyRef, forwardRef, OnInit } from '@angular/core';
import { TreeComponent } from './components/tree/tree.component';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TreeNode } from './utils/models/tree-model';
import { CommonModule } from '@angular/common';
import { treeData } from './utils/data';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, TreeComponent, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeComponent),
      multi: true,
    }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  protected readonly searchField = new FormControl('');
  /*   selectedIds$!: Observable<string[]>; */

  treeData: TreeNode[] = treeData;

  constructor(private fb: FormBuilder, private destroyRef: DestroyRef, private searchService: SearchService) { }

  ngOnInit(): void {
    this.setParents(this.treeData);
    this.setLevels(this.treeData);

    this.form = this.fb.group({
      selectedIds: [[]]
    });

    this.searchField.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        value ? this.searchService.inputValue$.next(value) : this.searchService.inputValue$.next('');
      })
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
