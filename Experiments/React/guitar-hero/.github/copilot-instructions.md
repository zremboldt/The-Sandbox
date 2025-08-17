# GitHub Copilot Instructions

This file is intended to provide context that will help GitHub Copilot better understand our project and coding style for improved suggestions and completions.
This allows us to write less in our prompts, more consistently getting the results that we want, with less back-and-forth.

## Project Overview

I want to create a web app, similar in many ways to the Guitar Hero game.
The intention here is to create a fun and interactive way for users to learn and practice guitar chords.

As a song plays, the user will see each line of the song in time with the music.
The chords should appear above the lyrics that they align with.
Chords should be highlighted at the moment that they should be played.
As each line of the song passes, the next line should scroll up to take the place of the line before.

No need to listen to the user's performance.
No need to provide feedback on their playing.
I just want the app to display the chords in time with the music.

A song needs to be represented by a JSON data structure that includes the following information:

- Title
- Artist
- Chords (with timing information)
- Lyrics

## Technology

- React
- CSS

All of the CSS can be written in a global stylesheet.

--

## Further clarification

Let's start by making this app work for just one song.
Here are some of the lyrics:

VERSE 1
Where would I be without the cross
My sins were piled high with no way out
Underneath the weight
Of all my guilt and shame
Where would I be without the cross

CHORUS
You saved and redeemed
You delivered, You set free
You changed everything

VERSE 2
Where would I be without You, Jesus
You have done what no one else could do
Your love reached for me
And it’s better than I dreamed
No my heart belongs to only You

CHORUS
You saved and redeemed
You delivered, You set free
You changed everything

--

I want each line of the song to be a line on the screen.
When a line finishes, the next line should take its place, and so on.

A line can have more than one chord.
For example, Here's where the chords are played in relation to the lyrics I just posted.

G
Where would I be without the
C/G
cross

My
D
sins were piled
C
high with no way
G
out
G
Underneath the weight

Of
C/G
all my guilt and
G
shame
Em7
Where would I
D(add4)
be without the
G
cross

Chorus
C
You save
G
and rede
D
em

You deliver,
Em7
You set fre
C
e

You save
G
and rede
D
em

You change everyth
C
ing

You save
G
and rede
D
em

You deliver,
Em7
You set fre
C
e

You save
G
and rede
D
em

You change everything
(G)

Turnaround
|G / / / | C/G / / / |  
Verse 2
G
Where would I be without You,
C
Jesus
D
You have done what
C
no one else could
G
do
G
Your love reached for me

And it’s
C
better than I
G
dreamed
Em7
Now my heart be
D(add4)
longs to only
G
You

REPEAT CHORUS
