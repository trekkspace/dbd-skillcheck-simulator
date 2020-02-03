
const delay = ms => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const getRandomArbitraryRange = (min, max, fixed) => {
    // console.log(`${typeof min} - ${typeof max}`)
    return Number((Math.random() * (max - min) + min).toFixed(fixed || 0))
}

const cleanLetters = word => {
    return Number(word.replace(/[^\d.]/g, ''))
}

const outOf = (value, from) => {
    return Math.ceil((value * 100) / from) // %
}



export {delay, getRandomArbitraryRange, cleanLetters, outOf}