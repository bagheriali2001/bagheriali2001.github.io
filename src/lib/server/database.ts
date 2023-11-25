import lokijs from 'lokijs';

const db = new lokijs("data/blog.db");

const posts = db.addCollection('posts');

const postVisits = db.addCollection('postVisits');

const profileVisits = db.addCollection('profileVisits');

const saveDatabase = () => db.saveDatabase();

export default {
    posts,
    postVisits,
    profileVisits,
    saveDatabase
};