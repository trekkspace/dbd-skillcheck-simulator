const state = {
    stats: {
        generatorsCompleted: 0,
        // achievementsScore: 0,
        combo: 0,
        decisiveStrikeCombo: 0,
        rankPoints: 0,
        bloodpoints: 0,
        rowScore: 0,

        greatScore: 0,
        goodScore: 0,
        failedScore: 0,

        rateGreatScore: '0%',
        rateGoodScore: '0%',
        rateFailedScore: '0%',

        //
        dsEscape: 0,
        dsFailed: 0,

        rateDsEscape: '0%',
        rateDsFailed: '0%',
      },
      latestGame: {
          great: 0,
          good: 0,
          miss: 0
      }
}



export default {
    namespaced: true,
    state,
}