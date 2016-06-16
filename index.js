/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Beer Geek for a Beer fact"
 *  Alexa: "Here's your Beer fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.ea329828-8000-45a9-a388-47105c60809b";

/**
 * Array containing Beer facts.
 */
var Beer_FACTS = [
    "there are over 45 american hop varieties",
    "there are over 20 english hop varieties",
    "there are 12 german hop varieties",
    "there are 5 noble hops",
    "Admeral is a bittering hop known for a citrus and herbal flavor", 
    "Ahtanum is an aroma hop known for a earthy and floral flavor",
    "Amarillow is an aroma hop known for a floral and citrus flavor",
    "aramis is an aroma hop known for a spicy, herbal, citrus flavor",
    "aurora is a dual purpose hop known for a earthy and herbal flavor", 
    "bitter gold is a dual purpose hop known for a grassy, tropical flavor",
    "blanc is an aroma hop known for a floral, citrus, and fruity flavor",
    "Boadicea is a dual purpose hop known for a floral and fruity flavor",
    "bobek is an aroma hop known for a floral and pine flavor",
    "brambling cross is a dual purpose hop known for a spicy and fruity flavor",
    "bravo is a bittering hop known for a floral and fruity flavor",
    "brewers gold is a bittering hop known for a spicy and fruity flavor",
    "buillion is a bittering hop known for a spicy and fruity flavor",
    "cascade is an aroma hop known for a floral, spicy, citrus flavor",
    "celeia is a dual purpose hop known for a earthy and herbal flavor",
    "centennial is a dual purpose hop known for a floral and citrus flavor", 
    "challenger is a dual purpose hop known for a fruity and herbal flavor",
    "chelan is a bittering hop known for a citrus and stone fruit flavor.",
    "Chinook is a dual purpose hop known for a citrus and pine flavor",
    "citra is an aroma hop known for a citrus and tropical fruit flavor",
    "cluster is a dual purpose hop known for a earthy and fruity flavor",
    "columbia is an aroma hop known for a earthy and fruity flavor",
    "columbus is a bittering hop known for a earthy, citrus, and spicy flavor",
    "comet is a bittering hop known for a grassy and citrus flavor",
    "crystal is an aroma hop known for a earthy and herbal flavor",
    "czech saaz is an aroma hop known for a floral and herbal flavor",
    "dr. rudi is a dual purpose hop known for a pine and herbal flavor", 
    "east kent golding is a dual purpose hop known for a citrus and spicy flavor",
    "ella is a dual purpose hop known for a floral and spicy flavor",
    "Falconer's flight is an aroma hop known for a floral and fruity flavor",
    "first gold is a dual purpose hop known for a floral, citrus, and stone fruit flavor",
    "fuggle is an aroma hop known for a fruity and herbal flavor",
    "galaxy is a dual purpose hop known for a fruity flavor",
    "galena is a bittering hop known for a citrus, spicy, and fruity flavor",
    "glacier is a dual purpose hop known for a fruity and earthy flavor",
    "golding is an aroma hop known for a floral and fruity flavor",
    "green bullet is a dual purpose hop known for a floral, spicy and pine flavor",
    "hallertau is an aroma hop known for a earthy and herbal hop",
    "helga is a dual purpose hop known for a earthy and herbal flavor",
    "herkules is a bittering hop known for a citrus and fruity flavor",
    "hersbrucker is an aroma hop known for a earthy and citrus flavor",
    "horizon is a dual purpose hop known for a floral and spicy flavor",
    "huell melon is an aroma hop known for a fruity flavor",
    "kohatu is a dual purpose hop known for a tropical fruit flavor",
    "liberty is an aroma hop known for a floral and citrus flavor",
    "magnum is a bittering hop known for a spicy and fruity flavor",
    "Mandarina bavaria is an aroma hop known for a citrus and fruity flavor",
    "merkur is a dual purpose hop known for a tropical fruit and herbal flavor",
    "millennium is a bittering hop known for a floral, fruity, and herbal flavor",
    "mosaic is an aroma hop known for a floral and tropical fruit flavor",
    "motueka is an aroma hop known for a citrus and tropical fruit flavor",
    "mt. hood is an aroma hop known for a spicy and herbal flavor",
    "mt. rainer is a dual purpose hop known for a floral and herbal flavor",
    "nelson sauvin is a dual purpose hop known for a fruity flavor",
    "newport is a bittering hop known for a earthy and citrus flavor", 
    "northdown is a dual purpose hop known for a floral and spicy flavor",
    "northern brewer is a dual purpose hop known for a pine and herbal flavor",
    "nugget is a bittering hop known for a earthy and herbal flavor", 
    "olympic is a bittering hop known for a citrus and spicy flavor",
    "opal is a dual purpose hop known for a floral, citrus, and spicy flavor",
    "pacific gem is a bittering hop known for a earthy, floral, and fruity flavor",
    "pacific jade is a dual purpose hop known for a citrus and herbal flavor",
    "pacifica is an aroma hop known for a floral and citrus flavor",
    "palisade is an aroma hop known for a earthy, floral, and fruity flavor",
    "perle is a dual purpose hop known for a floral and spicy flavor",
    "pilgrim is a dual purpose hop known for a fruity flavor",
    "pilot is a dual purpose hop known for a citrus and spicy flavor",
    "pioneer is a dual purpose hop known for a citrus and herbal flavor",
    "polaris is a dual purpose hop known for a tropical fruit and herbal flavor", 
    "pride of ringwood is a bittering hop known for a herbal flavor", 
    "progress is a dual purpose hop known for a earthy, grassy, and fruity flavor",
    "rakau is a dual purpose hop known for a stone fruit and pine flavor",
    "riwaka is an aroma hop known for a citrus and tropical fruit flavor",
    "santiam is an aroma hop known for a floral and spicy flavor",
    "saphir is an aroma hop known for a floral, citrus, and spicy flavor",
    "select is an aroma hop known for a grassy and spicy flavor",
    "simcoe is a dual purpose hop known for a citrus and pine flavor",
    "Sorachi Ace is a dual purpose hop known for a herbal and dill flavor", 
    "southern cross is a dual purpose hop known for a citrus, spicy, and pine flavor",
    "soverign is a dual purpose hop known for a fruity flavor",
    "spalt is an aroma hop known for a earthy and herbal flavor",
    "sterling is an aroma hop known for a floral, citrus, and spicy flavor",
    "strisselspalt is an aroma hop known for a earthy, herbal, and grassy flavor",
    "summer is an aroma hop known for a fruity flavor",
    "summit is a bittering hop known for a citrus and herbal flavor",
    "super pride is a bittering hop known for a pine flavor",
    "sussex is an aroma hop known for a earthy and grassy flavor",
    "sylva is an aroma hop known for a floral and herbal flavor",
    "tahoma is an aroma hop known for a floral and citrus flavor",
    "taeget is a dual purpose hop known for a citrus and spicy flavor",
    "tettnang is an aroma hop known for a earthy and herbal flavor",
    "tomahawk is a bittering hop known for a citrus and spicy flavor",
    "tradition is an aroma hop known for a floral, fruity, and herbal flavor",
    "triskel is an aroma hop known for a floral, citrus, and spicy flavor",
    "ultra is an aroma hop known for a floral and spicy flavor",
    "vanguard is an aroma hop known for a earthy flavor",
    "wai-iti is an aroma hop known for a citrus, spicy, and fruity flavor",
    "waimea is a dual purpose hop known for a citrus and pine flavor",
    "wakatu is a dual purpose hop known for a floral and citrus flavor",
    "warrior is a bittering hop known for a citrus and herbal flavor",
    "willamette is an aroma hop known for a floral and fruity flavor",
    "yakima gold is an aroma hop known for a floral and spicy flavor",
    "zeus is a bittering hop known for a spicy and herbal flavor",
    "zythos is an aroma hop known for a tropical fruit flavor",
    "The bitterness of a hop comes from the alpha acids in the plant",
    "Hops grow on bines",
    "Hops are the flowers, or strobiles of the hop plant humulus lupulus",
    "hops are also used in herbal medicines",
    "hops were originally used as a preservative for beer",
    "The first documented hop cultivation was in the year 736",
    "The first mention of using hops in brewing was in the year 1079",
    "Hop are mostly grown in moist temperate climates",
    "Much of the world's production of hops are on the 48th parallel north",
    "Hops prefer the same soils as potatos ",
    "The lupulin in hops help brewer's yeast grow",
    "Undried hops are commonly referred to as wet hops",
    "dry hopping is aging beer with hops, post fermentation",
    "wet hopping is aging beer with fresh hops after fermantation", 
    "before hops, brewers often used gruit, or an old fashioned herb mixture",
    "cascade is the most commonly used hop by american craft brewers",
    "all beers are either an ale or a lager",
    "ales are made with top fermenting yeast",
    "lagers are made with bottom fermenting yeast",
    "beer styles are determined by color, flavor, strength, ingredients, production, and origin",
    "Pale ales are gold or copper colored and known for a crips hop flavor",
    "India Pale Ales are known for a intense hop flavor",
    "stouts are are known for their dark, opaque color and roasty and sweet flavor",
    "Porters are known for their deep brown color and sweet flavor",
    "wheat beers are known for their hazy appearance and light flavor",
    "Pilsners are the world's most common type of beer",
    "pilsners are known for their pale color, and a crisp, clean flavor.",
    "A bock is a german style lager known for it's darker color and sweet flavor",
    "A marzen is the traditional oktoberfest beer",
    "A maibock is a german lager tradionally made to be to be ready in may",
    "Amber ales are known for their amber color and sweeter taste",
    "barleywines are known for their high alcohol content and caramel flavor",
    "Belgian ales are known for their sweet and yeast forward flavor",
    "Belgian beers are traditionally a single, double, and trippel. Each stronger than the last.",
    "Lambic beers are fermented with wild yeast for natural fermentation giving it a sour or tart flavor",
    "Saison are known for their high carbonation and dry flavor",
    "cream ales are known for their soft mouthfeel and sweeter flavor",
    "alt beers are traditional german style ales. Alt means old in german.",
    "Dunkel are dark german lagers",
    "Framboise are a tart belgian beer made with raspberries",
    "Helles is a golden german lager",
    "Kolsch is a fruity lager created in the german city of Cologne ",
    "A Kriek is a sour belgian beer made with cherries",
    "A Rauchbier is a german lager made with smoked malt.",
    "Trappist beers were tradditionally made by monks.",
    "Grains need to be malted to be used in beer.",
    "Milled grain is known as grist",
    "Almost all of the grains used in beer are barley",
    "Malts contain starch that is converted to sugar in the brewing process",
    "Malting grain is a process that breaks down complex carbohydrates and produces enzymes.",
    "Grains are crushed before use in brewing",
    "Mashing is the process of soaking malted grain in hot water",
    "Base malts are high in sugar and usually make up 60% to 100% of grain recipes",
    "Base malts contain a high enzyme concentration that helps convert starch to sugar.",
    "Most base malts are pale, munic, marris otter, or pilsner.",
    "Specialty grains are grains that impart a bolder flavor.",
    "Crystal Malts empart a toffee flavor and a caramel color",
    "Flaked oats help with head retention",
    "Flaked oats help provide a soft mouthfeel",
    "Acidulated malt provides a tart flavor",
    "Black Barley imparts a dry roasty flavor",
    "Black Patent Malt darkens a beer and is often used in stouts.",
    "Chocolate malt is used to provide a sweet, chocolte flavor",
    "Munich malt is often used in oktoberfest style beers.",
    "Corn can be used in beer to provide a subtle sweetness",
    "Rice provides no dicernible taste but keeps alchohol content low",
    "Rye provides a spicy dry flavor",
    "Wheat helps with head retention and can cause a hazy appearance ",
    "Biscuit Malt provides a warm, sweet flavor",
    "Malts are categorized by how long they are malted, and therefor their darkness",
    "along with grains, other sugars are added to beer.",
    "Honey imparts a dry, sweet flavor to beer",
    "Malts are usually considered either base malts or specialty malts",
    "beer is produced by yeast converting sugar into alcohol ",
    "ales are made with top fermenting yeast",
    "lagers are made with bottom fermenting yeast",
    "Lagers and Ales are made with different strains of yeast",
    "Yeast can drastically change the flavor of beer",
    "Beer can also be fermented by bacteria. This traditionally gives a tart or funky taste",
    "Brewer's yeast is also known as Saccharomyces cerevisiae",
    "Beer fermentation traditionally takes 1 to 2 weeks for ales",
    "Beer fermentation traditionally takes a month for lagers",
    "Yeast is a living member of the fungus family",
    "Yeast helps carbonate beer",
    "Unfermented beer is known as wort",
    "Some beers intentionally leave some yeast in the bottle or keg",
    "Ales ferment at higher temperatures",
    "Ales ferment around 60 to 70 degress fahrenheit",
    "Lagers ferment at colder temperatures",
    "Lagers ferment around 50 degrees fahrenheit",
    "Beers ferment in large steel fermenters. Homebrewers traditionally use a vessel known as a carboy.",
    "beer is made from steeping grains in hot water, adding hops, and fermenting with yeast",
    "The first step of brewing is milling grain. This grain is then known as grist. ",
    "The second step of brewing is mashing",
    "Steeping grains in hot water is known as mashing.",
    "the Mashing process of brewing takes place in a mash tun.",
    "the Mashing process of brewing converts a grain's starch into sugar.",
    "mashed liquid is known as wort",
    "The third process of brewing is lautering",
    "the Lautering process of brewing takes place in a lauter tun",
    "Lautering seperates wort from the grain husks.",
    "The fourth step of brewing is the boil.",
    "Hops are added in during the boil process of brewing. ",
    "The boiling process of brewing takes place in a kettle",
    "The fith step of brewing is wort separation and cooling",
    "The wort seperation process of brewing seperates the wort from any remaining hop or grain particles.",
    "Wort, or young beer must be cooled to ferment",
    "The sixth step in brewing is fermentation.",
    "Beer is fermented with yeast.",
    "Some beers are aged to mature the flavor.",
    "Some beers are aged in barrels to impart the flavors of wood, as well as the barrell's previous inhabitant like bourbon or wine",
    "flute glasses are long and showcase a beer's carbonation",
    "goblet glasses have a wide mouth to provide deep sips of your beer",
    "Mugs are the traditional oktoberfest beer glass",
    "pint glasses are the most common beer glass",
    "snifter glasses are commonly used for strong beers",
    "tuilip glasses supports foamy heads and enhance the aroma",
    "Weizen glasses are tradionally used for wheat beers",
    "New beer glasses are created every year.",
    "An IPA glass was developed by dogfish head brewery. ",
    "ancient babylonians were the first to brew beer",
    "beer is mostly composed of water",
    "In the middle ages, clean water was hard to find. Beer was a safer alternative for many people.",
    "Storing beer upright reduces oxidation and contamination.",
    "The pilgrims on the mayflower stopped at plymouth rock because they ran out of beer.",
    "Prohibition lasted almost 14 years",
    "Mouthfeel is how a beer feels in your mouth",
    "beer is fat free",
    "cans have no effect on the quality or taste of beer.",
    "a skunked beer is caused by exposure to uv light",
    "beer fermentation was discovered by accident",
    "beer is usually around 5% alcohol ",
    "The study of beer is known as zythology",
    "The Czech Republic consumes the most beer per capita",
    "Cenosillicaphobia is the fear of an empty beer glass",
    "Oktoberfest is the world's largest beer festival",
    "George Washington had his own brewhouse on Mount Vernon",
    "Egyptian pyramid workers were paid with beer",
    "The oldest recorded beer recipe is 4000 years old",
    "The strongest beer in the world has a 67.5% alcohol content ",
    "Beer was not considered an alcoholic beverage in Russia until 2013",
    "In Argentina, political parties have their own brands of beer.",
    "When scientist Niels Bohr won the Nobel Prize in 1922, the Carlsberg brewery gave him a perpetual supply of beer piped into his house.",
    "In 1963, Albert Heineken created a beer bottle that could also be used as a brick to build sustainable housing in impoverished countries.",
    "In the 13th century, some people in Norway would baptize their children with beer.",
    "A beer wave of 388,000 gallons flooded London in 1814 after a huge vat erupted.",
    "Norway's first aircraft hijacking was resolved after the hijacker surrendered his weapon in exchange for more beer.",
    "The top five states for beer consumption per capita are 1. North Dakota, 2. New Hampshire, 3. Montana, 4. South Dakota 5. Wisconsin.",
    "Germany is home to a beer pipeline. Taps in Veltsin-Arena are connected by a 5km tube of beer.",
    "Thomas Jefferson wrote parts of the Declaration of Independence in a Philadelphia tavern.",
    "At the end of Prohibition, FDR said, What America needs now is a drink.",
    "Winston Churchill called the concept of Prohibition an affront to the whole history of mankind.",
    "George Washington insisted his continental army be permitted a quart of beer as part of their daily rations.",
    "Oktoberfest originally started as a festival celebrating the 1810 marriage of Crown Prince Ludwig.",
    "Beer helped Joseph Priestly discover oxygen. He noticed gases rising from the big vats of beer at a brewery and asked to do some experiments.",
    "A Buddhist temple in the Thai countryside was built with over a million recycled beer bottles",
    "Beer soup was a common breakfast in medieval Europe",
    "At the start of Bavarian Beer Week in Germany, an open-air beer fountain dispenses free beer to the public.",
    "The Reinheitsgebot was the german beer purity law. According to the 1516 Bavarian law, the only ingredients that could be used in the production of beer were water, barley and hops.",
    "Drinking out of a glass can change the flavor of a beer compared to a can or a bottle.",
    "Your sense of smell effects how you tast beer",
    "Beer was first canned in 1933",
    "The brown beer bottle was invented by the Schlitz brewery.",
    "Abraham Lincoln helped pay for the civil wat by taxing beer",
    "Rogue brewery in oregon brewed a beer fermented with yeast collected from their brewmaster's beard",
    "the foam on a beer is known as the head",
    "Hops are a cousin to the marijuana plant",
    "Chicha is a traditional peruvian corn beer. Originally it was made with the brewmaster chewing and spitting out the corn instead of mashing it. ",
    "The first professional brewers were all women.",
    "India Pale Ales were invented by british brewers attempting to keep beer fresh as it sailed to india.",
    "Russian Imperial Stouts were actually invented in england. It's strong alcohol content was to keep the beer safe as it traveled to Russia",
    "There are over 400 types of beer"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * BeerGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var BeerGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
BeerGeek.prototype = Object.create(AlexaSkill.prototype);
BeerGeek.prototype.constructor = BeerGeek;

BeerGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("BeerGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

BeerGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("BeerGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
BeerGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("BeerGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

BeerGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Beer Geek tell me a Beer fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random Beer fact from the Beer facts list
    var factIndex = Math.floor(Math.random() * Beer_FACTS.length);
    var fact = Beer_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your Beer fact: " + fact;

    response.tellWithCard(speechOutput, "BeerGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the BeerGeek skill.
    var beerGeek = new BeerGeek();
    beerGeek.execute(event, context);
};

