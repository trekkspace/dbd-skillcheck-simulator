import * as ffs from '@/js/library/math.js'
import {dom} from '@/js/skillchecks/dom/domElements'
import playTrack from "@/js/sound";
import {skillcheckSpawnCoordinates} from "@/js/drawSkillCheck";
import {skillCheckAnimation} from "@/js/skillchecks/dom/skillCheckAnim";
import store from "@/store/store";
//import store from "@/store/store";

const drawGlyphSkillCheck = async (props) => {
    var firstart = false;
    var minRotateDegStart = 20
    var maxRotateDegStop = (240 - minRotateDegStart) - props.successZoneSize
    var canvas = dom.skillcheck['skill-check-circle']
    var context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    if (! store.state.gameStatus.now.glyph.start){
        firstart=true;
        playTrack('advertise')
        await ffs.delay(500)
        store.state.gameStatus.now.glyph.start=true;
        store.state.gameStatus.now.glyph.last=new Date().getTime();

    }else{
        minRotateDegStart=props.now + 90
        maxRotateDegStop=props.now +250
    }

    if (props.successZoneSize < 0 || props.successZoneSize < 0) {
        console.log('The Skill Check size must be positive.')
        return
    }


    var x = canvas.height / 2
    var y = canvas.width / 2
    var lineSize = 2
    var sSize = 3.6
    var radius = 65

    const rad = (deg) => {
        return (Math.PI / 180) * deg
    }


    let startFrom = ffs.getRandomArbitraryRange(minRotateDegStart, maxRotateDegStop, 4)

    skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.start = Number((startFrom).toFixed(4))
    skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end = Number((startFrom + props.successZoneSize).toFixed(4))
    skillcheckSpawnCoordinates.mode = "normal";

    var counterClockwise = false;
    context.clearRect(0, 0, canvas.width, canvas.height)

    // circle element
    context.beginPath()
    context.arc(
        x,
        y,
        radius,
        rad(skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end),
        rad(skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.start),
        counterClockwise)

    context.lineWidth = 2
    context.strokeStyle = props.circleColor
    context.stroke()



    // border bottom
    context.beginPath()
    context.arc(
        x,
        y,
        radius - sSize,
        rad(skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.start),
        rad(skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end), counterClockwise)
    context.lineWidth = lineSize
    context.strokeStyle = props.color
    context.stroke()


    // border top
    context.beginPath()
    context.arc(
        x,
        y,
        radius + sSize,
        rad(skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.start),
        rad(skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.end),
        counterClockwise)
    context.lineWidth = lineSize
    context.strokeStyle = props.color
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
    context.strokeStyle = props.color
    context.stroke()

    // border left
    context.beginPath()
    context.arc(
        x,
        y,
        radius,
        rad(skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.start),
        rad(skillcheckSpawnCoordinates.goodSkillCkeckCoordinates.start) + 0.02,
        counterClockwise)
    context.lineWidth = sSize * 2 + 1
    context.strokeStyle = props.color
    context.stroke()
    if (firstart){
        dom.callbackComplete = props.callbackComplete;
        skillCheckAnimation.restart()
    }

}


export {drawGlyphSkillCheck, skillcheckSpawnCoordinates}

