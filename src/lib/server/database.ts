import lokijs from 'lokijs';

const db = new lokijs("data/blog.db");

const posts = db.addCollection('posts');

const postVisits = db.addCollection('postVisits');

const saveDatabase = () => db.saveDatabase();

export default {
    posts,
    postVisits,
    saveDatabase
};