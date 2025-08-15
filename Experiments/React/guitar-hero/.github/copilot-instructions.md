# GitHub Copilot Instructions

This file is intended to provide context that will help GitHub Copilot better understand our project and coding style for improved suggestions and completions.
This allows us to write less in our prompts, more consistently getting the results that we want, with less back-and-forth.

## Project Overview

This project is a web app, similar in many ways to the Guitar Hero game. The intention here is to create a fun and interactive way for users to learn and practice guitar chords.

## Technologies Used

- React
- CSS

All of the CSS can be written in a global stylesheet.

## PRD

A song needs to be represented by a JSON data structure that includes the following information:

- Title
- Artist
- Chords (with timing information)

As the song plays, the user will see the chords displayed on the screen.
I want each measure to display on a line, showing when to play the chords for that measure.
As the song progresses, the app will automatically scroll to keep the current measure in view.
The coming measure should be visible below the current measure and when each measure is completed, it should scroll up to make room for the next measure.

No need to listen to the user's performance.
No need to provide feedback on their playing.
I just want the app to display the chords in time with the music.
