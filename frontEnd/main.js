
let tweetBtn = document.querySelector('#tweetBtn');

let tweetInput = document.querySelector('#tweetInput');


function fetchFeed() {
console.log(feedBox)
feedBox.innerHTML= '';
fetch('http://192.168.168.204:3000/api/tweets')
.then(res => res.json())
.then(data => {
    
   

    const feedBox = document.getElementById('feedBox'); 

    data.forEach(tweet => {
        feedBox.innerHTML += `<div id="tweet-update-box"><p>${tweet.content}</p></div>`;
    });
})
.catch(error => {
    console.error('Error fetching data:', error);
});

}


function sendtweet(event) {
    event.preventDefault()
    
    let content = {content: tweetInput.value}
  
    
    fetch('http://192.168.168.204:3000/api/tweets/write', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
        
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
    })
}


tweetBtn.addEventListener('click', sendtweet)
fetchFeed()