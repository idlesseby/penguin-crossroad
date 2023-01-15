<script>   
    import { playerName } from '../stores.js'

    let newName

    function enterName() {
        $playerName = newName.toString()
    }
</script>

<div class="container">
    <div class="input-box">
        <input type="text" bind:value={newName} placeholder="Enter a name..." autofocus maxlength="16">
        <button on:click={enterName}>Choose name</button>
    </div>
</div>

<style>
	.container {
		position: fixed;
		width: 100%;
		height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
	}

    .input-box {
        background-color: white;
        border-radius: 30px;
        border: 2px solid #EBEBEB;
        height: 110px;
        width: 645px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    input {
        background-color: #E8F1FF;
        border: none;
        border-radius: 30px;
        font-size: 22px;
        height: 60px;
        width: 340px;
        padding-left: 24px;
        margin-right: 24px;
        font-family: 'Poppins';
    }

    input::placeholder {
        color: #AAB3BE;
    }

    input:focus {
        color: #333;
    }

    button {
        background-color: #3C8AFE;
        color: white;
        border: none;
        border-radius: 30px;
        font-size: 22px;
        height: 60px;
        width: 210px;
        cursor: pointer;
        font-family: 'Poppins';
    }

    button:hover {
        background-color: #5096FF;
    }
</style>