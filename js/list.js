var options = {
  valueNames: [ 'act-ttl', 'act-desc', 'act-contributor', 'act-tags', 'act-time', 'act-timestamp', 'act-location', 'act-type' ]
};

var filtered = false;

if(window.location.hash) {
    filtered = window.location.hash.substring(1);
    console.log(filtered);
    filtered = filtered.split("=");
}

var activList = new List('programma', options);
$(".nrfound .count").text(activList.matchingItems.length);

if ( "tag" == filtered[0] ) {
    activList.search(filtered[1]);
    $(".search").val(filtered[1]);
    updateLook();
}

function updateLook() {
    $(".nrfound .count").text(activList.matchingItems.length);
    if (0 == activList.matchingItems.length) {
        $(".noresults").show();
        $(".programma-tbl").hide();
    } else {
        $(".noresults").hide();
        $(".programma-tbl").show();
    }
}

activList.on('updated',function(){
    updateLook();
});
