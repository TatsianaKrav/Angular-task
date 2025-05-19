export interface TreeModel {
    id: string;
    label: string;
    children?: TreeModel[];
    checked?: boolean; // состояние чекбокса
    indeterminate?: boolean; // для частично выбранных узлов
}
