/**
 * flash唯一id
 * 首页：8000；
 * 督导：8001，8002，8003；
 * 电视墙：8004
 */
window.YJFPlayerUrl = {
    "8000": [],
    "8001": [],
    "8002": [],
    "8003": [],
    "8004": [],
}
window.YJFPlayerFullscreenPlayerIdx = 0;
window.YJFPlayerFullscreenPlayerStatu = false;
window.YJFPlayerFullscreenPlayerParams = null;
window.YjFPlayer = {

    myBrowser: function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("trident") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1
            && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1
            && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

        if (isIE) {
            return "IE";
        }
        if (isOpera) {
            return "Opera";
        }
        if (isEdge) {
            return "Edge";
        }
        if (isFF) {
            return "FF";
        }
        if (isSafari) {
            return "Safari";
        }
        if (isChrome) {
            return "Chrome";
        }

    },

    myFlash: function (pP: any) {
        if (window.YjFPlayer.myBrowser() && window.YjFPlayer.myBrowser().indexOf("IE") > -1) {
            return document.getElementById(pP + "IE");
            // return document[pP + "IE"];
        } else {
            return document.getElementById(pP);
            // return document[pP];
        }
    },

    onPlay: function (instId: any) {
        window.YJFPlayerFullscreenPlayerStatu = false;
        window.YjFPlayer.myFlash(instId) && window.YjFPlayer.myFlash(instId).play && window.YjFPlayer.myFlash(instId).play(JSON.stringify(window.YJFPlayerUrl[instId]));
    },

    onPlay2: function (instId: any) {
        let url_json2 = [];
        url_json2[0] = Object.assign({}, window.YJFPlayerUrl[instId][window.YJFPlayerFullscreenPlayerIdx])
        delete url_json2[0].id;
        delete url_json2[0].key;
        if (url_json2[0].url.indexOf("index%3D-1") > -1) {
            url_json2[0].url = url_json2[0].url.replace(
                "index%3D-1",
                "index%3D-2"
            );
        }
        if (url_json2[0].url.indexOf("index%3D0") > -1) {
            url_json2[0].url = url_json2[0].url.replace(
                "index%3D0",
                "index%3D-2"
            );
        }  /* else if (url_json2[0].url.indexOf("index%3D-2") > -1) {
            url_json2[0].url = url_json2[0].url.replace(
              "index%3D-2",
              "index%3D0"
            );
            console.log("当前音频状态0", videoDom.muted);
          } */
        window.YJFPlayerFullscreenPlayerStatu = true
        window.YjFPlayer.myFlash(instId).play(JSON.stringify(url_json2));
    },

    /**
     * 
     * @param {*} instId 轮播flash播放器的id
     * @param {*} type 轮播类型，轮播上一条previous，轮播下一条next；默认下为next
     */
    onSlidePlay: function (instId: any, type: any) {  // 屏幕轮播，根据外部指定的url顺序，此处只展示了移动一个位置，外部可根据需要对url序列移动多个位置。
        // console.log("屏幕轮播>>>", instId)
        // console.log("屏幕轮播状态>>>", window.YJFPlayerFullscreenPlayerStatu)
        if (window.YJFPlayerFullscreenPlayerStatu) return;
        var start = 0;
        var end = window.YJFPlayerUrl[instId].length - 1;
        var tmp;
        if (type === "previous") {
            tmp = window.YJFPlayerUrl[instId][end];
            while (start < end) {
                window.YJFPlayerUrl[instId][end] = window.YJFPlayerUrl[instId][end - 1];
                end--;
            }
            window.YJFPlayerUrl[instId][start] = tmp;
        } else {
            tmp = window.YJFPlayerUrl[instId][0];
            while (start < end) {
                window.YJFPlayerUrl[instId][start] = window.YJFPlayerUrl[instId][start + 1];
                start++;
            }
            window.YJFPlayerUrl[instId][end] = tmp;
        }
        window.YjFPlayer.myFlash(instId) && window.YjFPlayer.myFlash(instId).play && window.YjFPlayer.myFlash(instId).play(JSON.stringify(window.YJFPlayerUrl[instId]));
    },

    onStop: function (instId: any) {
        window.YjFPlayer.myFlash(instId) && window.YjFPlayer.myFlash(instId).stop();
    },

    onSetVolumn: function (v: any) {
        window.YjFPlayer.myFlash("XKJKFlashPlayer").setVolumn(v, 1); // 第二个参数是指定第一个视频画面打开声音。其他画面会关闭声音。
    },


    onSetParamsByID: function (instId: any, pa: any) {
        console.log("传入参数", pa)
        if (instId == "8000") {
            pa = {
                "row": 1,
                "col": 2,
                "video_border_color": 4581884,
                "video_border_width": 1,
                "banner_bg_color": 1717581,
                "banner_bg_alpher": 0.5,
                "video_col_gap": 20,
                "video_row_gap": 0,
                "banner_font_size": 14,
                "show_footer": true,
                "show_fullscreen": false,
                "show_volume": true
            }
        } else if (instId == "8004") {
            let obj = {
                "video_border_color": 1717581,
                "video_border_width": 1,
                "banner_bg_color": 1717581,
                "banner_bg_alpher": 0.5,
                "video_col_gap": 0,
                "video_row_gap": 0,
                "banner_font_size": 14,
                "show_footer": true
            }
            if (window.YJFPlayerFullscreenPlayerParams) {
                pa = Object.assign(window.YJFPlayerFullscreenPlayerParams, obj)
            } else {
                pa = {
                    "row": 3,
                    "col": 3,
                    "video_border_color": 1717581,
                    "video_border_width": 1,
                    "banner_bg_color": 1717581,
                    "banner_bg_alpher": 0.5,
                    "video_col_gap": 0,
                    "video_row_gap": 0,
                    "banner_font_size": 14,
                    "show_footer": true
                }
            }
        } else if (instId == "8005") {
            pa = {
                "row": 1,
                "col": 1,
                "video_border_color": 1717581,
                "video_border_width": 1,
                "banner_bg_color": 1717581,
                "banner_bg_alpher": 0.5,
                "video_col_gap": 0,
                "video_row_gap": 0,
                "banner_font_size": 14,
                "show_footer": false,
                "show_fullscreen": false,
                "show_volume": true
            }
        } else {
            pa = {
                "row": 1,
                "col": 1,
                "video_border_color": 1717581,
                "video_border_width": 1,
                "banner_bg_color": 1717581,
                "banner_bg_alpher": 0.5,
                "video_col_gap": 0,
                "video_row_gap": 0,
                "banner_font_size": 14,
                "show_footer": true
            }
        }
        // console.log("设置播放器的排列参数>>>",window.YjFPlayer.myFlash(instId))
        // console.log("设置播放器的排列参数>>>",pa)
        window.YjFPlayer.myFlash(instId) && window.YjFPlayer.myFlash(instId).setParams && window.YjFPlayer.myFlash(instId).setParams(JSON.stringify(pa));
    },

    stopAllPlayer(instId: any) {
        [8001, 8002, 8003].forEach(item => window.YjFPlayer.onStop(item))
    },
    playAllPlayer(instId: any) {
        [8001, 8002, 8003].forEach(item => window.YjFPlayer.onPlay(item))
    },


    onEvent: function (str: any, instId: any, playerIdx: any) {
        console.log(str + "_" + instId + " " + playerIdx);
        if (str == "PLAYER_INIT_DONE") {
            setTimeout(window.YjFPlayer.onSetParamsByID(instId), 1)
            setTimeout(window.YjFPlayer.onPlay(instId), 1);
        } else if (str == "PLAYER_SCREEN_FULL") {
            window.YJFPlayerFullscreenPlayerIdx = playerIdx;
            if (instId == 8002 || instId == 8001 || instId == 8003) {
                setTimeout(window.YjFPlayer.stopAllPlayer(instId), 1)
            }
            setTimeout(window.YjFPlayer.onPlay2(instId), 1); //可以播放大码率
        } else if (str == "PLAYER_SCREEN_NORMAL") {
            if (instId == 8002 || instId == 8001 || instId == 8003) {
                window.YjFPlayer.playAllPlayer(instId);
            } else {
                setTimeout(window.YjFPlayer.onPlay(instId), 1); //播放小码率
            }
        } else if (str == "NetStream.Play.Stop") {

        }
    },

}

