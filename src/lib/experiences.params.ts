import Assets from './data/assets';
import { getSkills } from './skills.params';
import { ContractType, type Experience } from './utils/types';

const MY_EXPERIENCES: Array<Experience> = [
	{
		slug: 'software-developer-landin',
		company: 'Landin',
		description: `Working on Landing's Landing page builder platform, as Software Developer and DevOps Engineer.`,
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Remote',
		period: { from: new Date("2022-04") },
		skills: getSkills('node', 'express', 'js', 'mysql', 'mongodb', 'docker', 'nginx', 'bash', 'linux', 'git'),
		name: 'Software Developer',
		color: '#4A09F4',
		links: [{
			to: 'https://landin.ir',
			label: 'Landin',
			newTab: true
		}],
		logo: Assets.Landin
	},
	{
		slug: 'backend-improver-digital',
		company: 'Improver Digital',
		description: 'Wingle Application Backend Developer.',
		contract: ContractType.FullTime,
		type: 'Backend Development',
		location: 'Remote',
		period: { from: new Date("2021-04"), to: new Date("2021-12") },
		skills: getSkills('node', 'express', 'js', 'mongodb'),
		name: 'Backend Developer',
		color: '#ffffff',
		links: [],
		logo: Assets.Unknown
	}
];

export default MY_EXPERIENCES;
