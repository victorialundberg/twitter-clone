import HttpClient from './Https.js';

async function getDataAndDisplay() {
  const url = 'HTTP://192.168.168.204:3000/api/tweets';
  const http = new HttpClient(url);
  try {
    const courses = await http.get();
    console.log(courses);

    courses.forEach((course) => {
      const courseElement = displayTweets(course);
      document.getElementById('Our-Tweets').appendChild(courseElement);
    });
  } catch (error) {
    console.log('Error getting courses:', error);
  }
}
getDataAndDisplay();

function displayTweets(tweets) {
  const card = document.createElement('div');
  card.classList.add('Our-Tweets');

  const courseTitle = document.createElement('h4');
  courseTitle.textContent = `${tweets.content}`;
  card.appendChild(courseTitle);

  return card;
}
