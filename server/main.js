import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});

Meteor.methods({
  'user.register': function (email, password) {
    // Validate email and password
    if (!email || !password) {
      throw new Meteor.Error('invalid-credentials', 'Invalid email or password');
    }

    // Check if the user with the given email already exists
    if (Meteor.users.findOne({ 'emails.address': email })) {
      throw new Meteor.Error('email-already-exists', 'Email already exists');
    }

    // Create a user account
    const userId = Accounts.createUser({
      email: email,
      password: password,
    });

    if (!userId) {
      throw new Meteor.Error('registration-failed', 'User registration failed');
    }

    return userId;
  },
});

Meteor.methods({
  'user.login': function (email, password) {
    // Validate email and password
    if (!email || !password) {
      throw new Meteor.Error('invalid-credentials', 'Invalid email or password');
    }

    const user = Meteor.users.findOne({ 'emails.address': email });

    if (!user) {
      throw new Meteor.Error('user-not-found', 'User not found');
    }

    // Check password
    const passwordIsValid = Accounts._checkPassword(user, password);

    if (!passwordIsValid) {
      throw new Meteor.Error('login-failed', 'Login failed. Incorrect password.');
    }

    // Log in the user
    this.setUserId(user._id);

    // Additional logic after successful login (if needed)
  },
});
