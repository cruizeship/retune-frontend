import { Audio } from "expo-av";

export class AudioPlayer {
    constructor(props) {
        this.playbackObject = null;
    }

    async playSound(url) {
        //check to see if url is define
        if (!url) {
            return;
        }
        //check to see if sound is already playing, if so pause
        if (this.playbackObject) {
            this.pauseSound();
            return;
        }
        //if not create new audio object
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const { sound } = await Audio.Sound.createAsync(
            { uri: url },
            { shouldPlay: true }
        );

        //assign local object to class data member
        this.playbackObject = sound;
    }

    //pause and unload sound
    async pauseSound() {
        if (this.playbackObject) {
            this.playbackObject.pauseAsync();
            this.playbackObject.unloadAsync();
            this.playbackObject = null;
        }
    }
}
