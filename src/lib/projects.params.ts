import Assets from './data/assets';
import { getSkills } from './skills.params';
import type { Project } from './utils/types';

const MY_PROJECTS: Array<Project> = [
	{
		slug: 'har-insight',
		color: '#ff3e00',
		description:
			'In my time in Landin, sometimes we had to analyze HAR files to find out what is wrong with the website. There was no good tool for this, so I decided to make one. HAR Insight is a simple web app that analyzes HAR files and shows you the results in a nice way. But it will not stay simple for long, I have a lot of plans for it. 😉',
		links: [{ to: 'https://harinsight.net', label: 'HAR Insight' }, { to: 'https://github.com/bagheriali2001/har-insight', label: 'GitHub' }],
		logo: Assets.Nuxt,
		name: 'HAR Insight',
		period: {
			from: new Date("2023-08"),
		},
		skills: getSkills('nuxt', 'vuejs', 'js', 'nginx', 'docker'),
		type: 'HAR File Analyzer'
	},
	{
		slug: 'github-webhook-runner',
		color: '#5e95e3',
		description:
			'Before I became familiar with GitHub Actions, I used to use simple bash scripts to automate my deployments. This is a simple Node.js server that listens for GitHub webhooks and runs a bash script on the server.',
		links: [{ to: 'https://github.com/bagheriali2001/github-webhook-runner', label: 'GitHub' }],
		logo: Assets.NodeJs,
		name: 'Github Webhook Runner',
		period: {
			from: new Date("2022-01"),
			to: new Date("2022-07"),
		},
		skills: getSkills('node', 'js'),
		type: 'CI/CD Helper'
	},
	{
		slug: 'blog-forge',
		color: '#ff3e00',
		description:
			'A Blog system ready to be deployed and used, but with enough customizability to make it you our.',
		links: [{ to: 'https://github.com/amiralibg/BlogForge', label: 'GitHub' }],
		logo: Assets.ExpressJs,
		name: 'Blog Forge',
		period: {
			from: new Date("2023-04"),
			to: new Date()
		},
		skills: getSkills('node', 'express', 'js', 'mongodb', 'docker', 'nginx'),
		type: 'Blogging System (UNDER DEVELOPMENT)',
	},
	{
		slug: 'ping-up',
		color: '#5e95e3',
		description:
			`Ping Up is a simple uptime monitoring tool that notifies you when your website goes down, it is inspired by "host-tracker" and "uptime-kuma" and it will have best features of these and also it's own unique features.`,
		links: [],
		logo: Assets.Go,
		name: 'Ping Up',
		period: {
			from: new Date("2023-07"),
			to: new Date(),
		},
		skills: getSkills('node', 'express', 'js', 'vuejs', 'go', 'postgresql', 'docker', 'nginx', 'redis'),
		type: 'Up time monitoring tool (UNDER DEVELOPMENT)'
	},
	{
		slug: 'utility-scripts',
		color: '#ff3e00',
		description:
			'Collection of the utility scripts that i needed over time.',
		links: [{ to: 'https://github.com/bagheriali2001/utility-scripts', label: 'GitHub' }],
		logo: Assets.Bash,
		name: 'Utility Scripts',
		period: {
			from: new Date("2022-08"),
			to: new Date()
		},
		skills: getSkills('bash', 'linux', 'js'),
		type: 'Utility Scripting'
	},
	{
		slug: 'personal-website',
		color: '#5e95e3',
		description:
			`This personal website 🤷‍♂️. Am improved version of @RiadhAdrani's slick-portfolio-svelte.`,
		links: [{ to: 'https://github.com/bagheriali2001/bagheriali2001.github.io', label: 'GitHub' }],
		logo: Assets.Svelte,
		name: 'Personal Website',
		period: {
			from: new Date("2023-08"),
			to: new Date()
		},
		skills: getSkills('svelte', 'ts'),
		type: 'Personal Website'
	}
];

export default MY_PROJECTS;
