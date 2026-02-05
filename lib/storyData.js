// Game of Thrones inspired visual novel story
export const storyData = {
  start: {
    id: "start",
    text: "You are a noble in the Seven Kingdoms. War is coming, and the realm is in chaos. The Iron Throne sits empty, and many claim it should be theirs. Winter is coming, and with it, ancient threats from beyond the Wall.",
    image: "/images/throne-room.jpg",
    choices: [
      {
        text: "Seek the Iron Throne for yourself",
        nextId: "throne_path",
      },
      {
        text: "Focus on defending against the Night King",
        nextId: "night_king_path",
      },
      {
        text: "Fight for independence of your kingdom",
        nextId: "independence_path",
      },
    ],
  },
  
  // Throne Path
  throne_path: {
    id: "throne_path",
    text: "You decide to claim the Iron Throne. You gather your bannermen and march toward King's Landing. Along the way, you must choose your strategy.",
    image: "/images/army.jpg",
    choices: [
      {
        text: "Form strategic alliances through marriage",
        nextId: "throne_alliance",
      },
      {
        text: "Take the throne by force",
        nextId: "throne_force",
      },
    ],
  },
  
  throne_alliance: {
    id: "throne_alliance",
    text: "Your political marriages create powerful alliances. The other houses rally to your cause, seeing wisdom in your diplomatic approach. You march on King's Landing with an overwhelming force of united kingdoms.",
    image: "/images/wedding.jpg",
    choices: [
      {
        text: "Show mercy to those who surrender",
        nextId: "throne_ending",
      },
      {
        text: "Execute your enemies as a warning",
        nextId: "throne_tyrant",
      },
    ],
  },
  
  throne_force: {
    id: "throne_force",
    text: "You storm King's Landing with fire and blood. The city burns as you take it by force. Many innocents die in the assault, but the throne is yours.",
    image: "/images/burning-city.jpg",
    choices: [
      {
        text: "Rule with an iron fist",
        nextId: "throne_tyrant",
      },
      {
        text: "Try to rebuild and make amends",
        nextId: "throne_ending",
      },
    ],
  },
  
  throne_tyrant: {
    id: "throne_tyrant",
    text: "Your harsh rule breeds resentment. Within a year, you are betrayed by your own council and forced into exile across the narrow sea. You live out your days plotting a return that will never come.",
    image: "/images/exile.jpg",
    ending: true,
    endingId: 2, // Exile ending
    endingTitle: "The Exile's Fate",
  },
  
  throne_ending: {
    id: "throne_ending",
    text: "You sit upon the Iron Throne, having united the Seven Kingdoms through wisdom and strength. Your reign ushers in a new era of peace and prosperity. Songs will be sung of your rule for generations to come.",
    image: "/images/iron-throne.jpg",
    ending: true,
    endingId: 0, // Iron Throne ending
    endingTitle: "The Iron Throne",
  },
  
  // Night King Path
  night_king_path: {
    id: "night_king_path",
    text: "You travel North to the Wall, rallying the kingdoms to face the true threat - the Night King and his army of the dead. Most lords think you're mad, but winter is here.",
    image: "/images/the-wall.jpg",
    choices: [
      {
        text: "Seek ancient magic to fight the dead",
        nextId: "night_magic",
      },
      {
        text: "Unite all houses for a final stand",
        nextId: "night_unite",
      },
    ],
  },
  
  night_magic: {
    id: "night_magic",
    text: "You discover ancient texts about the Children of the Forest and their magic. With this knowledge, you craft weapons capable of destroying White Walkers.",
    image: "/images/magic.jpg",
    choices: [
      {
        text: "Face the Night King directly",
        nextId: "night_king_ending",
      },
      {
        text: "Teach others and spread the knowledge",
        nextId: "night_unite",
      },
    ],
  },
  
  night_unite: {
    id: "night_unite",
    text: "Through diplomacy and proof of the threat, you unite all the kingdoms. Former enemies stand together at the Wall, ready to defend the realm of men.",
    image: "/images/united-army.jpg",
    choices: [
      {
        text: "Lead the charge yourself",
        nextId: "night_king_ending",
      },
    ],
  },
  
  night_king_ending: {
    id: "night_king_ending",
    text: "In the final battle, you face the Night King himself. With Valyrian steel and courage, you strike him down. As he shatters, his entire army crumbles. You saved humanity, though the Iron Throne still stands unclaimed. You have no desire for it - you've won a greater victory.",
    image: "/images/victory.jpg",
    ending: true,
    endingId: 3, // Night King ending
    endingTitle: "Savior of the Realm",
  },
  
  // Independence Path
  independence_path: {
    id: "independence_path",
    text: "You declare independence for your kingdom, refusing to kneel to any would-be monarch. The North, the Iron Islands, Dorne - all have dreams of self-rule. You will make yours a reality.",
    image: "/images/kingdom.jpg",
    choices: [
      {
        text: "Build a strong defensive position",
        nextId: "independence_defend",
      },
      {
        text: "Forge alliances with other independent regions",
        nextId: "independence_alliance",
      },
    ],
  },
  
  independence_defend: {
    id: "independence_defend",
    text: "You fortify your lands and prepare for siege. When the armies come, your people hold strong. The cost is high, but your walls do not fall.",
    image: "/images/castle-walls.jpg",
    choices: [
      {
        text: "Negotiate peace from a position of strength",
        nextId: "independence_ending",
      },
      {
        text: "Continue the fight indefinitely",
        nextId: "throne_tyrant",
      },
    ],
  },
  
  independence_alliance: {
    id: "independence_alliance",
    text: "You form a confederation of independent kingdoms. Together, you are too strong for any single ruler to challenge. Your alliance holds.",
    image: "/images/council.jpg",
    choices: [
      {
        text: "Establish a new council-based system",
        nextId: "independence_ending",
      },
    ],
  },
  
  independence_ending: {
    id: "independence_ending",
    text: "Your kingdom stands independent and free. While others fight for the Iron Throne, your people prosper in peace. You've proven that there can be a different way - one where kings and queens serve their people, not the other way around.",
    image: "/images/free-kingdom.jpg",
    ending: true,
    endingId: 1, // Independence ending
    endingTitle: "The Free Kingdom",
  },
};

// Ending metadata for NFTs
export const endings = [
  {
    id: 0,
    title: "The Iron Throne",
    description: "You conquered the Seven Kingdoms and sit upon the Iron Throne as the rightful ruler.",
  },
  {
    id: 1,
    title: "The Free Kingdom",
    description: "You led your people to independence, establishing a free and prosperous kingdom.",
  },
  {
    id: 2,
    title: "The Exile's Fate",
    description: "Your tyrannical rule led to betrayal and exile across the narrow sea.",
  },
  {
    id: 3,
    title: "Savior of the Realm",
    description: "You defeated the Night King and saved humanity from the army of the dead.",
  },
];
