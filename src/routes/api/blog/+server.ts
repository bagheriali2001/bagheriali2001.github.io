import { json } from '@sveltejs/kit';
import db from '$lib/server/database.js';

export async function GET({ url }) {
	const slug = url.searchParams.get('slug');
	const user_unique_id = url.searchParams.get('user_unique_id');
	
	const postVisits = await db.postVisits.find({ slug: slug });
	const totalVisits = postVisits.length;
	const totalLikes = postVisits.filter((it) => it.liked).length;

	const postVisit = await db.postVisits.find({
		slug: slug,
		user_unique_id: user_unique_id,
		created_at: {
		  	$gt: new Date(Date.now() - 24 * 60 * 60 * 1000)
		}
	});

	if (postVisit.length > 0) {
		// return the existing post visit id
		const { $loki, liked } = postVisit[0];
		await db.saveDatabase();
		return json({ id: $loki, totalLikes, totalVisits, liked: liked || false }, { status: 200 });
	} else {
		// create a new post visit and return the id
		const { $loki } = await db.postVisits.insert({
			slug: slug,
			user_unique_id: user_unique_id,
			created_at: new Date()
		});
		await db.saveDatabase();
		return json({ id: $loki, totalLikes, totalVisits, liked: false }, { status: 201 });
	}
}

export async function POST({ request, url }) {
	const { is_liked } = await request.json();
	const postVisit_id = url.searchParams.get('postVisit_id');

	const postVisit = await db.postVisits.find({ '$loki': parseInt(postVisit_id) });

	if (postVisit.length > 0) {
		const { $loki } = postVisit[0];
		await db.postVisits.findAndUpdate({ '$loki': $loki }, (it) => {
			it.liked = is_liked;
			return it;
		});
		await db.saveDatabase();
		return json({ id: $loki }, { status: 200 });
	} else {
		return json({ error: "post visit not found" }, { status: 404 });
	}
}
