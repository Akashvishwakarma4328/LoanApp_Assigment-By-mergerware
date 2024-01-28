// server/main.js
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';

// Define a new Mongo collection for storing borrower loans
const BorrowerLoans = new Mongo.Collection('borrowerLoans');

// Define a new Mongo collection for storing lender loans
const LenderLoans = new Mongo.Collection('lenderLoans');

// Seed user data on startup
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
  'user.register': function (email, password, userType, name) {
    if (!email || !password || !name) {
      throw new Meteor.Error('invalid-credentials', 'Invalid email, password, or name');
    }

    const existingUser = Meteor.users.findOne({ 'emails.address': email });

    if (existingUser) {
      throw new Meteor.Error('email-already-exists', 'Email already exists');
    }

    const userId = Accounts.createUser({
      email,
      password,
      profile: {
        userType,
        name,
      },
    });

    if (!userId) {
      throw new Meteor.Error('registration-failed', 'User registration failed');
    }

    return userId;
  },

  'user.login': function (email, password, userType) {
    if (!email || !password) {
      throw new Meteor.Error('invalid-credentials', 'Invalid email or password');
    }

    const user = Meteor.users.findOne({ 'emails.address': email });

    if (!user) {
      throw new Meteor.Error('user-not-found', 'User not found');
    }

    const registeredUserType = user.profile?.userType;
    if (registeredUserType !== userType) {
      throw new Meteor.Error('invalid-user-type', 'Invalid user type for login');
    }

    const passwordIsValid = Accounts._checkPassword(user, password);

    if (!passwordIsValid) {
      throw new Meteor.Error('login-failed', 'Login failed. Incorrect password.');
    }

    return { userType: registeredUserType, name: user.profile?.name, userId: user._id };
  },

  'borrower.requestLoan': function (userId, loanAmount, loanPurpose) {
    const loanId = BorrowerLoans.insert({
      userId,
      loanId: Random.id(), // Generate a unique ID
      amount: loanAmount,
      purpose: loanPurpose,
      dateRequested: new Date(),
    });

    // Return the ID of the newly created loan record
    return loanId;
  },

  'borrower.getLoanHistory': function (userId) {
    const loanHistory = BorrowerLoans.find({ userId }).fetch();
    return loanHistory;
  },

  'lender.lendLoan': function (lenderId, loanAmount, loanPurpose) {
    const loanId = LenderLoans.insert({
      lenderId,
      loanId: Random.id(), // Generate a unique ID
      amount: loanAmount,
      purpose: loanPurpose,
      dateLent: new Date(),
    });

    // Return the ID of the newly created loan record
    return loanId;
  },

  'lender.getLoanHistory': function (lenderId) {
    const loanHistory = LenderLoans.find({ lenderId }).fetch();
    return loanHistory;
  },
  'admin.getBorrowerLoanHistory': function () {
    const borrowerLoanHistory = BorrowerLoans.find().fetch();
    const formattedBorrowerLoanHistory = borrowerLoanHistory.map((loan) => {
      const user = Meteor.users.findOne({ _id: loan.userId });
      return {
        username: user?.profile?.name,
        amount: loan.amount,
        purpose: loan.purpose,
        dateRequested: loan.dateRequested,
      };
    });
    return formattedBorrowerLoanHistory;
  },

  'admin.getLenderLoanHistory': function () {
    const lenderLoanHistory = LenderLoans.find().fetch();
    const formattedLenderLoanHistory = lenderLoanHistory.map((loan) => {
      const user = Meteor.users.findOne({ _id: loan.lenderId });
      return {
        username: user?.profile?.name,
        amount: loan.amount,
        purpose: loan.purpose,
        dateLent: loan.dateLent,
      };
    });
    return formattedLenderLoanHistory;
  },

  
});
