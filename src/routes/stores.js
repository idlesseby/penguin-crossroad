import { writable } from 'svelte/store'
import { browser } from "$app/environment"

export let playState = writable("IDLE")
export let playTime = writable("0.00")
export let playerName = writable("anonym")

export let highscore = writable(browser && localStorage.getItem("highscore") || "")
highscore.subscribe(val => {
    if (browser) {
        return (localStorage.highscore = val)
    }
})