# Root Work Sample – Web Developer

**Zac Remboldt**  
10 years a designer – now a Javascript developer.  
https://www.zacremboldt.com/

---

In addition to the requested tarball I sent via Dropbox, I also setup continuous deployment from a private Git repo.  
**Here’s the live site:** https://zacremboldt-worksample.netlify.com

&nbsp;  
&nbsp;

## How to run the project locally

You'll need the Gatsby CLI

```sh
npm  install -g gatsby-cli
```

Then navigate into the root of the site directory and install the dependencies.

```sh
npm install
```

Then run the project.

```sh
gatsby develop
```

The site will be running at `http://localhost:8000`.
If you make any edits to the code the browser will update in real time.

&nbsp;  
&nbsp;

## Tools Used

**Framework:** Gatsby/React  
**Styles:** Sass  
**Animation:** Standard CSS Transitions/Animations

### Why Gatsby / React?

In the project expectations it says “we're looking for a little more structure than what the problem actually necessitates”. This prompted me to think beyond the scope of what’s here and imagine the parts that may be connected to this splash page.

Since the call-to-action invites the user to get a quote, I imagine there will be lots of opportunity for dynamic data on the following page. Possibly sliders and animated infographics (something along these lines: https://codepen.io/davidkpiano/pen/xLKBpM) which would allow users to customize their quote based on certain criteria. With the added complexity, React allows us to break the project down into organized components and makes interaction with dynamic data easier to handle.

It may seem like overkill or like you’re adding weight by using Gatsby rather than just using standard HTML, CSS and JS but in the end Gatsby generates these standard files and does it all with performance in mind. If you go into the Chrome dev-tools run a Lighthouse audit on the deployed site you’ll see it scores 100s or near 100s across the board (performance, accessibility, best practices, seo).

### Why Sass?

I am not opposed to CSS in JS and have played with a couple of libraries (Styled Components and Emotion) but I’ve opted to wait a bit and watch the industry decide on a winner and some best practices before I commit the resources to really dive into it.

I’ve also not yet been in a team setting where some of the benefits of CSS in JS really shine. I’d love to build/work with a React Storybook style toolbox of components that are each self contained in a single .js file. That being said, I’m comfortable with Sass so that’s what I’m using at the moment.

**Organization of CSS properties on an element - My thought process:**

1. Properties that define layout, positioning and sizing are at the top.
2. Properties that are more cosmetic such as colors, fonts and shadows are generally arranged alphabetically below layout properties.
3. Properties that define transitions and animations are at the bottom.

&nbsp;  
&nbsp;

## Process / Challenges

### Hero Image

The square aspect ratio of the hero image (right side) didn’t crop nicely in all situations. The top and bottom of the image was being chopped beyond acceptable limits on wide screens. I considered two options to solve this:

1. Maintain the aspect ratio of the image by scaling the image/container width. This would leave a larger white space (left) on certain screens. I decided against this because I wanted to maintain a rule of thirds for the page composition. (1/3 white space, 2/3 hero image)

2. I opted for option 2 and extended the width of the svg illustration taking it from a square 950x950 to 1200x950 (I adjusted points within Figma and did not stretch the image). This maintains the rule of thirds and is a more elegant solution within the code as well requiring only 3 CSS properties.

### Idea

The hero image made me think of an animated svg illustration in the header of Sentry’s site, https://sentry.io. It could be interesting in the future to do something similar that makes sense for auto insurance.

### Fonts

I didn’t have the font family, Root Sans but was able to go into the Chrome dev tools and pull it out of the network requests from joinroot.com as the site loaded.

### Loading Screen

I didn’t receive any artwork or description for how the loading screen should look so I had a bit of fun designing a simple responsive loader. I drew on the little bit I’ve learned about the Root design system and branding that I’ve observed on the website and tried to keep the loader within that family.

### IE was a challenge

I was getting a cryptic JS error in the console and eventually discovered it was a problem with one of my dependencies (React Spring) which I was using to animate the mounting of the loading page. After some effort to solve the problem, I stripped the dependency out and came up with a CSS solution which, in the end, I was even happier with.

I've supported the latest version of IE. If you need support for IE 10 let me know, I'll just have to polyfill for `Set`.

&nbsp;  
&nbsp;

## Items for Review

I did deviate from the spec’d artwork in a few instances where I felt it made sense. Look for comments labeled `REVIEW` in the code. I’ll list them here as well.

- **Nav shadow:** I opted to use transparency rather than an opaque gray for the navbar shadow. I feel that the transparency looks better over the hero image.

- **Subtle button shadow:** The artwork did not call for a box shadow on this button but I see them commonly used on joinroot.com and feel it adds a nice touch of depth. I used the subtle shadow spec’d in the Root design system (Figma).

- **Logo color:** The artwork calls for `#231F20` as the logo color but we could increase consistency if we use nearBlack as spec'd in the Root design system.

- **Call-to-action group:** Centered the call-to-action group within the given white space.

&nbsp;  
&nbsp;

## Testing

To start with I’m using ES Lint with Airbnb’s style guide and Prettier to prompt me on syntax and best practices. I would like to learn and evaluate TypeScript but just haven’t gotten to it yet…

I manually tested for cross browser compatibility in:  
Chrome, Safari, Firefox, Edge, IE 11, Chrome mobile and Safari mobile.

Beyond this, I'll be honest, I don’t have a lot of experience writing tests… yet. I’m three years into programming, been going at it hard and I learn what I need when I need it. So far I haven’t felt the pain from not testing so it hasn’t reached the top of my learning priority list (I know it’s important).

I am hungry to learn though and am now actively working to fill that gap. This week I started a course on testing by Kent C. Dodds. He covers JS testing, from writing tests from scratch, to using a testing framework (Jest).

I hope you’ll see the quality of the rest of my work and all that I’ve learned in the past 3 years and will be willing to let me grow into learning testing with you.

&nbsp;  
&nbsp;

## Conclusion

I'm sorry for writing a book :) I know one of the big things you're interested in determining through this project is how I think through and solve problems.

I had a great time working on this little project. If you have any questions or critique please let me know. I would love the opportunity to speak with and learn from your team!

Thank you!

**Zac Remboldt**  
https://www.zacremboldt.com/
