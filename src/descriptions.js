/* eslint-disable max-len */
const { MessageEmbed } = require('discord.js');
const {
	prefix
} = require('../config.json');

module.exports = {

	diceDescription: function diceDescription() {
		return ` Using this command rolls a randomly generated number from specified range. You can roll any sided dice larger than 3. You can use multiple dice in succession (to the limit of 10000). Also you can do math and advanced modifiers on results.
        Example: !roll 2d20 - Roll 2, 20-sides dice
        
                    **• Compare Points:**
                    **=: **Equal to
                    **!=:** Not equal to
                    **<:** Less than
                    **>:** Greater than
                    **<=:** Less than or equal to
                    **>=:** Greater than or equal to

                    Addition, Subtraction, Multiplication, and Division is also accepted
                    
                    (Dice can also use advanced modifiers. If you want a list of them, type **${prefix}help dice-advanced**(It will be long, be warned))
                    `;
	},

	diceAdvanced: async function diceAdvanced(message) {
		const embed1 = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(`ADVANCED DICE HELP MENU`, message.guild.iconURL({
				dynamic: true,
				size: 2048,
				format: 'png'
			}))
			.setDescription(`There are a lot of things you can use to change your roll, the following are what's accepted:

            **• Fate/Fudge Dice:** If you want to roll a Fate Dice, you can use \`dF\` instead of the numbers of side, it returns either \`0, 1 -1\`. Example: \`4dF: [0, 0, -1, 0] = -1\`
            **• Percentile Dice:** In case you want to roll a Percentile Dice, you can use \`d%\`. Example: \`4d%: [1, 77, 95, 4] = 177\`
            
            The following modifiers are also available for any set of rolls:

            **• Minimum:** Any dice rolls below the minimum value, will be treated as that value. Example: \`4d6min3: [5, 3^, 3^, 5] = 18\`
            **• Maximum:** Any dice rolls above the maximum value, will be treated as that value. Example: \`4d6max3: [2, 2, 3v, 3v] = 10\`

            **• Exploding Dice:** If you have to use it, then you know what it does. Example: \`2d6!: [4, 6!, 6!, 2] = 18\`. You can use Compare Points with it.
            **• Compound Exploding Dice:** You can also get the exploded dice rolls to be combined in a single roll. \`2d6!!: [4, 14!!] = 18\`. You can use Compare Points with this too.
            **• Penetrating Dice:** Again, if you're using it, you know what it will happen. Example: \`2d6!p: [6!p, 5!p, 5!p, 3, 1] = 20\`, you can compound it with \`!!p\` and use Compare Points.

            **• Re-Roll:** Re-roll a die that rolls the lowest possible value. It will keep re-rolling until it's above, it will disregard any of the previous rolls. Example: \`4d10r: [4r, 6, 2, 5r] = 17\` 
            To re-roll only once, you can use \`ro\` instead, and you can use Compare Points to change the number it will re-roll on.   `);

		const embed2 = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(`ADVANCED DICE HELP MENU`, message.guild.iconURL({
				dynamic: true,
				size: 2048,
				format: 'png'
			}))
			.setDescription(`**• Keep:** Allows you to roll a collection of dice but to disregard all except for the highest or lowest result(s).  Example: \`6d7k3: [6, 7, 2d, 5, 4d] = 6\` 
            To keep the highest: \`k\` or \`kh\`. To keep the lowest: \`kl\`
            **• Drop:** Sometimes you may want to roll a certain number of dice, but "drop" or remove high or low rolls from the results. Example: \`6d6dh3: [6d, 7d, 2, 5d] = 2\` To drop the highest: \`dh\`. To keep the lowest: \`d\` or \`dl\` 
            **(Drop and Keep can be used together)**
            
            **• Target Success:** The total will be the quantity of dice rolled that meet the fixed condition, rather than the total value of the rolls. This can be accomplised by adding a Compare Point after the dice notation. Example: \`3d5<2: [1*, 5, 1*] = 2\`
            **• Target Failures:** Sometimes you also need to count your failures. Example: \`4d6>4f<3: [2_, 5*, 4, 5*] = 1\` (Greater than 4 is success, less than 3 is failure)

            **• Critical Success:** When a die rolls the highest possible value, it's is called a critical success. But if you want to specify what's a Critical Success then do:\`5d20cs>=16: [3, 20**, 18**, 15, 6] = 62\`
            **• Critical Failure:**  When a die rolls the lowest possible value, it's is called a critical failure. But if you want to specify what's a Critical Failure then do:\`5d20cf<=6: [3__, 20, 18, 15, 6__] = 62\`

            **• Sorting:** You can sort your rolls too in ascending or descending order. For ascending \`s\` or \`sa\`. For descending: \`sd\`
            `);
		const embed3 = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(`ADVANCED DICE HELP MENU`, message.guild.iconURL({
				dynamic: true,
				size: 2048,
				format: 'png'
			}))
			.setDescription(`**• Compare Points:**
            **=: **Equal to
            **!=:** Not equal to
            **<:** Less than
            **>:** Greater than
            **<=:** Less than or equal to
            **>=:** Greater than or equal to`);

		// eslint-disable-next-line no-unused-vars
		return message.author.send(embed1).then(msg => {
			message.author.send(embed2).then(() =>
				message.author.send(embed3));
		});
	}
};
