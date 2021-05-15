export type RouteProps = {
	copy: string;
	link: string;
	external?: boolean;
};

export const ROUTES: RouteProps[] = [
	{
		copy: 'Dashboard',
		link: '/',
	},
	{
		copy: 'OrbitStation',
		link: '/stake',
	},
	{
		copy: 'Pools',
		link: '/pools',
	},
	{
		copy: 'Vaults',
		link: '/vaults',
	},
	{
		copy: 'Governance',
		link: 'https://snapshot.org/#/boosted-finance',
		external: true,
	},
];

export const ROUTESSECONDARY = [
	{
		copy: 'About',
		link: '/about',
	},
	{
		copy: 'FAQ',
		link: '/faq',
	},
	{
		copy: 'Docs',
		link: '/docs',
	},
	{
		copy: 'Audit',
		link: '/audit',
	},
];
