import { json } from '@sveltejs/kit';
import db from '$lib/server/database.js';
import personal_info from '../../../../personal_info.json'
let default_profile_choice = personal_info.find((profile_choice) => profile_choice.is_default === true);


export async function GET({ url }) {
	const pass_key = url.searchParams.get('pass_key');

	if (pass_key !== null) {
		for (let profile_choice of personal_info) {
			if (profile_choice.pass_key === pass_key) {
				const { pass_key, profile_name, ...new_profile_choice } = profile_choice;

				const profile = await db.profileVisits.find({
					profile_name: profile_name,
				});
				if (profile.length === 0) {
					await db.profileVisits.insert({
						profile_name: profile_name,
						visits: 1,
						created_at: new Date()
					});
				} else {
					await db.profileVisits.findAndUpdate({ '$loki': profile[0].$loki }, (it) => {
						it.visits += 1;
						return it;
					});
				}
				await db.saveDatabase();

				return json(new_profile_choice);
			}
		}
	}
	const profile = await db.profileVisits.find({
		profile_name: default_profile_choice?.profile_name,
	});
	if (profile.length === 0) {
		await db.profileVisits.insert({
			profile_name: default_profile_choice?.profile_name,
			visits: 1,
			created_at: new Date()
		});
	} else {
		await db.profileVisits.findAndUpdate({ '$loki': profile[0].$loki }, (it) => {
			it.visits += 1;
			return it;
		});
	}
	await db.saveDatabase();
	return json(default_profile_choice);
}