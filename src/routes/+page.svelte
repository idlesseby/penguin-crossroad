<script>
	import './style.css'
	import { Canvas } from '@threlte/core'
	import { World } from '@threlte/rapier'
	import { playerName } from './stores.js'
	import Timer from './ui/Timer.svelte'
	import Lights from './extra/Lights.svelte'
	import Snow from './extra/Snow.svelte'
	import StartBlock from './objects/StartBlock.svelte'
	import MovingBlock from './objects/MovingBlock.svelte'
	import FinishBlock from './objects/FinishBlock.svelte'
	import Player from './objects/Player.svelte'
	import LayerZero from './objects/LayerZero.svelte'
	import Water from './objects/Water.svelte'
	import Highscore from './ui/Highscore.svelte'
	import NameInput from './ui/NameInput.svelte';
	import Overview from './extra/Overview.svelte';
</script>


<div>
	{#if $playerName != 'anonym'}
		<Timer/>
		<Highscore/>
	{/if}

	{#if $playerName === 'anonym'}
		<NameInput/>
	{/if}

	<Canvas>
		<World>

			<Lights/>

			<Snow/>

			<LayerZero/>

			<Water/>

			<StartBlock/>
			<MovingBlock blockPosition={-6}/>
			<MovingBlock blockPosition={-12}/>
			<MovingBlock blockPosition={-18}/>
			<MovingBlock blockPosition={-24}/>
			<MovingBlock blockPosition={-30}/>
			<MovingBlock blockPosition={-36}/>
			<MovingBlock blockPosition={-42}/>
			<MovingBlock blockPosition={-48}/>
			<MovingBlock blockPosition={-54}/>
			<MovingBlock blockPosition={-60}/>
			<FinishBlock/>

			{#if $playerName != 'anonym'}
				<Player/>
			{:else}
				<Overview/>
			{/if}

		</World>
	</Canvas>
	
</div>

<style>
	div {
		height: 100vh;
		width: 100vw;
	}
</style>