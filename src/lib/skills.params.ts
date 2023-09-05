import Assets from './data/assets';
import type { Skill } from './utils/types';
import svelte from './md/svelte.md?raw';
import node from './md/node.md?raw';

const s = (skill: Skill) => skill;

export type ArrayElementType<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const MY_SKILLS = [
	s({
		slug: 'node',
		color: '#4C9943',
		description: node,
		logo: Assets.NodeJs,
		name: 'NodeJs'
	}),
	s({
		slug: 'express',
		color: '#828282',
		description: '',
		logo: Assets.ExpressJs,
		name: 'ExpressJs'
	}),
	s({
		slug: 'js',
		color: '#EFDB4F',
		description: '',
		logo: Assets.JavaScript,
		name: 'Javascript'
	}),
	s({
		slug: 'postgresql',
		color: '#336790',
		description: '',
		logo: Assets.PostgreSQL,
		name: 'PostgreSQL'
	}),
	s({
		slug: 'mysql',
		color: '#01668C',
		description: '',
		logo: Assets.Mysql,
		name: 'Mysql'
	}),
	s({
		slug: 'mongodb',
		color: '#589636',
		description: '',
		logo: Assets.MongoDB,
		name: 'MongoDB'
	}),
	s({
		slug: 'docker',
		color: '#0db7ed',
		description: '',
		logo: Assets.Docker,
		name: 'Docker'
	}),
	s({
		slug: 'nginx',
		color: '#009900',
		description: '',
		logo: Assets.Nginx,
		name: 'Nginx'
	}),
	s({
		slug: 'bash',
		color: '#C2E2B3',
		description: '',
		logo: Assets.Bash,
		name: 'Bash'
	}),
	s({
		slug: 'linux',
		color: '#F5C022',
		description: '',
		logo: Assets.Linux,
		name: 'Linux'
	}),
	s({
		slug: 'git',
		color: '#F34E29',
		description: '',
		logo: Assets.Git,
		name: 'Git'
	}),
	s({
		slug: 'redis',
		color: '#C52F2C',
		description: '',
		logo: Assets.Redis,
		name: 'Redis'
	}),
	s({
		slug: 'vuejs',
		color: '#3FB984',
		description: '',
		logo: Assets.VueJs,
		name: 'VueJs'
	}),
	s({
		slug: 'nuxt',
		color: '#00DC82',
		description: '',
		logo: Assets.Nuxt,
		name: 'Nuxt'
	}),
	s({
		slug: 'python',
		color: '#FFD849',
		description: '',
		logo: Assets.Python,
		name: 'Python'
	}),
	s({
		slug: 'go',
		color: '#00B1D9',
		description: '',
		logo: Assets.Go,
		name: 'Go'
	}),
	s({
		slug: 'svelte',
		color: '#FF3B00',
		// description: svelte,
		description: '',
		logo: Assets.Svelte,
		name: 'Svelte'
	}),
	s({
		slug: 'ts',
		color: '#2E78C7',
		description: '',
		logo: Assets.TypeScript,
		name: 'Typescript'
	}),

	
	// s({
	// 	slug: 'css',
	// 	color: '#0800ff',
	// 	description:
	// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.',
	// 	logo: Assets.CSS,
	// 	name: 'CSS'
	// }),
	// s({
	// 	slug: 'html',
	// 	color: '#ff8800',
	// 	description:
	// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.',
	// 	logo: Assets.HTML,
	// 	name: 'HTML'
	// }),
	// s({
	// 	slug: 'sass',
	// 	color: 'pink',
	// 	description:
	// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.',
	// 	logo: Assets.Sass,
	// 	name: 'Sass'
	// }),
	// s({
	// 	slug: 'reactjs',
	// 	color: 'cyan',
	// 	description:
	// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci enim, congue sit amet justo eget, consequat sollicitudin libero. Etiam iaculis lectus tempor, hendrerit enim in, luctus arcu. Maecenas id enim et nibh ullamcorper auctor ac eu est. Donec imperdiet, diam quis malesuada faucibus, nibh ex gravida sapien, posuere pharetra nunc libero tristique turpis. Sed egestas laoreet semper. In hac habitasse platea dictumst. Praesent vitae est nec felis maximus facilisis. Duis luctus dui id urna tristique varius. Ut vulputate leo arcu, non bibendum arcu pulvinar eget. Fusce semper elit ut congue lacinia. Suspendisse magna diam, tempus vitae interdum eget, dictum vitae nisl. Praesent quis fringilla tortor. Donec vitae sagittis dui.',
	// 	logo: Assets.ReactJs,
	// 	name: 'React Js'
	// }),
	// s({
	// 	slug: 'svelte',
	// 	color: '#ff8800',
	// 	description: svelte,
	// 	logo: Assets.Svelte,
	// 	name: 'Svelte'
	// })
];

export default MY_SKILLS;

export const getSkills = (...slugs: Array<string>): Array<Skill> =>
	MY_SKILLS.filter((it) => slugs.includes(it.slug));
