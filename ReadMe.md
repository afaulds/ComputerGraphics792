# Shark Game

## How To Play
The game is a simple version of tag.  You are a shark that constantly swims forward
and you use the WASD or <up-arrow><left-arrow><down-arrow><right-arrow> to move your
shark around and try and eat the fish.  If you eat the fish you get points but you have
to avoid the sea-mines that are sinking around you.  If you hit one of those you lose
a life and 3 lives gone is a game over.

## Notes
1. Only tested on Chrome so far.  Seems to work in firefox OK and IE not at all.
2. Uploading my code to google drive and linking it.
3. Had some issues with images and "cross site image loading" and resolved that by converting the images to javascript code.
4. The sky box looks more like a sky and less like the ocean.  I could not find a great skybox image.
5. Takes a while to load at first because I add in all fish and mines in the beginning.

## Programming Concepts
### Gaming controls
I implemented just turning in this game because the playable character is a shark.  The shark
continually moves forward and I built a javascript object that catches button down and
button up events to allow for turning in both yaw and pitch directions.  I implemented
the buttons to work with the arrow keys and WASD keys as those are normal gaming keys.
If given enough time I would have added a space bar speed boost with limited use to make
it so you could speed after schools of fish or avoid the mines.

### Heads up display (HUD)
For the heads up display for this game, I added points, health a couple pop up graphics
to indicate actions and a game over screen.  These elements use HTML and absolute positioning
to float graphical elements over the 3D display window.  It gives the effect of items
constantly in the viewers window.  It also adds contextual information when things
happen like the shark lose health or eating a fish.

### Collision
For this game I used a basic spherical collision system.  Every animation cycle, the
distance between the player and each object that is collidable is calculated.
When an object comes within X distance of the players character (the shark), an appropriate
method is called to kill the fish and gain points (and trigger other HUD elements), or
take some health from the player (and trigger other HUD elements).

### Animation
For this game I added animation of the fin.  Given more time I would have animated the
entire body to give a nice smooth swimming motion but for this game I simply updated
the triangle geometry in the tail to move back and forth in a sinusoidal pattern.

### Smoothed Camera
The camera for this game is a 3rd person camera that has smoothing applied to it so that
the swimming is not jarring.  The camera smoothly transitions from following to turning
with the playable character.

### Flocking
After learning in class about flocking, I added some already built flocking code to this
project and tweaked it to work with the fish.  The fish in the game naturally flock
together and follow each other around the space.  The algorithm I used also had a nice
implementation of how to get fish to swim away from "walls" or a forced boundary to
contain them in an area but still look natural.

### SkyBox / SkySphere
I tried to find a good underwater skybox but the closest I found actually looks like the
sky.  This is just a single image wrapped on the inside of a sphere at a very large
distance from the viewer to give the illusion of far off objects and a realistic world.


