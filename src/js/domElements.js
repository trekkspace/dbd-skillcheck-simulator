

import {skillCheckInit} from '@/js/animations/skillcheck/skillCheckAnim'

// get all mounted DOM elements in an object element to access them more easier
let dom = {}
const initDom = (side, elements) => {
    dom[side] = elements
    skillCheckInit()
}

export {initDom, dom}