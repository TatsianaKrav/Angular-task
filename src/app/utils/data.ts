export const treeData = [
    {
        id: '1',
        label: 'Фрукты',
        children: [
            {
                id: '1-1', label: 'Яблоки', children: [
                    { id: '1-1-1', label: 'Антоновка' },
                    { id: '1-1-2', label: 'Белый налив' }
                ]
            },
            {
                id: '1-2', label: 'Бананы', children: [
                    { id: '1-2-1', label: 'Красные' },
                    { id: '1-2-2', label: 'Зеленые' },
                    { id: '1-2-3', label: 'Желтые' }
                ]
            },
            { id: '1-3', label: 'Апельсины' }
        ]
    },
    {
        id: '2',
        label: 'Овощи',
        children: [
            { id: '2-1', label: 'Морковь' },
            { id: '2-2', label: 'Картофель' }
        ]
    },
    {
        id: '3',
        label: 'Мясо'
    }
];