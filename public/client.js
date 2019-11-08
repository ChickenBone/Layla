console.log("Wait thats not allowed");
$.getJSON("data.json", function (json) {
  var place = document.getElementById("boxplace");
  var reasons = json.items
  var genoratedHTML = "";
  reasons.forEach((reason, i) => {
    genoratedHTML += `<div class="row">
        <div class="col box box${Math.floor(Math.random() * 5) + 1}">
          <h3>
            reason ${i + 1}
          </h3>
          <h5>
            ${reason.text.toLowerCase()}
          </h5>
        </div>
      </div>`;
  });
  place.innerHTML = genoratedHTML;
})