const repairSpeedPercentages = {
    default: 0,
    slightly: 10,
    moderately: 15,
    considerably: 20,
    tremedously: 25
}

const successZonePercentages = {
    default: 0,
    slightly: 10,
}

const toolPrices = {
    common: 3000,
    uncommon: 4000,
    rare: 5000,
    veryRare: 6000,
    ultraRare: 7000
}

const free = false
const sale = 50

const toolboxes = {
    wornOutTools: {
        rarity: 'common',
        what: 'toolbox',
        name: 'wornOutTools',
        easyName: 'Worn-Out Tools',
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.common,
        
        charges: 80,
        repairSpeed: repairSpeedPercentages.moderately,
        successZone: -successZonePercentages.slightly,
        description: 
        `
        <h2 class='p-item-name'>Worn-Out Tools</h2>
        <ul class='p-item-status'>
            <li class='p-item-true'>80 charges.</li>
            <li class='p-item-true'>Moderately increases repair speed.</li>
            <li class='p-item-true'>Slightly decreases Skill Check success zones.</li>
            <li class='p-item-false'>Unlocks the sabotage action.</li>
        </ul>
        `

    },
    toolbox: {
        rarity: 'uncommon',
        what: 'toolbox',
        name: 'toolbox',
        easyName: 'Toolbox',
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.uncommon,

        charges: 130,
        repairSpeed: repairSpeedPercentages.moderately,
        successZone: successZonePercentages.default,
        description: 
        `
        <h2 class='p-item-name'>Toolbox (Item)</h2>
        <ul class='p-item-status'>
            <li class='p-item-true'>130 charges.</li>
            <li class='p-item-true'>Moderately increases repair speed.</li>
            <li class='p-item-false'>Unlocks the sabotage action.</li>
        </ul>
        `
    },
    mechanicsToolbox: {
        rarity: 'rare',
        what: 'toolbox',
        name: 'mechanicsToolbox',
        easyName: `Mechanic's Toolbox`,
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.rare,

        charges: 80,
        repairSpeed: repairSpeedPercentages.considerably,
        successZone: successZonePercentages.default,
        description: 
        `
        <h2 class='p-item-name'>Mechanic's Toolbox</h2>
        <ul class='p-item-status'>
            <li class='p-item-true'>80 charges.</li>
            <li class='p-item-true'>Considerably increases repair speed.</li>
            <li class='p-item-false'>Moderately reduces sabotage speed.</li>
            <li class='p-item-false'>Unlocks the sabotage action.</li>
        </ul>
        `
        
    },
    commodiousToolbox: {
        rarity: 'rare',
        what: 'toolbox',
        name: 'commodiousToolbox',
        easyName: 'Commodious Toolbox',
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.rare,

        charges: 180,
        repairSpeed: repairSpeedPercentages.moderately,
        successZone: successZonePercentages.default,
        description: 
        `
        <h2 class='p-item-name'>Commodious Toolbox</h2>
        <ul class='p-item-status'>
            <li class='p-item-true'>180 charges.</li>
            <li class='p-item-true'>Moderately increases repair speed.</li>
            <li class='p-item-false'>Unlocks the sabotage action.</li>
        </ul>
        `
    },
    engineersToolbox: {
        rarity: 'very rare',
        what: 'toolbox',
        name: 'engineersToolbox',
        easyName: `Engineer's Toolbox`,
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.veryRare,

        charges: 80,
        repairSpeed: repairSpeedPercentages.tremedously,
        successZone: successZonePercentages.default,
        description: 
        `
        <h2 class='p-item-name'>Engineer's Toolbox</h2>
        <ul class='p-item-status'>
            <li class='p-item-true'>80 charges.</li>
            <li class='p-item-true'>Tremendously increases repair speed.</li>
        </ul>
        `
    },
    alexsToolbox: {
        rarity: 'very rare',
        what: 'toolbox',
        name: 'alexsToolbox',
        easyName: `Alex's Toolbox` ,
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.veryRare,

        charges: 130,
        repairSpeed: repairSpeedPercentages.slightly,
        successZone: successZonePercentages.default,
        description: 
        `
        <h2 class='p-item-name'>Alex's Toolbox</h2>

        <ul class='p-item-status'>
            <li class='p-item-true'>130 charges.</li>
            <li class='p-item-true'>Slightly increases repair speed.</li>
            <li class='p-item-false'>Moderately increases sabotage speed.</li>
        </ul>
        `
    }
}

