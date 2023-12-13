#! /usr/bin/env node
const bcrypt = require('bcryptjs')

// This script populates some test users and messages to your database.
// Specified database as argument -
// e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"

// Get arguments passed on command line
const userArgs = process.argv.slice(2)

const User = require('./models/user')
const Message = require('./models/message')

const users = []
const messages = []

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const mongoDB = userArgs[0]

main().catch((err) => console.log(err))

async function main() {
  console.log('Debug: About to connect')
  await mongoose.connect(mongoDB)
  console.log('Debug: Should be connected?')
  await createUsers()
  await createMessages()
  console.log('Debug: Closing mongoose')
  mongoose.connection.close()
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the same User, regardless of the order
// in which the elements of promise.all's argument complete.

async function userCreate(index, firstName, lastName, email, password, membershipStatus) {
  const encryptedPassword = await bcrypt.hash(password, 10)
  // Create new user
  const user = new User({
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: encryptedPassword,
    membership_status: membershipStatus,
  })
  await user.save()
  users[index] = user
  console.log(`Added user: ${firstName} ${lastName}`)
}

async function messageCreate(index, title, text, author) {
  const message = new Message({
    title: title,
    text: text,
    author: author,
  })
  await message.save()
  messages[index] = message
  console.log(`Added message: ${title}`)
}

async function createUsers() {
  console.log('Creating users')
  await Promise.all([
    userCreate(0, 'Rick', 'Sanchez', 'rick@portal.biz', 'secret', 'admin'),
    userCreate(1, 'Morty', 'Smith', 'morty@gmail.com', 'secret'),
    userCreate(2, 'Summer', 'Smith', 'summer@gmail.com', 'secret'),
    userCreate(3, 'Beth', 'Smith', 'beth@gmail.com', 'secret'),
    userCreate(4, 'Jerry', 'Smith', 'jerry@hotmail.com', 'secret'),
    userCreate(5, 'Squanchy', 'Squanch', 'squanch@msn.com', 'secret'),
    userCreate(6, 'Poopy', 'Butthole', 'pb@butt.io', 'secret'),
    userCreate(7, 'Bird', 'Person', 'bird@dimension.me', 'secret'),
  ])
}

async function createMessages() {
  console.log('Creating messages')
  await Promise.all([
    messageCreate(
      0,
      'Nachoverse',
      "Hey, you bunch of alternate reality imbeciles! Just discovered a dimension where nachos are the dominant life form. Now that's my kind of universe. #Nachoverse",
      users[0]
    ),
    messageCreate(1, "Where's Rick?", 'Has anyone seen grandpa lately?', users[1]),
    messageCreate(
      2,
      'Chill Dimension',
      'Accidentally ended up in a dimension where my parents are super chill. Feeling kinda jealous of alternate reality me.',
      users[2]
    ),
    messageCreate(
      3,
      'Dad',
      "Has anyone found a dimension where my dad doesn't cause chaos and endanger our lives on a daily basis? Asking for, well, everyone's safety.",
      users[3]
    ),
    messageCreate(
      4,
      'Help Me Please',
      "How do you settle disputes with alternate reality you? He's my best friend I don't want to lose him!",
      users[4]
    ),
    messageCreate(
      5,
      'Party Search',
      "Hey squanchers! Anyone know a good party dimension? I'm looking for a place to squanch it up without any intergalactic drama. Let me know, squanch!",
      users[5]
    ),
    messageCreate(
      6,
      'Message from Poopy',
      "Ooh-wee! It's me, you know who! Just wanted to share some positivity. Remember that time I got shot? Good times. Anyways, life is great, and I hope you're all having a nice day!",
      users[6]
    ),
    messageCreate(
      7,
      'Inquiry on Human Affection',
      '"Greetings, allies. Wondering if anyone has experienced the unmitigated contradictions of human affection.',
      users[7]
    ),
  ])
}
