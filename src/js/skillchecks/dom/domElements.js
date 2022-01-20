

import {skillCheckInit} from '@/js/skillchecks/dom/skillCheckAnim'

// get all mounted DOM elements in an object element to access them more easier
let dom = {
    callbackComplete:()=>{},
}
const initDom = (side, elements) => {
    dom[side] = elements
    skillCheckInit()
}

export {initDom, dom}
