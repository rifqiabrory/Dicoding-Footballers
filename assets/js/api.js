const BASE_URL = "https://api.football-data.org/v2";
const API_KEY = "f2a05993ef6d48c7b7ab3015c127a59f";

function statusResponse(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function jsonResponse(response) {
  return response.json();
}

function errorResponse(error) {
  console.error("Error at::", error);
}

function getStandingsCompetitions(idLiga) {
  if ("caches" in window) {
    caches
      .match(`${BASE_URL}/competitions/${idLiga}/standings`)
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            standingsTable(data);
          });
        }
      });
  }

  fetch(`${BASE_URL}/competitions/${idLiga}/standings`, {
    method: "GET",
    headers: {
      "X-Auth-Token": API_KEY,
    },
  })
    .then(statusResponse)
    .then(jsonResponse)
    .then((data) => {
      standingsTable(data);
    })
    .catch(errorResponse);
}

function getMatchesCompetitions(idLiga, matchDay = 1) {
  if ("caches" in window) {
    caches
      .match(`${BASE_URL}/competitions/${idLiga}/matches?matchday=${matchDay}`)
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            matchesTable(data);
          });
        }
      });
  }

  fetch(`${BASE_URL}/competitions/${idLiga}/matches?matchday=${matchDay}`, {
    method: "GET",
    headers: {
      "X-Auth-Token": API_KEY,
    },
  })
    .then(statusResponse)
    .then(jsonResponse)
    .then((data) => {
      matchesTable(data);
    })
    .catch(errorResponse);
}

function matchesTable(data) {
  let matches = "";
  data.matches.map((team) => {
    matches += `
    <div class="col s12 m6">
      <a href="./teamDetail.html?id=${team.id}">
        <div class="card">
          <div class="ribbon"><span>${team.status}</span></div>
          <div class="card-content black-text">
              <div class="team-wrapper">
                <div class="vs-team">
                  <p><strong>${team.awayTeam.name}</strong></p>
                  <p><strong>${team.homeTeam.name}</strong></p>
                </div>
                <div class="time-team">
                  <span class="card-title"><strong>FT</strong></span>
                  <p>${moment(team.utcDate).format("MMM Do YY")}</p>
                  <p>${moment(team.utcDate).format("h:mm a")}</p>
                </div>
              </div>
          </div>
        </div>
      </a>
    </div>
    `;
  });
  document.getElementById("matches").innerHTML = matches;
}

function standingsTable(data) {
  data = JSON.parse(JSON.stringify(data).replace(/http:/g, "https:"));
  let standings = "";
  data.standings[0].table.map((team, index) => {
    standings += `
      <tr>
        <td class="standingsTeamName">
          <span>${index + 1}. </span>
          <figure class="standingsTeamLogo">
              <img src="${team.team.crestUrl}" alt="${team.team.name}">
          </figure>
          <a href="./detail-team.html?id=${
            team.team.id
          }"  class="blue-grey-text text-darken-2">${team.team.name}</a>
        </td>
        <td>${team.playedGames}</td>
        <td>${team.won}</td>
        <td>${team.draw}</td>
        <td>${team.lost}</td>
        <td>${team.goalsFor}</td>
        <td>${team.goalsAgainst}</td>
        <td>${team.goalDifference}</td>
        <td>${team.points}</td>
      </tr>
    `;
  });
  let standingsEl = document.getElementById("standings");
  if (standingsEl) standingsEl.innerHTML = standings;
}

function getDetailTeam() {
  return new Promise((resolve, reject) => {
    var urlParams = new URLSearchParams(window.location.search).get("id");

    if ("caches" in window) {
      caches.match(`${BASE_URL}/teams/${urlParams}`).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            teamProfile(data);
            resolve(data);
          });
        }
      });
    }

    fetch(`${BASE_URL}/teams/${urlParams}`, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    })
      .then(statusResponse)
      .then(jsonResponse)
      .then((data) => {
        teamProfile(data);
        resolve(data);
      })
      .catch(errorResponse);
  });
}

function teamProfile(data) {
  data = JSON.parse(JSON.stringify(data).replace(/http:/g, "https:"));
  let activeCompetitions = "";
  data.activeCompetitions.map((competition) => {
    activeCompetitions += `
      <li class="collection-item">${competition.name}</li>
    `;
  });

  let squad = "";
  data.squad.map((player) => {
    squad += `
      <tr>
        <td>${player.name}</td>
        <td>${player.position ? player.position : "N/A"}</td>
      </tr>
    `;
  });

  let teamProfile = `
  <div class="card teamProfile">
    <a id="addFavorite" class="waves-effect waves-light btn light-blue lighten-1">
      Add to Favorite
    </a>
    <div class="row">
        <div class="col s12 m12" style="padding-bottom: 20px; border-bottom: 2px solid #ccc; text-align: center;">
          <figure class="teamProfileImg">
            <img src="${data.crestUrl}" alt="${data.name}">
          </figure>
          <h2>${data.name}</h2>
        </div>
        <div class="col s12 m12">
          <h3>Team Profile</h3>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>:</td>
                <td>${data.name}</td>
              </tr>
              <tr>
                <td>Short Name</td>
                <td>:</td>
                <td>${data.shortName}</td>
              </tr>
              <tr>
                <td>TLA</td>
                <td>:</td>
                <td>${data.tla}</td>
              </tr>
              <tr>
                <td>Website</td>
                <td>:</td>
                <td>${data.website}</td>
              </tr>
              <tr>
                <td>Founded</td>
                <td>:</td>
                <td>${data.founded}</td>
              </tr>
              <tr>
                <td>Venue</td>
                <td>:</td>
                <td>${data.venue}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col s12 m12">
          <h3>Active Competition</h3>
          <ul class="collection">
            ${activeCompetitions}
          </ul>
        </div>
        <div class="col s12 m12">
          <h3>Squad</h3>
          <table class="responsive-table highlight">
            <thead>
                <tr>
                    <th>Player Name</th>
                    <th>Position</th>
                </tr>
            </thead>
            <tbody>
              ${squad}
            </tbody>
          </table>
        </div>
    </div>
  </div>`;
  document.getElementById("content").innerHTML = teamProfile;
}