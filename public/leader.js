function Leaderboard(container) {
  var self = this;

  this.candidates = [
    {
      name: "Tyrion Lannister",
      description: "House Lannister of Casterley Rock, Exiled",
      color: "#e53935",
    },
    {
      name: "Euron Greyjoy",
      description: "House Greyjoy of Pyke",
      color: "#424242",
    },
    {
      name: "Petyr Baelish",
      description: "House Baelish of Harrenhall",
      color: "#4caf50",
    },
    {
      name: "Jon Stark",
      description: "F.K.A. Jon Snow, House Stark of Winterfell",
      color: "#607d8b",
    },
    {
      name: "Daenerys Targaryen",
      description: "House Targaryen of Dragonstone, Exiled",
      color: "#d32f2f",
    },
    {
      name: "Brynden Tully",
      description: "House Tully of Riverrun",
      color: "#2196f3",
    },
    {
      name: "Stannis Baratheon",
      description: "House Baratheon of Dragonstone",
      color: "#f4511e",
    },
    {
      name: "Arya Stark",
      description: "House Stark of Winterfell",
      color: "#757575",
    },
    {
      name: "Hodor",
      description: "Hodor Hodor hodor Hodor",
      color: "#673ab7",
    },
  ];

  this.initData();

  this._totalVotes = d3.sum(this.candidates, function (d) {
    return d.votes;
  });

  this._scale = d3.scale
    .linear()
    .domain([
      0,
      d3.max(this.candidates, function (d) {
        return d.votes;
      }),
    ])
    .range([0, 100]);

  this._boxes = container.selectAll("div.candidate").data(this.candidates);

  this._boxes
    .enter()
    .append("div")
    .attr("class", "candidate")
    .style("background", function (d) {
      return d3.rgb(d.color).hsl().brighter(0.8).toString();
    })
    .html(function (d) {
      var percent = (d.votes / self._totalVotes) * 100;
      return (
        '<h2 class="candidate__name">' +
        d.name +
        "</h2>" +
        '<span class="candidate__description">' +
        d.description +
        "</span>" +
        '<span class="candidate__percent">' +
        d3.round(percent, 1) +
        "%</span>" +
        '<div class="candidate__bar" style="width: ' +
        self._scale(d.votes) +
        "%; background: " +
        d.color +
        '"></div>'
      );
    });

  this.update(0);
}

Leaderboard.prototype.initData = function () {
  this.candidates.forEach(function (candidate) {
    candidate.votes = Math.floor(Math.random() * 400);
  });

  this.candidates.sort(function (a, b) {
    return d3.descending(a.votes, b.votes);
  });
};

Leaderboard.prototype.update = function (duration) {
  var self = this;

  // Add a random number of votes, proportional to their current number of votes
  this.candidates.forEach(function (candidate) {
    candidate.votes += Math.ceil(
      (candidate.votes / self._totalVotes) * 200 * Math.random()
    );
  });

  // Re-calc things with the new vote numbers

  this._totalVotes = d3.sum(this.candidates, function (d) {
    return d.votes;
  });

  this._scale.domain([
    0,
    d3.max(this.candidates, function (d) {
      return d.votes;
    }),
  ]);

  // Redraw/update displayed values

  this._boxes.select(".candidate__bar").style("width", function (d) {
    return self._scale(d.votes) + "%";
  });

  this._boxes
    .select(".candidate__percent")
    .transition()
    .duration(duration)
    .ease("linear")
    .tween("text", function (d) {
      var i = d3.interpolateNumber(
        (Number(this.getAttribute("data-votes")) / self._totalVotes) * 100,
        (d.votes / self._totalVotes) * 100
      );
      return function (t) {
        this.textContent = d3.format(".1f")(i(t), 1) + "%";
      };
    })
    .each("end", function () {
      d3.select(this).attr("data-votes", function (d) {
        return d.votes;
      });
    });

  this._boxes.sort(function (a, b) {
    return d3.descending(a.votes, b.votes);
  });
};

var leaderboard = new Leaderboard(d3.select("#results"));

window.setInterval(function () {
  leaderboard.update(1000);
}, 1000);

var header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.style.transform = "translate(0," + window.pageYOffset / 2 + "px)";
});
