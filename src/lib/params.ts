import MY_EXPERIENCES from './experiences.params';
import MY_PROJECTS from './projects.params';
import MY_SKILLS from './skills.params';
import {
	Platform,
	type HomePageParams,
	type ProjectPageParams,
	type ExperiencePageParams,
	type SkillsPageParams,
	type ResumePageParams,
	type SearchPageParams
} from './utils/types';
import { Icons } from './utils';

export const TITLE_SUFFIX = `Ali Bagheri's Website`;

export const NavBar = {
	home: 'Home',
	personal: 'Projects',
	career: 'Experiences',
	resume: 'Resume',
	skills: 'Skills'
};

export const getPlatfromIcon = (platform: Platform): Icons => {
	switch (platform) {
		case Platform.GitHub:
			return Icons.GitHub;
		case Platform.Linkedin:
			return Icons.LinkedIn;
		case Platform.StackOverflow:
			return Icons.StackOverflow;
		case Platform.Facebook:
			return Icons.Facebook;
		case Platform.Email:
			return Icons.Email;
		case Platform.Twitter:
			return Icons.Twitter;
		case Platform.Youtube:
			return Icons.Youtube;
		case Platform.Telegram:
			return Icons.Telegram;
	}
};

export const HOME: HomePageParams = {
	title: 'Home',
	name: 'Ali',
	lastName: 'Bagheri',
	description:
		'I am a Software Developer at Landin. I have graduated in Computer Engineering from Babol Noshirvani institute of technology. I am passionate about AI and Back-end development. I am eager to self-host my own services and applications, from a simple blog to a complex decentralized social network, or even game server and analytics solutions. I am also interested in DevOps and CI/CD. I am a big fan of open-source software and I try to contribute to them as much as I can.',
	links: [
		{ 
			platform: Platform.GitHub,
			link: 'https://github.com/bagheriali2001'
		},
		{
			platform: Platform.Linkedin,
			link: 'https://www.linkedin.com/in/bagheriali2001/'
		},
		{
			platform: Platform.Email,
			link: 'bagheriali2001@gmail.com'
		},
	]
};

export const PROJECTS: ProjectPageParams = {
	title: 'Projects',
	items: MY_PROJECTS
};

export const EXPERIENCES: ExperiencePageParams = {
	title: 'Experiences',
	items: MY_EXPERIENCES
};

export const SKILLS: SkillsPageParams = {
	title: 'Skills',
	items: MY_SKILLS
};

export const RESUME: ResumePageParams = {
	title: 'Resumé',
	// item: '../files/resume/resume.pdf'
	item: ''
};

export const SEARCH: SearchPageParams = {
	title: 'Search'
};
