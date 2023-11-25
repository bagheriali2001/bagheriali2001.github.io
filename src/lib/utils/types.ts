export enum Platform {
	GitHub = 'github',
	StackOverflow = 'stackoverflow',
	Twitter = 'twitter',
	Linkedin = 'linkedin',
	Email = 'email',
	Facebook = 'facebook',
	Youtube = 'youtube',
	Telegram = 'telegram'
}

export enum ContractType {
	FullTime = 'Full-time',
	PartTime = 'Part-time',
	SelfEmployed = 'Self-employed',
	Freelance = 'Freelance',
	Contract = 'Contract',
	Internship = 'Internship'
}

export enum BlogCategory {
	Dev = 'dev',
	Film = 'film',
	Series = 'series',
	Anime = 'anime',
	Book = 'book',
	Other = 'other'
}

export enum BlogCategoryColor {
	Dev = '#4C9943',
	Film = '#F40909',
	Series = '#F40909',
	Anime = '#F40909',
	Book = '#F40909',
	Other = '#F40909'
}

export type Asset = string | { light: string; dark: string };

export interface Item {
	slug: string;
	name: string;
	logo: Asset;
	description: string;
}

export interface Link {
	to: string;
	label: string;
	newTab?: boolean;
}

export interface IconLink extends Link {
	icon: Asset;
}

export interface Skill extends Item {
	color: string;
}

export interface Project extends Item {
	links: Array<Link>;
	color: string;
	period: {
		from: Date;
		to?: Date;
	};
	type: string;
	skills: Array<Skill>;
}

export interface Experience extends Project {
	company: string;
	location: string;
	contract: ContractType;
}

export interface PageParams {
	title: string;
}

export interface PageWithSearchParams<T> extends PageParams {
	items: Array<T>;
}

export interface HomeLink {
	platform: Platform;
	link: string;
}

export interface HomePageParams extends PageParams {
	name: string;
	lastName: string;
	description: string;
	links: Array<HomeLink>;
	skills?: Array<Skill>;
}

export type SearchPageParams = PageParams;

export type ProjectPageParams = PageWithSearchParams<Project>;

export type ExperiencePageParams = PageWithSearchParams<Experience>;

export type SkillsPageParams = PageWithSearchParams<Skill>;

export type BlogPageParams = PageWithSearchParams<Blog>;

export interface ResumePageParams extends PageParams {
	item: string;
}

export type ProfilePageParams = PageParams;

export type NavMenuItem = {
	title: string;
	to: string;
	icon: Asset;
}

export type Blog = {
	slug: string;
	category: BlogCategory;
	color: BlogCategoryColor;
	tags: Array<string>;
	experiences: Array<string>;
	projects: Array<string>;
	description: string;
	name: string;
	text: string;
	time: string;
	keywords: Array<string>;
}

export type ProfileType = {
	type: string;
	color: string;
	icon: string;
	link_format: string;
}

export type ContactInformation = {
	name: string;
	slug: string;
	type: string;
	value: string;
}

export type Profile = {
	profile_picture: string;
	full_name: string;
	intro_text: string;
	contact_info: Array<ContactInformation>;
}