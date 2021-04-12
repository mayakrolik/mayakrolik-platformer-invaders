class NameHelper {

    static makeName() {
        const adjectives = ['Big', 'Tiny', 'Small', 'Large', 'Little', 'Shiny', 'Dull', 'Arrogant', 'Stuffy', 'Confident', 'Meek', 'Huge', 'Blue', 'Red', 'Rough', 'Smooth' , 'Placid', 'Angry', 'Happy', 'Mighty', 'Sleepy', 'Sweet', 'White' , 'Mean', 'Cool', 'Crazy', 'Fast', 'Slow', 'Nice', 'Dizzy', 'Dirty', 'Purple', 'Green', 'Slimmy', 'Cunning', 'Deceptive', 'Ackward', 'Smart', 'Lazy', 'Creative', 'Loony', 'Nervous', 'Anxious', 'Forgetful', 'Couragous', 'Nervous', 'Sacraficial', 'Demented', 'Silly', 'Strange', 'Odd', 'Diabolical', 'Evil', 'Good', 'Trusted', 'Unworthy', 'Endangered', 'Extinct', 'Howeling', 'Crying', 'Screaming', 'Yelling', 'Fighting', 'Gray', 'Combative', 'Friendly', 'Menicing', 'Frightful', 'Vendictive', 'Witty', 'Savvy', 'Whimpy', 'Tough', 'Smiling', 'Laughing', 'Crying', 'Singing', 'Talking', 'Pointing', 'Running', 'Surfing', 'Sinking', 'Floating', 'Flying', 'Soaring'];
        const nouns = ['Mouse', 'Ant', 'Ardvark' , 'Rhino', 'Hippo', 'Dog', 'Cat', 'Bird', 'Fox', 'Squirrel', 'Horse', 'Monkey', 'Lion', 'Tiger', 'Bear', 'Panther', 'Elephant', 'Zebra', 'Snake', 'Unicorn', 'Mantis', 'Crab' , 'Dolphin', 'Whale', 'Trout', 'Bass', 'Oyster', 'Lobster', 'Pelican', 'Eagle', 'Hawk', 'Conure', 'Bobcat', 'Swordfish', 'Stingray', 'Osprey', 'Shark', 'Rat', 'Cobra', 'Python', 'Pig', 'Sheep', 'Goat', 'Lamb', 'Chicken', 'Rooster', 'Pelican', 'Ape', 'Skunk', 'Raccoon', 'Frog', 'Toad', 'Tadpole', 'Koala', 'Kangaroo', 'Wombat', 'Bluejay', 'Woodpecker', 'Ferret', 'Mink', 'Beaver', 'Otter', 'Wolf', 'Chimpanzee', 'Gazelle', 'Lizard', 'Crocodile', 'Alligator', 'Iguana'  ]
        // make it really random :)
        for (var i=0; i < Math.floor(Math.random() * 99) + 13 ; i++)
        {
            Math.random();
        }
        var adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        for (var i=0; i < Math.floor(Math.random() * 99) + 23 ; i++)
        {
            Math.random();
        }
        var noun = nouns[Math.floor(Math.random() * nouns.length)];

        return adjective + ' ' + noun;
    }
}

module.exports = NameHelper;