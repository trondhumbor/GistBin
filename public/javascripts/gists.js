/**
 * Created by Tsh on 5/17/2015.
 */

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);

    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    return hashParams;
}

function writeFields(fields){
    $("#gist_title").text(fields.title);
    $("#gist_description").text(fields.description);
    $("#gist_data").text(fields.data);
    $("pre code").each(function(i, block) {
        hljs.highlightBlock(block);
    });
}

function getGist(id){
    return Promise.resolve(
        $.ajax({
            type: "GET",
            url: "/api/gists/" + id
        })
    ).then(
        function(gist){
            var hash = getHashParams();
            gist.data = sjcl.decrypt(hash.key, JSON.stringify(gist.data), {});
            return gist;
        }
    ).then(
        function(data){
            writeFields(data);
        }
    );
}

$(document).ready(
    function() {
        var hash = window.location.hash.length;
        var location = window.location.href;
        location = location.substring(0, location.length - hash).split("/");

        var id = location[location.length - 1];
        getGist(id);
    }
);