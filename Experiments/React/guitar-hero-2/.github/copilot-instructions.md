# GitHub Copilot Instructions

This file is intended to provide context that will help GitHub Copilot better understand our project and coding style for improved suggestions and completions.
This allows us to write less in our prompts, more consistently getting the results that we want, with less back-and-forth.

## Project Overview

I want to create a web app, similar in many ways to the Guitar Hero game.
The intention here is to create a fun and interactive way for users to learn and practice guitar chords.

An embedded youtube video/song should play when the user presses play. (see embed code below)

As the song plays, the user will see the following:

A side scrolling guitar chord display which is an interactive visual interface that synchronizes chord changes with the playback of a song. Chord symbols are displayed as individual blocks or cards arranged horizontally in a timeline that moves from right to left as the music progresses. Each chord block appears at the precise moment in the song when the chord should be played and advances smoothly in time with the audio.

As the song plays, the timeline scrolls automatically, with the current chord centered or highlighted for emphasis. Each chord block includes a guitar chord diagram. Users can pause, rewind, or loop sections, and the scrolling adapts accordingly, always keeping the current chord in view.

The display is responsive to tempo changes and allows for transposing and looping. The scrolling animation remains smooth and in sync with the audio at all times.

No need for the app to listen to the user's performance.
No need for the app to provide feedback on the user's playing.
I just want the app to display the chords in time with the music.

A song needs to be represented by a JSON data structure.

Use the JSON file that I've included in the assets folder. The player should be able to read the file and display the chords in time with the music.

## Technology

- React
- CSS

All of the CSS can be written in a global stylesheet.

## Embed code for youtube video

```html
<iframe
  width="1038"
  height="584"
  src="https://www.youtube.com/embed/Za-yGR3sbNw"
  title="Defender - UPPERROOM"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>
```
