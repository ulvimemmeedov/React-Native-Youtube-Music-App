import React, { useState, useCallback ,useEffect,useRef} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function App() {
  const playlist = "PLiw7e6XmToGyyDNN3PnsdxoXLYGpiP1FG";
  const [playing, setPlaying] = useState(false);
  const [Volume, setVolume] = useState(50);
  const [Mute, setMute] = useState(false);
  const [btnMute, setbtnMute] = useState('Mute');
  const controlRef = useRef();
  useEffect(() => {
    setPlaying(false)
  }, [])
  const toggleMute = () =>{
    if (Mute === false) {
      setMute(true)
      setbtnMute('Unmute')
    }else{
      setMute(false)
      setbtnMute('Mute')
    }
  }
  const toggleVolumeUp = () =>{
    if (Volume < 100) {
      setVolume(Volume + 5)
    }
  } 
  const toggleVolumeDown = () =>{
      if (Volume > 0) {
        setVolume(Volume - 5)
      }
  }
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
const seekBackAndForth = (control) => {
  controlRef.current?.getCurrentTime().then((currentTime) => {
    control === 'forward'
      ? controlRef.current?.seekTo(currentTime + 15, true)
      : controlRef.current?.seekTo(currentTime - 15, true);
  });
};
const seekNextAndPrevious = (control) => {
  controlRef.current?.getCurrentTime().then((currentTime) => {
    control === 'forward'
      ? controlRef.current?.seekTo(currentTime + 505, true)
      : controlRef.current?.seekTo(currentTime - 505, true);
  });

};
  return (
    <View style={styles.list}>
      <View style={styles.playlistDetails}>
        <Text style={styles.playlistTitle}>Play List</Text>
        <Text style={styles.playlistSubtitle}>
          Ülvi Məmmədov
        </Text>
        <YoutubePlayer
        webViewProps={{
            javaScriptEnabled:true,
            domStorageEnabled:true
          }}
        initialPlayerParams={
          {
            controls: false,
            loop: false,
            preventFullScreen:false
          }
        }
        ref={controlRef}
          mute={Mute}
          volume={Volume}
          width={400}
          height={300}
          play={playing}
          playList={playlist}
          onChangeState={onStateChange}
          allowWebViewZoom={false}
          useLocalHTML={true}
        />
        <Text style={styles.vol}>
          Volume Level {Volume ? Volume : ''}
          </Text>
       <View style={styles.row}>
        <TouchableOpacity onPress={toggleVolumeUp} style={styles.volButton}>
          <Text style={styles.volButtonText}>
          Volume Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlaying} style={styles.playlistButton}>
          <Text style={styles.playlistButtonText}>
            {playing ? "pause" : "play"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleVolumeDown} style={styles.volButton}>
          <Text style={styles.volButtonText}>
          Volume Down
          </Text>
        </TouchableOpacity>
       </View>
       <TouchableOpacity onPress={toggleMute} style={styles.playlistButton}>
          <Text style={styles.volButtonText}>
          {btnMute}
          </Text>
        </TouchableOpacity>
        <View style={styles.row}>
        <TouchableOpacity onPress={() => seekBackAndForth('forward')} style={styles.volButton}>
          <Text style={styles.volButtonText}>
          forward
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => seekBackAndForth('backward')} style={styles.volButton}>
          <Text style={styles.volButtonText}>
          backward
          </Text>
        </TouchableOpacity>
        </View>
        <View style={styles.row}>
        <TouchableOpacity onPress={() => seekNextAndPrevious('forward')} style={styles.nextButton}>
          <Text style={styles.volButtonText}>
          Next
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row:{
    flexDirection:'row'
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: 600,
  },
  list: {
    width: "100%",
    height: 10000,
    backgroundColor: "#121212",
  },
  playlistDetails: {
    width: "100%",
    height: 600,
    position: "absolute",
    top: 90,
    display: "flex",
    alignItems: "center",
  },
  playlistArt: {
    top:20,
    width: 80,
    height: 80,
  },
  playlistTitle: {
    color: "#fff",
    fontSize: 30,
    marginTop: 50,
  },
  playlistSubtitle: {
    color: "#b9bdbe",
    fontSize: 12,
    marginTop: 15,
    textTransform: "uppercase",
  },
  playlistButton: {
    backgroundColor: "#2ab759",
    width: 70,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginRight:8,
    marginLeft:8,
    marginBottom:8,
    bottom:40
  },
  volButton: {
    backgroundColor: "#2ab759",
    width: 150,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    bottom:15
  },
  nextButton: {
    backgroundColor: "#2ab759",
    width: 150,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  volButtonText: {
    fontSize: 12,
    color: "#fff",
    letterSpacing: 2,
  },
  vol: {
    fontSize: 12,
    color: "#fff",
    letterSpacing: 2,
    marginBottom:50
  },
  playlistButtonText: {
    fontSize: 12,
    color: "#fff",
    letterSpacing: 2,
  },
});
