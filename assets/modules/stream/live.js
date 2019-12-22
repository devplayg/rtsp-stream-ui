$(function() {
    checkLiveCameras();

    function checkLiveCameras() {
        $.ajax({
            url: prefix+"/videos",
        }).done(function(result) {
            if (result.streams.length < 1) {
                return;
            }

            updateLiveVideos(result.streams);
        });
    }

    function updateLiveVideos(streams) {
        $.each(streams, function(i, s) {
            console.log(s);
            let player = videojs('live'+s.id, {
                controls: true,
                autoplay: false,
                preload: 'auto',
                // liveui: true,
            });

            player.src({
                "type": "application/x-mpegURL",
                "src": prefix+"/videos/" + s.id + "/live/m3u8"
            });
            player.ready(function() {
                player.muted(true);
                player.play();
            });
        });
    }
    //
    // function updateLiveLayout(streams) {
    //     let $videos = $("<div/>", {
    //         class: "row",
    //     });
    //     $.each(streams, function(i, s) {
    //         // console.log(s);
    //         let $col = $("<div/>", {
    //             class: "col-lg-4",
    //         });
    //         let $videoJs = $("<video-js/>", {
    //             id: "live"+s.id,
    //             width: "auto",
    //             height: "auto",
    //             class: "vjs-default-skin vjs-fluid",
    //         }).appendTo($col);
    //         $("<source/>", {
    //             src:  prefix+"/videos/" + s.id + "/live/m3u8",
    //             type:  "application/x-mpegURL",
    //         }).appendTo($videoJs);
    //
    //         $videos.append($col);
    //         // console.log(s);
    //
    //     });
    //     console.log( $videos );
    //
    //
    //     // let $row = $("<div/>", {
    //     //     class: "row",
    //     // });
    //     // $row.append($videos);
    //     $("#cameras").empty().append($videos);
    //     $.each(streams, function(i, s) {
    //         videojs('live'+s.id, {liveui: true});
    //     });
    // }
});