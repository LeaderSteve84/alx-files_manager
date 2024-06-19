// import { objectId } from 'mongodb';
import crypto from 'crypto';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const usersCollection = dbClient.db.collection('users');
    const userExists = await usersCollection.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = crypto.createHash('shal').update(password).digest('hex');
    const newUser = { email, password: hashedPassword };

    const result = await usersCollection.insertOne(newUser);

    return res.status(201).json({
      id: result.insertedId,
      email: newUser.email,
    });
  }
}

export default UsersController;
