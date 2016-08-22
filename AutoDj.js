console.log("\n\n---===[AutoDj]===---\n AutoDj by: https://www.github.com/mindgamesnl \n---===[AutoDj]===---\n\n\n");var PlayList_songs = {}; var AutoDj = {}; AutoDj.AddedCount = 1; AutoDj.Volume = 50; AutoDj.IdOfNowPlaying = 1;
AutoDj.AddSong = function (File) {
        PlayList_songs["_" + AutoDj.AddedCount] = {"File": File};
        AutoDj.AddedCount++
        PlayList_songs["_" + AutoDj.AddedCount] = "end";
}
AutoDj.SetVolume = function (newvolume) {
        if (newvolume > 100) {
                soundManager.setVolume(100);
                AutoDj.Volume = 100;
        } else if (newvolume < 0) {
                soundManager.setVolume(0);
                AutoDj.Volume = 100;
        } else {
                soundManager.setVolume(newvolume);
              AutoDj.Volume = 100;
        }
}
AutoDj.LoadAll = function () {
        var thiscount = 1;
        while (PlayList_songs["_" + thiscount] != "end") {
                var this_item = PlayList_songs["_" + thiscount]
                AutoDj["SongData_" + thiscount] = { "File": this_item.File, "CanBePlayed": true }
                console.log("AutoDj: Song loaded with ID:" + thiscount)
                thiscount++
        }
        if (PlayList_songs["_" + thiscount] == "end") {
                var loadedcount = thiscount-1
                console.log("AutoDj: Loading done (loaded a total of " + loadedcount + " songs.)")
        }
}
AutoDj.Check = function (song_id) {
        if (AutoDj["SongData_" + song_id] != null) {
                var thisdata = AutoDj["SongData_" + song_id];
                if (thisdata.CanBePlayed === true) {
                        return true;
                } else {
                        return false;
                }
        } else {
               return false;
        }
}
AutoDj.Play = function (FNC_ID) {
      if (AutoDj.Check(FNC_ID) === true) {
             var thisdata = AutoDj["SongData_" + FNC_ID];
             AutoDj.SoundManager_Play(thisdata.File)
      } else {
             console.log("not playing")
      }
}
AutoDj.SoundManager_Play = function (fnc_file) {
        var VolumeNow = AutoDj.Volume;
        soundManager.destroySound('AutoDj');
        var mySoundObject = soundManager.createSound({
            id: "AutoDj",
            url: fnc_file,
            volume: VolumeNow,
            autoPlay: true,
            onfinish: AutoDj.PlayNext
        });
}
AutoDj.PlayNext = function () {
        var VolgendeLiedje = AutoDj.IdOfNowPlaying + 1;
        if (AutoDj.Check(VolgendeLiedje) === true) {
                AutoDj.Play(VolgendeLiedje);
                AutoDj.IdOfNowPlaying++
        } else {
                AutoDj.IdOfNowPlaying = 1;
                AutoDj.Play(AutoDj.IdOfNowPlaying);
        }
}