<script>
	import { supabaseClient } from '../../lib/supabase.js';
    import { playState, playTime, highscore, playerName } from '../stores.js'

	let interval;
	let delta = 0;
	let startTime;

	function resetTimer() {
		if (interval){
			clearInterval(interval);
			delta = 0;
		}
	}

	function startTimer() {
		startTime = Date.now();
		interval = setInterval(() => {
			delta = (Date.now() - startTime) / 1000
		}, 10)
	}

	function pauseTimer() {
		if (interval){
			clearInterval(interval);
		}
		if($highscore == 0.00) {
			$highscore = $playTime
		}
		if(Number($playTime) < Number($highscore)) {
			$highscore = $playTime
		}
		addScore()
	}

	async function addScore() {
		const newScore = await supabaseClient
			.from('names')
			.insert({ name: $playerName, score: Number($playTime)})
	}

	$: if ($playState === "IDLE") {
		resetTimer();
	} else if ($playState === "PLAYING") {
		startTimer();
	} else if ($playState === "DONE"){
		pauseTimer();
	}

	$:	$playTime = delta.toFixed(2);


</script>

<div>
	<p class="timer">{$playTime}</p>
	<p class="highscore">Your Highscore: {$highscore}</p>
</div>

<style>
	div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.timer {
		font-size: 22px;
		color: white;
		display: flex;
		justify-content: center;
		margin-bottom: 4px;
	}

	.highscore {
		font-size: 14px;
		color: white;
		display: flex;
		justify-content: center;
		margin-top: 0;
	}
</style>