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
    userCreate(0, 'Rick', 'Sanchez', 'rick@example.com', 'secret', 'admin'),
    userCreate(1, 'Morty', 'Smith', 'morty@example.com', 'secret'),
    userCreate(2, 'Summer', 'Smith', 'summer@example.com', 'secret'),
    userCreate(3, 'Beth', 'Smith', 'beth@example.com', 'secret'),
    userCreate(4, 'Jerry', 'Smith', 'jerry@example.com', 'secret'),
  ])
}

async function createMessages() {
  console.log('Creating messages')
  await Promise.all([
    messageCreate(0, 'Message from Rick', 'This is a message from Rick', users[0]),
    messageCreate(1, 'Message from Morty', 'This is a message from Morty', users[1]),
    messageCreate(2, 'Message from Summer', 'This is a message from Summer', users[2]),
    messageCreate(3, 'Message from Beth', 'This is a message from Beth', users[3]),
    messageCreate(4, 'Message from Jerry', 'This is a message from Jerry', users[4]),
  ])
}
