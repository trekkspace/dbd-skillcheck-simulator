# Dead by Daylight Skillcheck Simulator
Dead by Daylight Skillcheck Simulator - Train your skills. 
Killer perks, items and add-ons that can affect the generator progress in any way can be tested and learned here.

[![N|Solid](/src/assets/backgrounds/dbd-skillcheck-simulator3.png)](http://dbd.yessirskiii.net)
## Website
Visit http://dbd.yessirskiii.com/ to play.


## Perks
### Killer Perks

The Killer Perks can be activated/dezactivated using **TRAINING** mode from the **GAME MODE** menu. Selecting **TRAINING** mode, will activate the selected perks at the maximum tier or at the maximum number of tokens(Hex: Huntress Lullaby). Each Killer Perk in **NORMAL** mode will have 50% changes to activate, when starting a generator, then the perks will have 10% changes to activate/dezativate the effect during the game. For **DECISIVE STRIKE** all killer perks will remain inactive.
  - Hex: Ruin - **Version 2.6.0** *(got nurfed in **Version 3.5.0**)* 
    - Good Skill Checks result in 3/4/5 % regression on the Generator.
    - Great Skill Checks grant 0 % bonus progression on the Generator.
  - Hex: Huntress Lullaby 
    - 1 to 4 Tokens: Time between the Skill Check warning sound and the Skill Check becomes shorter.
    - 5 Tokens: No Skill Check warning.
  - Unnerving Presence
    - Triggered Skill Checks' success zones are reduced by 40/50/60 %. 
### Survivor Perks
There is only **DECISIVE STRIKE** **(DS)** that can be selected from the **GAME MODE** menu.

## Toolboxes 
The Toolbox is an item that can be used to repair generators more quickly. Different Toolboxes have different uses and not all of them are good for both uses. Add-ons can be equipped to enhance their speed and durability. Toolboxes and add-ons can be bought with bloodpoints. You can gain bloodpoins fast by hitting great skillchecks multiple times. You can gain free Bloodpoints by finding the secret :)
- ### Items
  - Worn-Out Tools
    - 80 charges  
    -    Moderately increases repair speed
    -    Slightly decreases Skill Check success zones
  - Toolbox (Item)
    -    130 charges
    -    Moderately increases repair speed
    -    Slightly decreases Skill Check success zones
  - Mechanic's Toolbox
    -    80 charges
    -    Considerably increases repair speed.
  - Commodious Toolbox
    -    180 charges.
    -    Moderately increases repair speed
  - Engineer's Toolbox
    -    80 charges.
    -    Tremendously increases repair speed.
  - Alex's Toolbox
    -    130 charges.
    -    Slightly increases repair speed.
- ### Add-ons
  - Spring Clamp
    - Slightly increases repair Skill Check success zones.
    - Stacks: No.
  - Scraps
    - Adds 15 charges to the Toolbox.
    - Stacks: Yes.
  - Clean Rag
    - Slightly increases the Toolbox's repair speed.
    - Stacks: Yes.
  - Wire Spool
    - Adds 30 charges to the Toolbox.
    - Stacks: Yes.
  - Socket Swivels
    - Moderately increases the Toolbox repair speed.
    - Stacks: Yes.
  - Protective Gloves *(doesn't affect the generator)*
    - Stacks: Yes.
  - Instructions
    - Moderately increases the Toolbox's repair efficiency.
    - Stacks: Yes.
  - Grip Wrench
    - Moderately increases repair Skill Check success zones.
    - Stacks: Yes.
  - Cutting Wire *(doesn't affect the generator)*
    - Stacks: No.
  - Hacksaw *(doesn't affect the generator)*
    - Stacks: Yes.

## Future Updates (*project on hold)

 - Add 'New Brand Tool' (Item)
 - Add 'Overcharge' Killer Perk (in testing)
 - Update Hex: Ruin to Version 3.5.0

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

