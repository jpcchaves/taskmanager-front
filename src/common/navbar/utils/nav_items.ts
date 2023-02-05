import { NavItem } from '../types/NavItemI';

export const NAV_ITEMS: Array<NavItem> = [
	{
		label: 'Tasks',
		children: [
			{
				label: 'Listagem de Tasks',
				subLabel: 'Veja suas tasks atuais',
				children: [],
				href: '/',
			},
			{
				label: 'Criar nova Task',
				subLabel: 'Adicione uma Task',
				children: [],
				href: '/task/new',
			},
		],
	},
];
