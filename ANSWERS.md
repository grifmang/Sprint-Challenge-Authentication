- [ ] What is the purpose of using _sessions_?

-- It provides the server a way to persist data across request after successful authentication. Rather than having a user re-authenticate on each request.

- [ ] What does bcrypt do to help us store passwords in a secure manner.

-- bcrypt will hash a password with a developer determined number of salts.

- [ ] What does bcrypt do to slow down attackers?

-- It allows you, as a developer, to set a number of hash iterations, or salts. While also needing to know the hash algorithm and the hash itself.

- [ ] What are the three parts of the JSON Web Token?

-- The header, the payload and the signature.