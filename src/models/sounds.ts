
import { SoundEffectT } from './types'

export let dingEffect: SoundEffectT = {
    type: 'effect',
    name: 'Ding',
    url: 'https://www.soundjay.com/appliances/microwave-oven-bell-1.mp3',
}

export let fireAmbient: SoundEffectT = {
    type: 'ambient',
    name: 'Fire',
    url: 'https://www.soundjay.com/nature/campfire-1.mp3',
}

export let microWaveAmbient: SoundEffectT = {
    type: 'ambient',
    name: 'MicroWave',
    url: 'https://quicksounds.com/uploads/tracks/284456059_106583227_886595706.mp3',
}

export let soundEffects: SoundEffectT[] = [
    dingEffect,
    fireAmbient,
    microWaveAmbient
]