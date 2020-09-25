import { Mode } from './types'
import * as sounds from './sounds'

export const cook: Mode = {
    name: 'cook',
    color: 'red',
    timer: 1500,
    speed: 0.5,
    effect: sounds.dingEffect,
    ambient: sounds.fireAmbient,
}

export const timer: Mode = {
    name: 'timer',
    color: 'green',
    timer: 150,
    speed: 2,
    effect: sounds.dingEffect,
    ambient: sounds.microWaveAmbient,
}

export const clock: Mode = {
    name: 'clock',
    color: 'red',
    timer: 250,
    speed: 3,
    effect: sounds.dingEffect,
    ambient: sounds.fireAmbient,
}

export const popcorn: Mode = {
    name: 'popcorn',
    color: 'green',
    timer: 450,
    speed: 4,
    effect: sounds.dingEffect,
    ambient: sounds.microWaveAmbient,
}

export const potato: Mode = {
    name: 'potato',
    color: 'red',
    timer: 150,
    speed: 5,
    effect: sounds.dingEffect,
    ambient: sounds.fireAmbient,
}

export const beverage: Mode = {
    name: 'beverage',
    color: 'red',
    timer: 15,
    speed: 6,
    effect: sounds.dingEffect,
    ambient: sounds.fireAmbient,
}

export const reheat: Mode = {
    name: 'reheat',
    color: 'red',
    timer: 100,
    speed: 7,
    effect: sounds.dingEffect,
    ambient: sounds.microWaveAmbient,
}

export const defrost: Mode = {
    name: 'defrost',
    color: 'green',
    timer: 90,
    speed: 8,
    effect: sounds.dingEffect,
    ambient: sounds.microWaveAmbient,
}

export const power: Mode = {
    name: 'power',
    color: 'red',
    timer: 30,
    speed: 9,
    effect: sounds.dingEffect,
    ambient: sounds.fireAmbient,
}

