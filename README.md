## What's the change?
- Added subjects, so now the questions are asked from specific domains.
- Consecutively the questions database was changed.
- Initially all guesses were 5 letter long, but now number of letters/boxes per guess are dynamically set as the number of letters of the answer vary.
- Only thoses questions were added to database whose answers didn't have spaces or special symbols.

## Data We Need to Track

**Solution:**
- 5 letter string, e.g. 'drain'

**Past Guesses:**
- An array of past guesses
- Each past guess is an array of letter objects [{}, {}, {}, {}, {}]
- Each object represents a letter in the guess word {letter: 'a', color: 'yellow'}

**Current Guess:**
- String 'hello'

**Keypad Letters:**
- Array of letter objects [{key: 'a', color: 'green'}, {}, {} ...]

**Number of Turns:**
- An integer 0 - 6

## Game Process

### Entering Words:
- User enters a letter & a square is filled with that letter
- When a user hits delete it deletes the previous letter
- When a user hits enter it submits the word
  - If all squares are not filled with letters then the word is not submitted
  - If that word has already been used in a previous guess then the word is not submitted

### Checking Submitted Words:
- Each letter is checked to see if it matches the solution
- Each letter is assigned a color based on its inclusion in the solution
  - Exact matches (correct position in the solution) are green
  - Partial matches (in the solution but not the correct position) are yellow
  - None-matches (not in the solution at all) are grey
- The guess is added to the grid with the correct colors
- The current guess moves to the next row
- The keypad letters are updated (colors)

### Ending the Game:
- When the guessed word fully matches the solution
  - Modal to say 'well done'
- When the user runs out of guesses
  - Modal to say 'unlucky'


## db.json process:
```bash
    npm install -g json-server		#install json server globally

    npx json-server ./data/db.json --port 3001	#json file ready for fetch from port 3001
```

## TO START:
```bash
    #start db server
    npx json-server ./data/db.json --port 3001
    
    #start app
    npm run start
```