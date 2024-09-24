// src/components/MissionSelector.tsx
export type Mission = {
    type: "predefined" | "custom";
    name: string;
    description?: string;
    longDescription?: string;
    image?: string;
  };
  
  export const predefinedMissions: Mission[] = [
    {
      type: "predefined",
      name: "life",
      description: "A mission to discover your origins and true nature.",
      longDescription: `It is necessary to discover your origins. A journey might be needed, but the discovery can also be immediate, a revelation that changes the fate of the protagonist, who is faced with a new identity. The hero discovers they have a relative, an ancestor, or a power, a talent. Our roots are also in our veins, in our blood. It may take a long time before the hero realizes this world beneath them. The hero might be so enchanted by the lush foliage of the tree that they feel an initial revulsion at facing the earth, the mud, the worms, the dry leaves that sometimes hide the skeleton of some wild animal. Here lies the boundary between the void and the full, between the world above and the world below.
  
      Sometimes discovering one’s roots means becoming aware of one’s true nature. In other cases, it is a heavy necessity: if the roots are sick, the tree is sick, and we must take care of our loved ones, we must accept a part of ourselves that is fading away. But even dying, the tree is capable of generating new life, regenerating, or even being reborn from its own roots. It is an important lesson for our hero. They will learn it by the end of their journey.`,
      image: "/imgs/missions_life.png"
    },
    {
      type: "predefined",
      name: "world",
      description: "A mission to confront and save the world from danger.",
      longDescription: `There is a concrete threat to the world we live in, which can be our planet as much as our home or life, work-related or familial. Our world is precisely this, the place of our existence, sometimes in danger due to global threats, like viruses, wars, aliens, environmental or economic crises, and sometimes in danger due to personal reasons.
  
      Here we are once again at the crossroads of interpretation: on one side, the world in danger of great adventure stories, maybe with some superhero to overcome, on the other side, our real world, threatened by separations, illnesses, deaths, existential crises, layoffs, betrayals.
  
      The good news is that in the background, there is already the wind of change, which may have been the cause of the problem. Therefore, the conditions exist for the protagonist of the story to find the way to save the world. Or to find a new one.`,
      image: "/imgs/missions_world.png"
    },
    {
      type: "predefined",
      name: "treasure",
      description: "A mission to embark on a journey guided by a map.",
      longDescription: `“Life is a journey” is an expression that, as overused as it may be, still seems fitting. The maps of this journey are sometimes in our minds: they are the education we received, the life we have planned or chosen, or something we must complete. The journey is about seeking friends, loves, treasures, and possibly new planets, overcoming challenges, and ultimately discovering something profound.`,
      image: "/imgs/missions_treasure.png"
    },
    {
      type: "predefined",
      name: "love",
      description: "A mission to find, understand, and embrace love.",
      longDescription: `Nothing expresses better the arrow shot by Cupid than the implicit threat represented by exposing oneself to the abyss of love.
  
      We find ourselves in a story where love was found and lost. The mission can be set at the table of a character determined to find a sentimental relationship, but it may also be the result of an unexpected meeting. In both cases, we can find ourselves in front of the parable of forbidden love, or that of lost love, or both.
  
      In building this story, one mainly reflects on the obstacles, on the impediments, and sometimes the fuel of love is precisely these obstacles. But one must be careful about commonplaces; we must look at the letters, especially the seen ones. Those who believe that all stories have already been written do not really know how to fall in love.`,
      image: "/imgs/missions_love.png"
    },
    {
      type: "predefined",
      name: "power",
      description: "A mission to discover and responsibly wield power.",
      longDescription: `We all must discover or rediscover our power. It’s one of the first missions in life. The hero must navigate the allure and responsibility of power, encountering others who seek power for themselves, leading to conflicts and moral dilemmas. The journey teaches the hero that true power lies not in domination but in doing what is right, despite the challenges and sacrifices.`,
      image: "/imgs/missions_power.png"
    },
    {
      type: "predefined",
      name: "crysis",
      description: "A mission to avert disaster and restore balance.",
      longDescription: `A crisis presents itself—whether it's a global catastrophe or a personal one—and the hero must find a way to avert disaster. This mission involves navigating chaos, making tough decisions, and striving to restore balance and order. The hero must draw on their courage, leadership, and calm under pressure to save the day and ensure that the world, in whatever form, continues.`,
      image: "/imgs/missions_crysis.png"
    },
    {
      type: "predefined",
      name: "family",
      description: "A mission to protect, unite, and understand family.",
      longDescription: `The card can be used as the main mission or as the second mission of the protagonist.
  
      **Note for the most experienced:** Use it only to build the plot from the protagonist's past and the problems that arise from it.
  
      **Note for everyone:** Build a story where there is a relationship to recover with some relative that on the card seems invisible. Always assume that this invisibility has no other reasons, and then we will have relatives who have died prematurely or separated and divorced.
  
      You tell the story of someone who seeks and finds their most important relationships in a family that is not biological. Tell the story of a family built with friends or with those who share your passions and desires.
  
      Let yourself be guided by traditions, escapes, mistakes, all the inefficiencies that make children feel accused, educated by guilt that doesn't welcome errors, when instead, we shout with gusto another truth: without errors, there is no story.`,
      image: "/imgs/missions_family.png"
    },
    {
      type: "custom",
      name: "custom",
      description: "A custom mission defined by the user.",
      longDescription: `This is a mission tailored by the user, where they can define their own goals, challenges, and narrative. The possibilities are endless, limited only by the user's imagination. This mission allows for complete creative freedom, enabling the user to craft a story that is uniquely theirs. Whether it is a quest for knowledge, a journey of self-discovery, or an epic adventure in a fantasy world, this custom mission reflects the user's personal vision and aspirations.`,
      image: "/imgs/missions_custom.png"
    }
  ];
  