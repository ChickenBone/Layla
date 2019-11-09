console.log("Wait thats not allowed ");
var id = window.location.href.split("/")[window.location.href.split("/").length - 1] != "add" ? window.location.href.split("/")[window.location.href.split("/").length - 1] : ""


function Utils() {

}

Utils.prototype = {
  constructor: Utils,
  isElementInView: function (element, fullyInView) {
    var pageTop = $(window).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).height();

    if (fullyInView === true) {
      return ((pageTop < elementTop) && (pageBottom > elementBottom));
    } else {
      return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
    }
  }
};

var Utils = new Utils();
$.getJSON("/data.json", function (json) {
  var place = document.getElementById("boxplace");
  var reasons = json.items
  var genoratedHTML = id || window.location.href.split("/")[window.location.href.split("/").length - 1] == "add" ? "" : `  <div class="container text-center justify-content-center mt-5 mb-5">
  <div class="row">
    <div class="col box box1">

      <h3 class="text-center">
        Hi Layla!
      </h3>
      <h5 class="text-center">
        I know this is super cheesy but I just had to-do it!
      </h5>
    </div>
  </div>
</div>`;
  var elements = []
  for (var i = reasons.length; i--;) {
    if (!reasons[i].hidden || window.location.href.split("/")[window.location.href.split("/").length - 1] == "add" || id) {
      if (id) {
        if (reasons[i].id == id) {
          genoratedHTML += `<div id="${reasons[i].id}" class="row">
        <div class="col box box${Math.floor(Math.random() * 5) + 1}">
        <div style="float: right;">
            <a style="text-decoration: none; color: #fff;" href="https://laylab.glitch.me/${reasons[i].id}"><i class="fas fa-link fa-lg"></i></a>
         </div>
          <h3>
          ${reasons[i].title != "" ? reasons[i].title : `reason ${i + 1}`}
          </h3>
          <h5>
            ${reasons[i].text.toLowerCase()}
          </h5>
          ${window.location.href.split("/")[window.location.href.split("/").length - 1] == "add" ? `${reasons[i].views} Views, ${reasons[i].shared} Shared` : ""}
        </div>
      </div>`;
        }
      } else {
        genoratedHTML += `<div id="${reasons[i].id}" class="row">
      <div class="col box box${Math.floor(Math.random() * 5) + 1}">
      <div style="float: right;">
      ${reasons[i].hidden ? `<a style="text-decoration: none; color: #fff;" href="/${reasons[i].id}">Hidden</a>` : ''}
      <a style="text-decoration: none; color: #fff;" href="/${reasons[i].id}"><i class="fas fa-link fa-lg"></i></a>
   </div>
        <h3>
          ${reasons[i].title != "" ? reasons[i].title : `reason ${i + 1}`}
        </h3>
        <h5>
          ${reasons[i].text.toLowerCase()}
        </h5>
        ${window.location.href.split("/")[window.location.href.split("/").length - 1] == "add" ? `${reasons[i].views} Views, ${reasons[i].shared} Shared` : ""}
      </div>
    </div>`;
      }
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
  var seen = []
  var sent = []
  window.onscroll = function (e) {
    reasons.forEach((reason) => {
      if (Utils.isElementInView($(`#${reason.id}`), false) && seen.indexOf(reason.id) < 0) {
        console.log("in view" + reason.id)
        seen.push(reason.id)
      } else {
        console.log("not view")
      }
    })
    console.log(seen)
    seen.forEach((item) => {
      if (sent.indexOf(item) < 0) {
        $.ajax({
          type: 'POST',
          url: `/view/add/${id ? 'shared' : 'views'}/${item}`,
          contentType: 'application/json',
          success: function () {
            console.log("success")
          }
        })
        sent.push(item)
      }
    })
  }
})