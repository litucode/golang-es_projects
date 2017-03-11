var trello = "https://api.trello.com/1/";

var key = "";
var token = "";

var boards = "5892487fd52698baf84def4d";
var params = "?fields=name,idList,url,desc&key=" + key + "&token=" + token
var settings = {
    "async": true,
    "crossDomain": true,
    "url": trello + "boards/" + boards + "/cards" + params,
    "method": "GET"
}

function sendCard(data) {
    $.ajax({
        "crossDomain": true,
        "url": "https://api.trello.com/1/cards?key=5b6acc18a246b40f94d88597ee419952&token=38a6b9b749cd83f05f68eba8a9094591fcc5464c15bd76b39e2eb168669faee1",
        "method": "POST",
        "data": data
    }).done(function(response) {
        console.log(response);
        var template = `<div id="${response.id}" class="mdl-card mdl-shadow--4dp mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__title"><h3 class="mdl-card__title-text">${response.name}</h3></div><div class="mdl-card__supporting-text">${response.desc}</div></div>`
        $('#boards').append(template);
    })
}

!(function () {
    $.ajax(settings).done( function(response) {
        $.each(response, function(index, value) {
            var template = `<div id="${value.id}" class="mdl-card mdl-shadow--4dp mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__title"><h3 class="mdl-card__title-text">${value.name}</h3></div><div class="mdl-card__supporting-text">${value.desc}</div></div>`
            $('#boards').append(template);
            $('#idList').val(value.idList);
        });
    });

    $('#newCard')[0].addEventListener('submit', function (e) {
        e.preventDefault();
        var name = String($('#content__name').val());
        var desc = $('#content__desc').val();
        var url = String($('#content__url').val());
        var data = {
            "name": name,
            "desc": desc + `[Repo](${url})`,
            "idList": $('#idList').val()
        };
        sendCard(data);
    }, false);
})();