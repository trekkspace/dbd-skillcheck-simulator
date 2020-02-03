import * as ffs from '@/js/library/math.js'
import {dom} from '@/js/domElements.js'

const skillcheckSpawnCoordinates = {
    greatSkillCheckCoordinates: {
        start: 0,
        end: 0
    },
    goodSkillCkeckCoordinates: {
        start: 0,
        end: 0
    },
    mode: ''
}

const drawSkillCheck = (greatSize, goodSize, mode) => {


    if (greatSize + goodSize > 240) {
        console.log(`The Skill Sheck cannot have more than 250 deg`)
        return
    }
    if (greatSize < 0 || goodSize < 0) {
        console.log('The Skill Check size must be positive.')
        return
    }

    let canvas = dom.skillcheck['skill-check-circle']
    let context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    var x = canvas.height / 2
    var y = canvas.width / 2
    var lineSize = 2
    var sSize = 3.6
    var radius = 65

    const rad = (deg) => {
        return (Math.PI / 180) * deg
    }

    const minRotateDegStart = 20
    const maxRotateDegStop = (240 - minRotateDegStart) - goodSize + greatSize
    let startFrom = ffs.getRandomArbitraryRange(minRotateDegStart, maxRotateDegStop, 4)
    
    skillcheckSpawnCoordinates.greatSkillCheckCoordinates.start = startFrom
    skillcheckSpawnCoordinates.greatSkillCheckCoordinates.end =
    skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.start = Number((startFrom + greatSize).toFixed(4))
    skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end = Number((startFrom + greatSize + goodSize).toFixed(4))

    skillcheckSpawnCoordinates.mode = mode

    let skillCheckColor
    let circleColor

    if (mode == 'normal') {
        skillCheckColor = circleColor = '#ffffff'
    }

    if (mode == 'hex') {
        skillCheckColor = '#B90000'
        circleColor = '#F01818'
    }

    // set the direction to anticlockwise
    var counterClockwise = false;

    // circle element
    context.beginPath()
    context.arc(
        x, 
        y, 
        radius, 
        rad(skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end), 
        rad(skillcheckSpawnCoordinates.greatSkillCheckCoordinates.start), 
        counterClockwise)

    context.lineWidth = 2
    context.strokeStyle = circleColor
    context.stroke()

    // great skillcheck
    context.beginPath()
    context.arc(
        x, 
        y, 
        radius, 
        rad(skillcheckSpawnCoordinates.greatSkillCheckCoordinates.start), 
        rad(skillcheckSpawnCoordinates.greatSkillCheckCoordinates.end), 
        counterClockwise)

    context.lineWidth = sSize * 2 + 1
    context.strokeStyle = skillCheckColor
    context.stroke()


    // good skillcheck
    // context.beginPath()
    // context.arc(x, y, radius, rad(coord.goodSkillCheck.start), rad(coord.goodSkillCheck.end), counterClockwise)

    // border bottom
    context.beginPath()
    context.arc(
        x, 
        y, 
        radius - sSize, 
        rad(skillcheckSpawnCoordinates.greatSkillCheckCoordinates.start), 
        rad(skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end), counterClockwise)
    context.lineWidth = lineSize
    context.strokeStyle = skillCheckColor
    context.stroke()

    
    // border top
    context.beginPath()
    context.arc(
        x, 
        y, 
        radius + sSize, 
        rad(skillcheckSpawnCoordinates.greatSkillCheckCoordinates.start), 
        rad(skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end), 
        counterClockwise)
    context.lineWidth = lineSize
    context.strokeStyle = skillCheckColor
    context.stroke()

    // border right
    context.beginPath()
    context.arc(
        x, 
        y, 
        radius, 
        rad(skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end) - 0.02, 
        rad(skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end), 
        counterClockwise)
    context.lineWidth = sSize * 2 + 1
    context.strokeStyle = skillCheckColor
    context.stroke()

    // border left
    context.beginPath()
    context.arc(
        x, 
        y, 
        radius, 
        rad(skillcheckSpawnCoordinates.greatSkillCheckCoordinates.start), 
        rad(skillcheckSpawnCoordinates.greatSkillCheckCoordinates.start) + 0.02, 
        counterClockwise)
    context.lineWidth = sSize * 2 + 1
    context.strokeStyle = skillCheckColor
    context.stroke()
}


export {drawSkillCheck, skillcheckSpawnCoordinates}

