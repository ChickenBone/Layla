console.log("Wait thats not allowed");
var place = document.getElementById("boxplace");
var reasons = [
  "Your Smile is The Most Beautiful Thing On This Planet",
  "You Treat Me Amazingly and Respect and Love Me",
  "I Know I Can Grow With You",
  "You are the Nicest Person and Work With Everyone no Matter What",
  "Everyday and every second I hang out with you it is as good as the first time I fell in love with you",
  "You accept and love how cheesy I am",
  "You look forward to every day with a smile and stay happy even when the world is against you",
  "Even if I make you mad or if you hate me for sometime I know you'll be there for me in the end",
  "You are an amazing person to talk to and one of the few people I have been able to trust fully in a long time",
  "You have amazing taste in everything, except for makeup, that shouldn't ever be put on me lmaoo",
  "You are there for me when I am sad to the point where if I'm sad your sad and that really means the world to me",
  "You are really just the most amazing person for me and I am the happiest guy alive to call you mine"
];
var genoratedHTML = "";
reasons.forEach((reason, i) => {
  genoratedHTML += `<div class="row">
        <div class="col box box${Math.floor(Math.random() * 5) + 1}">
          <h3>
            reason ${i + 1}
          </h3>
          <h5>
            ${reason.toLowerCase()}
          </h5>
        </div>
      </div>`;
});

place.innerHTML = genoratedHTML;
