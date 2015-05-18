/**
 * Created by Tsh on 5/17/2015.
 */

function readInputFields(){
    var gist = {"title":"", "description": "", "data": "", "iv": "", "salt": ""};
    gist.title =  $("#gist_title").val();
    gist.description =  $("#gist_description").val();
    gist.data =  $("#gist_data").val();
    return gist;
}

function encrypt(){
    var gist = readInputFields();
    var setup = { mode: "ccm", ks: 256 };
    var key = sjcl.codec.base64.fromBits(sjcl.random.randomWords(12));

    gist.data = JSON.parse(sjcl.encrypt(key, gist.data, setup));

    return { gist:gist, fragment:"#key=" + key };
}

function submitData(){
    return Promise.resolve(
        encrypt()
    ).then(
        function(gist) {
            return Promise.resolve(
                $.ajax({
                    type: "POST",
                    url: "/api/gists",
                    headers: {"Content-Type": "application/json"},
                    data: JSON.stringify(gist.gist)
                })
            ).then(
                function (data) {
                    window.location.href = "/gists/" + data._id + gist.fragment;
                }
            )
        }
    );
}

$(document).ready(
    function(){
        $("#gistForm").submit(
            function() {
                submitData();
                return false;
            }
        );
    }
);