const toolboxAddOns = {
    springClamp: {
        stacks: false,
        rarity: 'common',
        what: 'addOn',
        name: 'springClamp',
        easyName: `Spring Clamp` ,
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.common,

        charges: 0,
        repairSpeed: repairSpeedPercentages.default,
        successZone: successZonePercentages.slightly,
        description: 
        `
        <h2 class='p-item-name'>Spring Clamp</h2>
        <ul class='p-item-status'>
            <li class='p-item-true'>Slightly increases repair Skill Check success zones.</li>
            <li class='p-item-true'>Stacks: No.</li>
        </ul>
        `
    },
    scraps: {
        stacks: true,
        rarity: 'common',
        what: 'addOn',
        name: 'scraps',
        easyName: `Scraps` ,
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.common,

        charges: 15,
        repairSpeed: repairSpeedPercentages.default,
        successZone: successZonePercentages.default,
        description: 
        `
        <h2 class='p-item-name'>Scraps</h2>
        <ul class='p-item-status'>
            <li class='p-item-true'>Adds 15 charges to the Toolbox.</li>
            <li class='p-item-true'>Stacks: Yes.</li>
        </ul>
        `
    },
    cleanRag: {
        stacks: true,
        rarity: 'common',
        what: 'addOn',
        name: 'cleanRag',
        easyName: `Clean Rag` ,    
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.common,

        charges: 0,
        repairSpeed: repairSpeedPercentages.slightly,
        successZone: successZonePercentages.default,
        description: 
        `
        <h2 class='p-item-name'>Clean Rag</h2>
        <ul class='p-item-status'>
            <li class='p-item-true'>Slightly increases the Toolbox's repair speed.</li>
            <li class='p-item-true'>Stacks: Yes.</li>
        </ul>
        `
    },
    wireSpool: {
        stacks: true,
        rarity: 'uncommon',
        what: 'addOn',
        name: 'wireSpool',
        easyName: `Wire Spool` ,
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.uncommon,
        
        charges: 30,
        repairSpeed: repairSpeedPercentages.default,
        successZone: successZonePercentages.default,
        description: 
        `
        <h2 class='p-item-name'>Wire Spool</h2>
        <ul class='p-item-status'>
            <li class='p-item-true'>Adds 30 charges to the Toolbox.</li>
            <li class='p-item-true'>Stacks: Yes.</li>
        </ul>
        `
    },
    socketSwivels: {
        stacks: true,
        rarity: 'uncommon',
        what: 'addOn',
        name: 'socketSwivels',
        easyName: `Socket Swivels` ,
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.uncommon,

        charges: 0,
        repairSpeed: repairSpeedPercentages.moderately,
        successZone: successZonePercentages.default,
        description: 
        `
        <h2 class='p-item-name'>Socket Swivels</h2>
        <ul class='p-item-status'>
            <li class='p-item-true'>Moderately increases the Toolbox repair speed.</li>
            <li class='p-item-true'>Stacks: Yes.</li>
        </ul>
        `
    },
    protectiveGloves: {
        stacks: true,
        rarity: 'uncommon',
        what: 'addOn',
        name: 'protectiveGloves',
        easyName: `Protective Gloves` ,
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.uncommon,

        charges: 0,
        repairSpeed: repairSpeedPercentages.default,
        successZone: successZonePercentages.default,
        description: 
        `
        <h2 class='p-item-name'>Protective Gloves</h2>
        <ul class='p-item-status'>
            <li class='p-item-false'>Slightly increases the chances to trigger a sabotage Skill Check.</li>
            <li class='p-item-false'>Slightly increases sabotage Skill Check success zones.</li>
            <li class='p-item-false'>Considerably reduces the sabotage Skill Check failed penalty.</li>
            <li class='p-item-true'>Stacks: Yes.</li>
        </ul>
        `
    },
    instructions: {
        stacks: true,
        rarity: 'uncommon',
        what: 'addOn',
        name: 'instructions',
        easyName: `Instructions` ,
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.uncommon,

        charges: 0,
        repairSpeed: repairSpeedPercentages.moderately,
        successZone: successZonePercentages.default,
        description: 
        `
        <h2 class='p-item-name'>Instructions</h2>
        <ul class='p-item-status'>
            <li class='p-item-true'>Moderately increases the Toolbox's repair efficiency.</li>
            <li class='p-item-true'>Stacks: Yes.</li>
        </ul>
        `
    },
    gripWrench: {
        stacks: true,
        rarity: 'uncommon',
        what: 'addOn',
        name: 'gripWrench',
        easyName: `Grip Wrench` ,
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.uncommon,

        charges: 0,
        successZonePercentages: repairSpeedPercentages.moderately,
        repairSpeed: repairSpeedPercentages.default,
        successZone: successZonePercentages.default,
        description: 
        `
        <h2 class='p-item-name'>Grip Wrench</h2>
        <ul class='p-item-status'>
            <li class='p-item-true'>Moderately increases repair Skill Check success zones.</li>
            <li class='p-item-true'>Stacks: Yes.</li>
        </ul>
        `
    },
    cuttingWire: {
        stacks: false,
        rarity: 'uncommon',
        what: 'addOn',
        name: 'cuttingWire',
        easyName: `Cutting Wire` ,
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.uncommon,

        charges: 0,
        repairSpeed: repairSpeedPercentages.default,
        successZone: successZonePercentages.default,
        description: 
        `
        <h2 class='p-item-name'>Cutting Wire</h2>
        <ul class='p-item-status'>
            <li class='p-item-false'>Slightly increases the Toolbox's sabotage speed.</li>
            <li class='p-item-true'>Stacks: No.</li>
        </ul>
        `
    },
    hacksaw: {
        stacks: true,
        rarity: 'rare',
        what: 'addOn',
        name: 'hacksaw',
        easyName: `Hacksaw`,
        bloodpoints: free ? 0 : (sale / 100) * toolPrices.rare,
        
        charges: 0,
        repairSpeed: repairSpeedPercentages.default,
        successZone: successZonePercentages.default,
        description: 
        `
        <h2 class='p-item-name'>Hacksaw</h2>
        <ul class='p-item-status'>
            <li class='p-item-false'>Moderately increases the Toolbox's sabotage speed.</li>
            <li class='p-item-true'>Stacks: Yes.</li>
        </ul>
        `
    },
    // brandNewPart: {
    //     stacks: false,
    //     rarity: 'ultra rare',
    //     what: 'addOn',
    //     name: 'brandNewPart',
    //     bloodpoints: toolPrices.ultraRare,
    //     charges: 12,
    //     repairSpeed : 12
    // }
}

export {toolboxes, toolboxAddOns}