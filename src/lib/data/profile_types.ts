import type { ProfileType } from '$lib/utils/types';
import { Icons } from '$lib/utils';

const defineType = (type: string, color: string, icon: string, link_format: string): ProfileType => ({
	type,
	color,
	icon,
	link_format
});

interface ProfileTypes {
	[key: string]: ProfileType;
};

const profileTypes: ProfileTypes = {
	Email: defineType('Email', '#0000ff', Icons.Email, 'mailto:'),
	Phone: defineType('Phone', '#008000', Icons.Phone, 'tel:'),
	Instagram: defineType('Instagram', '#E4405F', Icons.Instagram, 'https://www.instagram.com/'),
	Telegram: defineType('Telegram', '#26A5E4', Icons.Telegram, 'https://t.me/'),
	X: defineType('X', '#808080', Icons.XTwitter, 'https://x.com/'),
	Reddit: defineType('Reddit', '#FF4500', Icons.Reddit, 'https://www.reddit.com/user/'),
	Discord: defineType('Discord', '#5865F2', Icons.Discord, 'https://discordapp.com/users/'),
	Linkedin: defineType('Linkedin', '#0A66C2', Icons.LinkedIn, 'https://www.linkedin.com/in/'),
	Generic: defineType('Generic', '#808080', Icons.RightArrow, ''),
};

export default profileTypes;