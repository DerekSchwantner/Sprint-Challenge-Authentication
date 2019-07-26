1. What is the purpose of using _sessions_?

ANSWER: to persist data across requests.

2. What does bcrypt do to help us store passwords in a secure manner.

ANSWER: it uses salting and then hashes the passwords, making sure they are not stored in plain text and to make it hard for attackers to attain.

3. What does bcrypt do to slow down attackers?

ANSWER: bcrypt is adaptive and over time the iteration count can increase in order to make it slower. This makes it resistant to attacks from attackers

4. What are the three parts of the JSON Web Token?
   1. header
   2. payload
   3. signature
