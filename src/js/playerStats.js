import * as ffs from '@/js/library/math.js'
import store from '../store/store'


// update the % for great, good and failed skillckecks
// for example if great = 1, good = 2, failed = 1 the % status will be great = 25%, good = 50%, failed = 25%
// basically the % will be devided across all possible score 
const playerRateStatus = (inputArr, outputArr) => {
    if (Array.isArray(inputArr) && Array.isArray(outputArr)) {
        if (inputArr.length == outputArr.length) {

            const totalScore = inputArr.map(x => store.state.playerStats.stats[x]).reduce((a, b) => a + b)
            outputArr.forEach((element, ind) => {
                store.state.playerStats.stats[element] = `${((store.state.playerStats.stats[inputArr[ind]] / totalScore) *100).toFixed(1)}%`
            })           
        } else{
            console.log('The arrays must have the same length')
        }
    } else{
        console.log('You must add only arrays')
    }
}



// rankStats()

export {playerRateStatus}