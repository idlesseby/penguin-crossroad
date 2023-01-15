<script>
	import { LoadingManager } from 'three';
    import { supabaseClient } from '../../lib/supabase.js';

    let iconPath = "/icons/ranking.png"
    let ref

    async function getScores() {
        return await supabaseClient.from('names')
            .select('name, score')
            .order('score', { ascending: true })
            .range(0, 9)
    }

    let response = getScores()

    function updateScores() {
        response = getScores()
    }

</script>

<div class="container">
    <div bind:this={ref} class="leaderboard hidden">
        {#await response} Loading...
        {:then scores}
        <span class="title">Leaderboard:</span>
        {#each scores.data as score, i}
            <p><span class="place">{i + 1}</span> {scores.data[i].name} - {scores.data[i].score} seconds</p>
        {/each}
        {/await}
    </div>
</div>


<button  on:click={updateScores} on:click={ref.classList.toggle('hidden')}>
    <img src={iconPath} alt="toggle leaderboard">
</button>


<style>
    .container {
        position: fixed;
		width: 100%;
		height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .leaderboard {
        background-color: white;
        border-radius: 30px;
        border: 2px solid #EBEBEB;
        padding: 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .hidden {
        visibility: hidden;
    }

    .title {
        color: #333;
        font-size: 28px;
        margin: 0 0 12px 0;
    }

    .place {
        background-color: #3C8AFE;
        border-radius: 30px;
        color: white;
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 16px;
    }

    p {
        background-color: #E8F1FF;
        border-radius: 30px;
        color: #333;
        display: flex;
        font-size: 22px;
        font-weight: 300;
        padding: 8px 80px 8px 16px;
        margin: 4px 0;
        align-items: center;
    }

    button {
        border: none;
        background: none;
        margin: 10px;
        position: absolute;
        top: 8px;
        right: 16px;
        z-index: 100;
        cursor: pointer;
	}

    img {
        height: 32px;
        width: 32px;
    }
</style>