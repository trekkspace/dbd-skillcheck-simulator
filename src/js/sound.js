import advertiseSound from '@/audio/advertise2.mp3'
import greatSound from '@/audio/great.mp3'
import goodSound from '@/audio/good.mp3'
import failedSound from '@/audio/failed.ogg'
import failedSound2 from '@/audio/failed2.ogg'
import sparksSound from '@/audio/sparks.ogg'

// import {delay} from '@/js/library/math.js'
import store from '@/store/store'
import {playerOptions} from '@/js/status/options.js'
import {skillcheckSpawnCoordinates} from '@/js/drawSkillCheck'

const audio = {
    advertise: advertiseSound,
    great: greatSound,
    good: goodSound,
    failed: failedSound,
    failed2: failedSound2,
    sparks: sparksSound
}

const playSound = track => {
    const sound = new Audio(audio[track])
    const volumeValue = playerOptions.volume.value
    sound.volume = volumeValue >= 100 ? 1 : volumeValue <= 0 ? 0 : Number(`0.${volumeValue}`)
    sound.play()
}

export default async function playTrack(track) {
    if (audio[track]) {

        if (track !== 'great' && track !== 'good' && track !== 'failed') {
            playSound(track)
        } else {
            if (track == 'great') {
                playSound(track)
            }
            if (track == 'good') {
                playSound(skillcheckSpawnCoordinates.mode == 'normal' ? 'good' : 'sparks')
            }

            if (track == 'failed' && store.state.gameStatus.now.gameMode !== 'ds') {
                const failedSounds = ['failed', 'failed2']    
                playSound(failedSounds[~~(Math.random() * failedSounds.length)])
            }
        }
    } else {
        console.log(`'${track}' sound is not defined.`)
    }
}