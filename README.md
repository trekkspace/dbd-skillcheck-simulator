Project under maintenance, thx to lucafont2 for updating the repo.

## Changelog
- Added Glyph mode
- Added Custom and preset modes
- Added Brand new part
- Added customizable tokens and tiers
- Added the new grade system

## Todo:

- Wiggle Skill Check


## Issues:

- Glyph skill check bug (investigating) after failure. 


# Dead by Daylight Skillcheck Simulator
Dead by Daylight Skillcheck Simulator - Train your skills. 
Killer perks, items and add-ons that can affect the generator progress in any way can be tested and learned here.

## Website
Visit https://dbd.lucaservers.com to play.


## Perks

The Killer Perks can be activated/dezactivated using **CUSTOM** mode from the **GAME MODE** menu. Selecting **CUSTOM** mode, will activate the selected perks at the maximum tier or at the maximum number of tokens(Hex: Huntress Lullaby). 
There are 3 preset mode **EASY** **MEDIUM** **HARD**
#### Killer perks:
  - Hex: Ruin - **Version 2.6.0** *(got nurfed in **Version 3.5.0**)* 
    - Good Skill Checks result in 3/4/5 % regression on the Generator.
    - Great Skill Checks grant 0 % bonus progression on the Generator.
  - Hex: Huntress Lullaby 
    - 1 to 4 Tokens: Time between the Skill Check warning sound and the Skill Check becomes shorter.
    - 5 Tokens: No Skill Check warning.
  - Unnerving Presence
    - Triggered Skill Checks' success zones are reduced by 40/50/60 %. 
  - Oppression
    - An hard Skill Check is made after killer kicks a generator
#### Survivor perks:
  - This is not happening
    - Increase the great area when injured  

## Toolboxes 
The Toolbox is an item that can be used to repair generators more quickly. Different Toolboxes have different uses and not all of them are good for both uses. Add-ons can be equipped to enhance their speed and durability. Toolboxes and add-ons can be bought with bloodpoints. You can gain bloodpoins fast by hitting great skillchecks multiple times. You can gain free Bloodpoints by finding the secret :)


## Local Installation

DBD Skillcheck Simulator requires [Node.js](https://nodejs.org/) v12+ to run
Install the dependencies and start the server.

```sh
$ cd dbd-skillcheck-simulator
$ npm install
$ npm run serve
```
Go to **localhost:8080** to play.

## Contribute

Want to contribute? Great!
This project uses Javascript and VueJS, feel free to improve the project if you found bugs or have other ideeas.


License
----

MIT

