document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);

  loadNavigation();

  function loadNavigation() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;
        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });

        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function (elm) {
            elm.addEventListener("click", function (event) {
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "../../navigation/navigation.html", true);
    xhttp.send();
  }

  var page = window.location.hash.substr(1);
  if (page === "") page = "home";
  loadPage(page);
  loadData();

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        var content = document.querySelector("#content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }

  function loadData(){
    const key = "f2a05993ef6d48c7b7ab3015c127a59f";
    const Standings = "https://api.football-data.org/v2/competitions/2001/standings";
    const InformasiTeam = "https://api.football-data.org/v2/teams/86";//{id_tim}
    const JadwalTandingTeam = "https://api.football-data.org/v2/teams/86/matches?status=SCHEDULED";//{id_tim}

    fetch(JadwalTandingTeam, {
      method: 'GET',
      headers: {
        'X-Auth-Token': key
      }
    })
    .then(responJson => responJson.json())
    .then(result => console.log(result)).catch(err => console.log(err));
  }
});
