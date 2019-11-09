console.log("Wait thats not allowed ");
var id = window.location.href.split("/")[window.location.href.split("/").length - 1]
$.getJSON("data.json", function (json) {
  var place = document.getElementById("boxplace");
  var reasons = json.items
  var genoratedHTML = "";
  for (var i = reasons.length; i--;) {
    if (id) {

      if (reasons[i].id == id) {
        genoratedHTML += `<div class="row">
        <div class="col box box${Math.floor(Math.random() * 5) + 1}">
        <div style="float: right;">
            <a style="text-decoration: none; color: #fff;" href="https://laylab.glitch.me/${reasons[i].id}"><i class="fas fa-link fa-lg"></i></a>
         </div>
          <h3>
            reason ${i + 1}
          </h3>
          <h5>
            ${reasons[i].text.toLowerCase()}
          </h5>
        </div>
      </div>`;
      }
    } else {
      genoratedHTML += `<div class="row">
      <div class="col box box${Math.floor(Math.random() * 5) + 1}">
      <div style="float: right;">
      <a style="text-decoration: none; color: #fff;" href="https://laylab.glitch.me/${reasons[i].id}"><i class="fas fa-link fa-lg"></i></a>
   </div>
        <h3>
          reason ${i + 1}
        </h3>
        <h5>
          ${reasons[i].text.toLowerCase()}
        </h5>
      </div>
    </div>`;
    }
  }
  if (genoratedHTML == "") {
    genoratedHTML = `<div class="row">
    <div class="col box box${Math.floor(Math.random() * 5) + 1}">
      <h3>
        Awww not found
      </h3>
      <h5>
        That one was not found try again maybe?
      </h5>
    </div>
  </div>`;
  }
  place.innerHTML = genoratedHTML;
})