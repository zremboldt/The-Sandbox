// The netlifyPersonalAccessToken is in a file called config.js (gitignored)
const app = document.getElementById('app');
const url = 'https://api.netlify.com/api/v1/submissions';

fetch(`${url}?access_token=${netlifyPersonalAccessToken}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    console.log(data[0].title);
    return data.map(submission => {
      let li = document.createElement('li');
      let h3 = document.createElement('h3');
      let message = document.createElement('span');

      h3.innerHTML = `${submission.name} says:`;
      message.innerHTML = submission.body;

      li.appendChild(h3);
      li.appendChild(message);
      app.appendChild(li);
    });
  })
  .catch(err => {
    console.log('Something went wrong: ', err);
  });
