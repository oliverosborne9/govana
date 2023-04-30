export type Question = {
	frequency: number;
	syllables: number;
	url: string;
	word: string;
};

export const sampleData: Question[] = [
	{
		frequency: 0.735647,
		syllables: 2,
		url: 'https://marthapoints.files.wordpress.com/2010/04/cracker.jpg',
		word: 'cracker',
	},
	{
		frequency: 0.908734,
		syllables: 2,
		url: 'https://wallup.net/wp-content/uploads/2019/10/678530-hacker-hacking-hack-anarchy-virus-internet-computer-sadic-anonymous-dark-code-binary.jpg',
		word: 'hacker',
	},
	{
		frequency: 0.900679,
		syllables: 2,
		url: 'https://cdn-images-1.medium.com/max/800/0*p7jPi_Wl8MmVQmaV.jpeg',
		word: 'packer',
	},
	{
		frequency: 0.199411,
		syllables: 3,
		url: 'http://yesofcorsa.com/wp-content/uploads/2017/11/Nutcracker-Wallpaper-High-Definition.jpg',
		word: 'nutcracker',
	},
	{
		frequency: 0.394505,
		syllables: 2,
		url: 'https://images.homedepot-static.com/productImages/2adf7c80-518b-440a-ad27-fe7f3a5af005/svn/mutual-industries-backer-rods-875-0-0-64_1000.jpg',
		word: 'backer',
	},
];
