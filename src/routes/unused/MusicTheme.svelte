<script>
    import { Howl } from 'howler';

    let iconPath = "/icons/mute.png"

    var sound = new Howl({
        src: ['audio/music/'],
        loop: true,
        volume: 0.1,
    })

    function toggleMusic() {
        if(sound.playing() == false) {
            iconPath = "/icons/play.png"
        }
        if (sound.playing() == true ) {
            iconPath = "/icons/mute.png"
        }

        return sound.playing() ? sound.pause() : sound.play();
    }
</script>

<button on:click={() => toggleMusic()}>
    <img src={iconPath} alt="toggle theme">
</button>

<style>
	button {
        border: none;
        background: none;
        margin: 10px;
        position: absolute;
        bottom: 10px;
        left: 10px;
        z-index: 100;
	}

    img {
        height: 32px;
        width: 32px;
    }
</style>