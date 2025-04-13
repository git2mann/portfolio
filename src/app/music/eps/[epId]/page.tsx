'use client';

import { useParams } from 'next/navigation';
import Container from "@/app/_components/container";
import { useState, useEffect } from "react";
import InstructionPopup from "@/app/_components/InstructionPopup";
import Image from "next/image";
import Tilt from 'react-parallax-tilt';

const eps = [
  {
    id: "1",
    title: "Some Of Ink",
    coverImage: "/assets/music-assets/Some Of Ink EP Cover.png",
    releaseYear: "2025",
    duration: "7:27",
    songs: [
      {
        id: "1",
        title: "Back Again, Again",
        duration: "2:02",
        lyrics: [
          {
            lines: ["I call this track a queue", "The way you look at back again"],
            explanation: "Wordplay on 'queue' and 'cue', introducing the recurring theme of returning or re-emerging.",
          },
          {
            lines: ["Dan Kuso playin’ Bakugan", "He’s back, look at Drago hand me a championship belt"],
            explanation: "Referencing childhood heroism and fantasy (Bakugan) to build a persona of comeback and earned recognition.",
          },
{
            lines: [
              "He came to go ham",
              "When he said",
              "That Somno the rapper has slept?",
            ],
            explanation: "Suggests being underestimated and now returning with full force.\nOriginally, Leon's stage name was Somno (early 2019). This was before coming up with the moniker Klense as a play on the word 'cleanse', and his own initials.",
          },
          {
            lines: [
              "No braggadocio",
              "This rollercoaster",
              "Is s’posed to",
              "Put me where I’m s’posed to be",
            ],
            explanation: "Acknowledges the ups and downs of the journey, with faith in eventual purpose.",
          },
          {
            lines: [
              "On top",
              "Like receipts buyin’ groceries",
              "Own beats",
              "And hold up a feat.",
            ],
            explanation: "A clever metaphor for dominance and independence in music.",
          },
          {
            lines: [
              "Boy I don’t go to sleep",
              "I know that we already did this",
              "But I don’t wanna leave",
            ],
            explanation: "Persistence despite repetition — a refusal to quit.",
          },
          {
            lines: [
              "Goin’ back to my roots",
              "The reason I started rappin’",
              "When Covid made me recluse",
              "But maybe that’s not the truth",
            ],
            explanation: "Introspective moment tracing the origins of the creative journey.",
          },
          {
            lines: [
              "The reason I’m in this booth:",
              "To grab a hold of another beat",
              "Just to snap it in two",
              "A natural, In fact,",
            ],
            explanation: "Driven by the need to create and destroy tracks effortlessly — a born talent.",
          },
          {
            lines: [
              "An animal on tracks",
              "Harambe silverback",
              "And havin’ to get past",
              "Any opposition",
            ],
            explanation: "Drawing primal strength and determination from iconic imagery (Harambe).",
          },
          {
            lines: [
              "That’s hangin’ on my back",
              "I’m angered and I can’t",
              "Be flattered when I rap",
              "Part of me thinks",
            ],
            explanation: "Burdened by critics and self-doubt, yet pushing forward.",
          },
          {
            lines: [
              "That it’s all gon’ sound as bad",
              "As rappers tryna challenge that",
            ],
            explanation: "Still fears mediocrity, but confident it won’t be worse than weak opposition.",
          },
          {
            lines: [
              "and then I be up",
              "They seein’ me",
              "Seein’ Leon",
              "Like Bruce,",
            ],
            explanation: "Sudden rise and visibility, likening himself to Bruce Lee — iconic and sharp.",
          },
          {
            lines: [
              "Kick n’ snarin’ ‘em easy",
              "Made a truce, hear ‘em still speak",
            ],
            explanation: "Mastery over rhythm and opponents, even in peace they acknowledge his prowess.",
          },
          {
            lines: [
              "And it’s been a long time",
              "Since I saw myself",
              "In the frontlines",
              "So I front lines",
            ],
            explanation: "Long absence from prominence, but ready to take charge again.",
          },
          {
            lines: [
              "And dare anyone to trump mine",
              "Seein’ while they joke, bidin’ time",
            ],
            explanation: "Issuing a challenge while observing others play it safe. Also a reference to the 'Trump' card (and cards in general, given how the last few lines are phrased with bluffing/jokers imagery), and the Trump and Biden (Joke/Joe, Bidin'/Biden) presidencies. Triple entendres are pretty nice, eh?",
          },
          {
            lines: [
              "At home, writin’ lines",
              "And oh, I don’t mind",
              "I’m fine",
              "Been a long time",
            ],
            explanation: "Finding peace in solitude and dedication to the craft.",
          },
          {
            lines: [
              "Now I wind your minds so tight",
              "You could have lines that divide!",
            ],
            explanation: "Wordplay on intricate lyricism that causes division or provokes thought.",
          },
          {
            lines: [
              "I hear the engine go on and on again",
              "So intricate, I’d be honoured if",
              "I could get to it",
              "Climbin’ on the fence",
            ],
            explanation: "Motif of persistent ambition and seeking entrance into greatness.",
          },
          {
            lines: [
              "To be on da fens",
              "Defensive when I make it on, I guess",
              "Super slow, U-N-O",
              "Golf again",
            ],
            explanation: "Wordplay continues with indecision, caution, and unexpected metaphors.",
          },
          {
            lines: [
              "Or sumo, they been waitin’ on me then",
              "Scale see me break it",
              "I’m Kong, Godzilla",
              "And long been wantin’",
            ],
            explanation: "Massive presence being held back, now ready to erupt.",
          },
          {
            lines: [
              "To stomp again",
              "Blockin’ ‘em",
              "From the first place",
              "In the first place",
            ],
            explanation: "Dominance and return to rightful position at the top.",
          },
          {
            lines: [
              "That right there got ‘em at loggerheads",
              "Make ‘em feel they lost their edge",
              "Lookin’ like sausages",
              "Stuck on a skewer",
            ],
            explanation: "Opponents appear ridiculous and confused in comparison.",
          },
          {
            lines: [
              "Rotisserie’d and served with some omelettes",
              "That I just had to get off my chest",
              "I stay up rackin’ up records",
              "I’m backin’ ‘em back in a corner",
            ],
            explanation: "Unloading built-up bars and pushing back competition.",
          },
          {
            lines: [
              "And wrapped in a sorta",
              "Mish-mash of the flora and fauna",
              "Imported in August",
              "I’m givin’ the orders",
            ],
            explanation: "Eclectic, artistic authority that stands out from the ordinary.",
          },
          {
            lines: [
              "Obsessive Compulsive Disorder",
              "When I’m takin’ beats",
              "And I vow to destroy ‘em",
              "Powder keg goin’ off",
            ],
            explanation: "Explosive precision in attacking beats, driven by obsession.",
          },
          {
            lines: [
              "I’m never goin’ soft",
              "Raisin’ the bar like I pilot a Boeing, y’all borin’ ahhh!",
            ],
            explanation: "Refuses to compromise quality, elevating above a dull crowd.",
          },
          {
            lines: [
              "(MCs you cannot feel)",
              "Yeah (Yeah)",
              "Yeah (Yeah)",
              "(MCs you cannot feel)",
            ],
            explanation: "Mocking emotionless or uninspired MCs.",
          },
          {
            lines: [
              "Yeah, yeah (Yeah, yeah)",
              "Yeah (Yeah)",
              "(MCs you cannot feel)",
              "I’m back (I’m back)",
            ],
            explanation: "Reaffirmation of return with disdain for unfeeling rappers.",
          },
        ],
      },
      {
        id: "2",
        title: "Still Ultimate",
        duration: "2:49",
        lyrics: [
          {
            lines: ["(Ultimate, I'm ultimate", "I'm ultimate, I'm ultimate", "I'm ultimate, I'm ultimate", "I'm ultimate, I'm-)","", "Ahh, you think I forgot, eh?", "Hahaha, nah! Nahh... I never forgot!","", "But here I am ladies and gentlemen", "I am just a human being like yourself", "If I have anything to you, it is for you to forgive me", "If you have done to me, I say it is for me to forgive you..."],
            explanation: "The track opens by sampling various sources, as well as a brief intro by Klense jokingly saying that he never forgot [about the original version of this song], and adapting words from Jomo Kenyatta, Kenya's first Prime Minister and President. These lines from Kenyatta's speech establish a tone of humanity and reconciliation. Rather than boasting, the artist begins by positioning himself as equal to the listener ('just a human being like yourself') and introduces themes of mutual forgiveness, setting up a reflective foundation before transitioning to more confident elements of the song.",
          },
          {
            lines: ["Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!"],
            explanation: "This hook echoes Denzel Curry's viral track 'Ultimate' (2015), which similarly featured repetitive declarations of being 'ultimate.' By adopting this structure, Klense both pays homage to a recognized work in modern hip-hop while asserting his own claim to greatness. The repetition serves as both a hypnotic mantra and an amplification of the artist's confidence, building intensity before transitioning to the verses.",
          },
          {
            lines: [
              "Sit across my mic",
              "With my mind roamin';",
              "Slicin' mics open",
              "My opponents",
              "I like 'em, so devoted",
              "To bein' roped into",
              "My ring and in a bout",
              "I'm so explosive",
            ],
            explanation: "Klense begins the verse by establishing the mental state he enters when performing, describing a fluid consciousness that allows for creative freedom. He then transitions to combat imagery, portraying his relationship with competitors through both violent metaphors ('slicin' mics') and sporting contests ('ring' and 'bout' suggesting boxing). The wordplay on 'explosive' characterizes his lyrical delivery as unpredictable and devastating, setting the aggressive tone for the track.",
          },
          {
            lines: [
              "Why'd ya' think",
              "General Ike, bombs I was totin'?",
              "Write in ink,",
              "And the pad just starts smokin'",
              "No nicotine, give reckonings with emotion",
              "Figurin' me out's like bein' home when-",
              "I roam in your path",
              "Bad omen, I'm back",
            ],
            explanation: "This section blends military imagery with writing metaphors. The reference to 'General Ike' (Eisenhower, WWII general and US President) connects military strategy with Klense's approach to battles on the mic. This ties in with another Klense song 'General Ike' (likely what Klense may be referring to here). The smoking pad metaphor suggests his writing is so intense it creates heat, while clarifying it's not from chemical stimulation but pure emotion. The final lines establish his return as an ominous event for opponents, with clever wordplay between 'roam/home' and 'omen/I'm back,' creating a sense of inevitable confrontation.",
          },
          {
            lines: [
              "Goin' to black",
              "n' blue opponents",
              "A puma, the poet",
              "Who loomin' a hornet",
              "Fly like a butterfly",
              "Just like Muhammad",
              "Ali, while stingin' like bees",
              "Took a Boeing, I leave",
            ],
            explanation: "Klense continues the combat theme with 'black and blue' (bruising) opponents while comparing himself to predatory and dangerous animals. The puma represents stealth and power, while the hornet suggests aggression. The Muhammad Ali reference ('fly like a butterfly... stinging like bees') directly quotes the boxing legend's famous phrase, aligning Klense with perhaps the most renowned trash-talker in sports history. The wordplay on 'fly' transitions from movement to aviation with 'Boeing,' suggesting an elevated departure from competition - they're beneath him.",
          },
          {
            lines: [
              "In a private jet",
              "In my head",
              "To the Maldives",
              "If I had to guess",
              "I'm the best",
              "Try n' try me!",
              "Make like Miley",
              "Hand 'em all standards",
            ],
            explanation: "This section transitions from physical movement to mental state, with luxury imagery (private jet, Maldives vacation) representing his mental elevation above others. The direct declaration 'I'm the best' shows unflinching confidence. The Miley Cyrus/Hannah Montana reference works on multiple levels: 'Hand 'em all standards' plays on 'Hannah Montana' phonetically while suggesting he sets the bar for others. This pop culture reference also demonstrates his ability to blend different worlds into his lyrics while reinforcing the theme of dual identity (like Miley/Hannah) that appears later with other dualities.",
          },
          {
            lines: [
              "I know they can't quite reach",
              "Where are my manners?",
              "I should ask nicely",
              "Make like Banner",
              "Bruisin' 'em lightly",
              "Get green",
              "Rest-assured a purp'll be pinin'",
              "If you knew what I mean",
            ],
            explanation: "Klense employs mock courtesy ('Where are my manners?') after asserting others can't match his level. The Bruce Banner/Hulk (Bruce and Bruisin') metaphor works brilliantly here - suggesting controlled power that becomes destructive when provoked. 'Get green' references the Hulk's color while possibly alluding to money/success. The wordplay on 'purple/people' in 'purp'll be pinin'' suggests his opponents suffer while also potentially referencing purple as a color associated with royalty, further establishing his self-proclaimed superiority. Klense takes this a step further as The Hulk (Bruce Banner) is often portrayed as being green in purple shorts.",
          },
          {
            lines: [
              "You would know that because of the thunder",
              "There was lightnin'",
              "Guess that I've become another propagated lightbeam",
              "Lightyears away, James Webb saw me shinin'",
              "I've been",
              "On a track, stoppin' at",
              "Nothin'",
              "That rap, that you were spittin' there's prolly wack",
            ],
            explanation: "This section escalates from natural forces (thunder/lightning) to cosmic significance. The James Webb Space Telescope reference (launched December 2021) is particularly timely, suggesting Klense's brilliance is visible across vast distances of space. The light metaphors (lightbeam, shining) contrast with earlier violence/combat imagery, positioning him as illuminating rather than just destroying. The verse then shifts to direct confrontation, dismissing competitors with 'probably wack,' while the 'on a track, stopping at nothing' line works as both a music reference and a declaration of his relentless approach.",
          },
          {
            lines: [
              "Call it cap",
              "And I snap back",
              "'Til it's fitted, man I'm Bonnie and Clyde",
              "(Plus) Jekyll and Hyde, inside",
              "I'm my own competition",
              "Tried bein' different",
              "Now my life in a sentence's",
              "Been quite fulla signs that I'm",
            ],
            explanation: "This dense section contains multiple layers of wordplay. 'Cap' in modern slang means lie/fake, but Klense uses it to set up 'snap back' and 'fitted' - both types of hats and actions. Additionally, Klense continues the references to superheroes with 'Cap' as Captain America. The references to famous duos (Bonnie and Clyde, Jekyll and Hyde) suggest both his outlaw status and internal duality (A concept touched on in Avengers: Civil War, prominently featuring Captain America grapping with these themes). 'I'm my own competition' is a classic hip-hop boast that no one else is on his level. 'Life in a sentence' works as both prison metaphor and linguistic wordplay, suggesting his biography is condensed into his lyrics.",
          },
          {
            lines: [
              "Makin' an entrance",
              "Punch like a piston",
              "Inside of an engine",
              "With the rhythm",
              "Transcend any fears",
              "Of a lack of progression!",
              "Man with a method",
              "I'm Batman",
            ],
            explanation: "Klense uses mechanical imagery (piston, engine) to describe his technical precision, comparing his rhythmic delivery to a finely-tuned machine. The 'transcend any fears of a lack of progression' line addresses artistic growth anxiety - a common concern for musicians releasing follow-up work. The Batman reference establishes him as both methodical and vigilante-like, operating outside normal constraints while maintaining strict personal discipline.",
          },
          {
            lines: [
              "I'm back and I'm spammin' the effort",
              "MCs frown",
              "Make a sullen expression",
              "When I drop down,",
              "Rap just to teach 'em a lesson",
              "Call cap, Imma act",
              "Like lethal weapons when I-",
              "Clap back",
            ],
            explanation: "This section returns to the comeback theme with 'I'm back,' while 'spamming the effort' suggests overwhelming work ethic. Other MCs' negative reactions ('frown,' 'sullen expression') position Klense as disruptive to the status quo. The teaching metaphor establishes superiority, while 'Lethal Weapon' references the action film series, suggesting dangerous retaliatory capacity. 'Clap back' works both as slang for responding to criticism and as gunfire imagery, connecting to the Lethal Weapon reference.",
          },
          {
            lines: [
              "Add laughs",
              "See 'em surrenderin'!",
              "I beam 'em, Elevenin' the heathens",
              "I got a bit of He-Man and Venom",
              "When I'm schemin' to settle this I'm-",
            ],
            explanation: "The final verse section contains three distinct pop culture references: Stranger Things (Eleven's telekinetic abilities with 'beam 'em' and 'Elevenin''), He-Man (the superhero with supernatural strength), and Venom (the Marvel symbiote character known for ruthlessness). This triple reference demonstrates Klense's ability to connect across different media universes while reinforcing his dangerous, superhuman persona. The verse intentionally cuts off mid-sentence to transition directly back to the hook, creating a circular structure that suggests perpetual dominance.",
          },
          {
            lines: ["Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!", "Ultimate! Ultimate!"],
            explanation: "The track ends with an extended repetition of the hook, driving home the central theme of unmatched excellence. The decision to end with the same phrase that dominated the intro creates perfect symmetry, encapsulating the track's message in a single repeated word. As mentioned earlier, this structure echoes Denzel Curry's 'Ultimate' while establishing Klense's own claim to the concept, the repetition functioning as both earworm and declaration.",
          },
        ],
      },
      {
        id: "3",
        title: "Just Words",
        duration: "2:36",
        lyrics: [{
          lines: [
            "Okay, I got the planet spinnin' beneath me there's nothin' you can do",
            "Lovin' what the truth taught you",
            "As I look at you",
            "Face puffin' up"
          ],
          explanation: "The song opens with cosmic imagery reminiscent of Atlas holding the world, establishing the artist's godlike dominance. This celestial metaphor echoes similar themes in Kendrick Lamar's 'To Pimp A Butterfly' where control and perspective from above are recurrent motifs. The 'truth' reference connects to the track's exploration of authenticity while 'face puffin' up' captures a visual reaction to being confronted with uncomfortable realities—similar to how Eminem frequently describes opponents' physical reactions to his lyrics in tracks like 'Killshot' and 'Rap God.'"
        },
        {
          lines: [
            "Like a bird, staring at the moon",
            "What'm I gonna do, huh!",
            "Tell 'em 'bout my ill repute?",
            "Interviews"
          ],
          explanation: "The bird/moon comparison creates a David Attenborough-like nature documentary framing, suggesting the listener's bewilderment when faced with something celestially beyond reach. 'Ill repute' works triple-duty: suggesting negative reputation, showcasing technical skill ('ill' as excellence in the tradition of Nas' 'Illmatic'), and hinting at the artist's controversial position. The interview reference connects to the media ecosystem surrounding artists, reminiscent of Kanye West's complicated relationship with press portrayal as explored in 'I Am A God' and various public statements about media representation."
        },
        {
          lines: [
            "Hear my inner views",
            "That's what I'm givin' you",
            "In interludes",
            "I gotta see it through"
          ],
          explanation: "This quadruple entendre connects 'interviews/inner views/in-between views/interludes,' blending media critique with artistic authenticity. The wordplay technique recalls MF DOOM's intricate linguistic constructions. 'See it through' references artistic integrity similar to J. Cole's 'Middle Child' philosophy of maintaining vision despite commercial pressures. The concept of 'inner views' also mirrors Frank Ocean's approach in 'Blonde' where personal perspective transcends conventional narrative, suggesting Klense values authentic expression over traditional interview formats."
        },
        {
          lines: [
            "It's how I'm pinnin' you",
            "While itchin' to",
            "But now I gotta move",
            "Because they seein' through",
            "The lyrics too"
          ],
          explanation: "The wrestling imagery ('pinnin' you') invokes both physical dominance and the WWE entertainment factor of performative combat—a metaphor The Rock often used when transitioning between wrestling and rap culture. The 'itchin'' suggests eager anticipation while creating near-rhymes with 'pinnin'' and 'seein'', demonstrating the technical prowess of artists like Black Thought. 'Seein' through' plays with transparency motifs found throughout Jay-Z's '4:44' album where vulnerability and revelation become strength. 'Lyrics too' suggests meta-awareness of his own writing process, similar to Aesop Rock's self-referential style in 'Labor Days.'"
        },
        {
          lines: [
            "It's been empirical",
            "But they don't see the truth",
            "Still as huge",
            "As havin' Kong through the ceiling too"
          ],
          explanation: "The juxtaposition of scientific methodology ('empirical') with artistic expression creates intellectual tension similar to GZA's approach in 'Liquid Swords'. This scientifically-informed lyrical philosophy connects to contemporaries like Lupe Fiasco who frequently incorporate academic concepts. The King Kong reference does triple duty: invoking the iconic monster's size, suggesting breaking through limitations ('ceiling'), and possibly alluding to the racialized aspects of the Kong narrative as examined in academic works like Cynthia Erb's 'Tracking King Kong.' This multidimensional reference technique mirrors the layered cultural analysis in Childish Gambino's 'This Is America.'"
        },
        {
          lines: [
            "And Godzilla",
            "In a barn, with the chicken coup, and",
            "I'm, considered the bomb",
            "When I stick it to them, I"
          ],
          explanation: "The Godzilla reference builds on the previous monster imagery while adding Japanese pop culture connections—potentially nodding to Foreign Exchange's international influences. The unlikely setting ('barn/chicken coup') creates surreal juxtaposition reminiscent of Outkast's 'ATLiens' where familiar and alien elements collide. The wordplay on 'coup/coop' demonstrates political awareness similar to Dead Prez or Public Enemy, while 'the bomb' simultaneously invokes 90s slang popularized by EPMD and Phife Dawg while maintaining the destructive metaphor setup with Godzilla. 'Stick it to them' suggests both aggression and the 'sticking' of landing points in debate—a technique perfected in battle rap by artists like Loaded Lux."
        },
        {
          lines: [
            "Yawn, I forget they're on",
            "But I keep it movin' I'm-",
            "so unimpressed",
            "And y'all wanna get"
          ],
          explanation: "The performative boredom ('yawn') channels Drake's dismissive attitude toward lesser competitors in tracks like 'Back to Back.' The claimed forgetfulness creates an appearance of effortless superiority similar to Floyd Mayweather's boxing persona that influenced Rick Ross's 'Idols Become Rivals.' 'Keep it movin'' echoes Eric B. & Rakim's philosophy of constant progression and innovation. The 'unimpressed' stance suggests high standards similar to Tech N9ne's critical approach to mainstream rap. This section's overall dismissive tone relates to the battle rap tradition exemplified by Murda Mook where psychological dominance is established through appearing unbothered."
        },
        {
          lines: [
            "Another one those in the net",
            "I'm talkin' baskets",
            "When I got 'em, ever so pressed",
            "The ball's in your court, homie"
          ],
          explanation: "The extended basketball metaphor connects to Jay-Z's 'Brooklyn's Finest' where hoops and hustling metaphors intertwine. 'In the net' works as both basketball scoring and internet/capturing imagery, showing linguistic versatility similar to Royce da 5'9\". 'Pressed' brilliantly functions as both basketball defensive pressure (like full-court press) and emotional distress, reminiscent of Freddie Gibbs' multilayered street terminology. 'Ball in your court' transitions the sports metaphor to tennis while maintaining the basketball connection, demonstrating the seamless metaphor-shifting technique mastered by Black Thought in The Roots' 'Things Fall Apart.' This sports imagery also connects to LeBron James's cultural significance in hip-hop as referenced by Kendrick Lamar, Drake, and J. Cole."
        },
        {
          lines: [
            "Put you on the deep end, and then I",
            "Stare you in your eyes", 
            "'Til you realise", 
            "That you gon' wait"
          ],
          explanation: "The swimming metaphor ('deep end') suggests both throwing someone unprepared into difficult situations and possibly Michael Phelps' dominance as a cultural reference point. The transition to direct confrontation through eye contact evokes the intense battle rap face-offs in leagues like URL and KOTD, while also suggesting the unflinching gaze described in 2Pac's more confrontational tracks. 'Til you realise' creates anticipatory tension similar to methodical storytelling in Slick Rick's narratives. The 'wait' concept establishes hierarchical positioning reminiscent of how Dr. Dre positioned himself as gatekeeper in the industry, making artists like Snoop Dogg and Eminem wait for his mentorship and guidance."
        },
        {
          lines: [
            "You gon' wait your turn, baby!",
            "Baby, you and I",
            "We been do or die,",
            "We been do or die"
          ],
          explanation: "The repeated 'baby' address creates deliberate ambiguity between romantic and competitive contexts—a technique popularized by Andre 3000 in OutKast's 'Hey Ya' where seemingly playful language masks deeper meanings. 'Wait your turn' establishes clear power dynamics reminiscent of how Nicki Minaj positioned herself in 'Monster,' demanding respect while making others wait. The 'do or die' phrase invokes both the Chicago rap group and the high-stakes mentality of 50 Cent's early work where survival and success were presented as the only options. This duality between intimacy and competition reflects Lauryn Hill's exploration of complicated relationships in 'The Miseducation of Lauryn Hill' where personal and professional boundaries blur."
        },
        {
          lines: [
            "But homegirl, they just words",
            "I said,",
            "Stare you in your eyes",
            "'Til you realise" 
          ],
          explanation: "The central paradox of 'just words' while demonstrating verbal virtuosity connects to Common's philosophical approach in 'I Used to Love H.E.R.' where hip-hop's essence is questioned through the medium itself. 'Homegirl' creates conversational intimacy similar to how Missy Elliott addresses listeners directly, establishing both connection and authority. The repeated eye contact imagery suggests unflinching conviction reminiscent of DMX's intense delivery style where emotional and physical confrontation merge. This section develops tension between dismissing language's power while weaponizing it—a contradiction explored in Yasiin Bey's (formerly Mos Def) 'Mathematics' where statistical realities are presented as 'just numbers' yet carry profound significance."
        },
        {
          lines: [
            "That you gon' wait",
            "You gon' wait your turn, baby!",
            "Baby, you and I",
            "We been do or die,"
          ],
          explanation: "The repetition technique here recalls DJ Khaled's signature phrase repetition, creating recognizable hooks through persistence. The continued power dynamic established through 'wait your turn' connects to industry hierarchies as discussed in Ice-T's critiques of music business structure. The 'baby' address maintains the dual meaning between romantic partner and competitive opponent, similar to how The Notorious B.I.G. often blurred these distinctions in tracks like 'I Got a Story to Tell.' The 'do or die' mentality reflects Chicago's South Side reality as documented by artists like Chief Keef and Chance the Rapper from opposing perspectives, suggesting Klense's awareness of regional hip-hop contexts."
        },
        {
          lines: [
            "We been do or die",
            "But homegirl, they just words",
            "Still in my mind, residin' in it",
            "Is the illest of lines, go viral with it; see me dip it in brine"
          ],
          explanation: "The transition from hook to second verse uses seamless engineering reminiscent of Travis Scott's production style where boundaries between sections blur. 'Still in my mind' shifts focus to internal creative processes, similar to Nas' introspective approach in 'I Gave You Power.' The 'illest of lines' directly connects to Big L and Big Pun's technical prowess, while 'go viral' updates traditional boasting for the social media era, demonstrating contemporary awareness like Megan Thee Stallion. The extended salt metaphor ('brine') for causing irritation shows commitment to sustained imagery similar to MF DOOM's food references throughout 'MM..FOOD,' creating thematic consistency while demonstrating linguistic creativity."
        },
        {
          lines: [
            "So my lyrics, make you salty",
            "Ballsy enough to make you wan' be in songs, see I'm Halsey in Paris",
            "And y'all'll be embarrassed",
            "When I'll be the nearest to you"
          ],
          explanation: "The 'salty' continuation extends the brine metaphor while incorporating modern slang popularized through gaming culture and platforms like Twitch. The Halsey reference works multiple levels: directly naming the singer, creating wordplay on 'hell-see in Paris' (potentially referencing Jay-Z/Kanye's 'Ni**as in Paris'), and suggesting international presence. This triple-entendre technique mirrors Lil Wayne's approach to stacking meanings in series. 'Y'all'll' demonstrates phonetic compression skills similar to E-40's linguistic innovations. The proximity threat ('nearest to you') suggests both physical intimidation like DMX and intellectual outmaneuvering like Talib Kweli, creating multi-dimensional competitive positioning."
        },
        {
          lines: [
            "I'm too new; so tell me who's who,", 
            "Like an episode and you got Stephen on Blues Clues",
            "Joshin' around, as if I got, no-thin' to lose,",
            "Or to do!"
          ],
          explanation: "The 'too new' claim positions the artist beyond contemporary trends, similar to how André 3000 often describes being ahead of his time. The Blues Clues reference demonstrates cross-generational pop culture knowledge, connecting children's educational programming to hip-hop in the tradition of MF DOOM's cartoon samples. This creates nostalgic connection for millennial listeners while maintaining competitive edge. 'Joshin'' creates clever wordplay while 'nothin' to lose' references both 2Pac's fearless attitude and potentially Notorious B.I.G.'s 'Juicy' narrative of rising from nothing. The rhythmic breaking of 'no-thin'' demonstrates syllabic manipulation mastered by artists like Twista and Busta Rhymes, showing technical control over delivery."
        },
        {
          lines: [
            "It's",
            "Foolproof, I'm in the booth as I do this, And",
            "Truth is, you're gonna lose when I'm losin' it",
            "Provin' that my improvement is zoomin' I'm"
          ],
          explanation: "The studio reference ('booth') connects to the tradition of DJ Premier production interludes where studio environments become part of the narrative. 'Foolproof' suggests both simplicity and technical reliability, qualities emphasized in Tyler, the Creator's production philosophy. The wordplay on 'losing it' brilliantly balances control and chaos similar to Eminem's persona in 'The Way I Am.' The rapid internal rhyme scheme ('proving/improvement/zooming') demonstrates technical virtuosity like Busta Rhymes' speed-rap sections, while the progress narrative connects to Kanye West's artistic evolution rhetoric throughout his discography. The overall confidence in technical ability reflects the production-conscious perspective of artists like J Dilla who emphasized mastery of equipment."
        },
        {
          lines: [
            "Groovin' on every tune that I do this in, I'm",
            "More-so impressed",
            "By yours truly, next",
            "I'm 'boutta give 'em what they want next"
          ],
          explanation: "The 'groovin'' reference recalls A Tribe Called Quest's emphasis on feel and rhythm over technical showing-off. Self-admiration ('impressed by yours truly') updates Kanye West's self-awareness for a new generation while maintaining the tradition of Muhammad Ali's poetic self-promotion that influenced hip-hop's confidence. The audience-conscious statement about giving people 'what they want' shares DNA with Drake's commercial awareness while maintaining artistic integrity like J. Cole. The repetition of 'next' emphasizes future orientation similar to Future's construction of anticipation through ad-libs and hooks. This section balances commercial awareness with artistic integrity in the tradition of Jay-Z's 'The Blueprint.'"
        },
        {
          lines: [
            "And nothin' less",
            "Bring a sham pain (champagne)",
            "If he's talkin with chest",
            "And then I make like a starin' contest, the way I"
          ],
          explanation: "The quality guarantee ('nothin' less') reflects the premium branding approach of artists like Rick Ross. The ingenious champagne/sham pain homophone creates dual meanings worthy of Lupe Fiasco's wordplay, suggesting both celebration and fake posturing. This may reference Jay-Z's Armand de Brignac ownership and broader hip-hop champagne culture dating to the Notorious B.I.G.'s 'Big Poppa.' 'Talking with chest' references aggressive posturing in the tradition of DMX while possibly alluding to the 'all chest no legs' criticism in gym culture. The staring contest metaphor demonstrates commitment to confrontation similar to Ice Cube's unflinching gaze in both music and film personas, while creating perfect transition back to the hook—demonstrating song structure mastery like Pharrell Williams."
        },
        {
          lines: [
            "Stare you in your eyes", 
            "'Til you realise", 
            "That you gon' wait",
            "You gon' wait your turn, baby!"
          ],
          explanation: "The hook's return demonstrates structural mastery similar to Dr. Dre's production philosophy where repetition creates familiarity while subtly evolving. The direct confrontation through eye contact references both hip-hop battle culture's face-to-face tradition and the intimidation techniques documented in Sun Tzu's 'Art of War'—a text frequently referenced by Wu-Tang Clan. The waiting concept reinforces hierarchical positioning similar to how veteran artists like Snoop Dogg established generational authority. The hook's rhythmic construction shows influences from southern trap cadences pioneered by T.I. and Gucci Mane, while maintaining lyrical substance that connects to east coast traditions."
        },
        {
          lines: [
            "Baby, you and I",
            "We been do or die,",
            "We been do or die",
            "But homegirl, they just words"
          ],
          explanation: "The intimate 'Baby' address draws from R&B crossover traditions pioneered by artists like Ja Rule and Nelly. The 'do or die' repetition emphasizes both commitment and the high-stakes mentality of Chicago's drill scene. The continued tension between relationship and competition recalls the complex dynamics in Rihanna and Eminem's 'Love the Way You Lie' where intimate and confrontational elements merge. The dismissive 'just words' line has now accumulated substantial ironic weight, creating philosophical depth similar to Kendrick Lamar's exploration of language in 'DAMN.' This phrase also connects to debates about artistic responsibility raised by Ice-T's 'Cop Killer' controversy and broader questions about whether lyrics constitute mere expression or actual threats/promises."
        },
        {
          lines: [
            "I said,",
            "Stare you in your eyes", 
            "'Til you realise", 
            "That you gon' wait"
          ],
          explanation: "The 'I said' emphasis connects to hip-hop's oral tradition where repetition for emphasis has roots in African-American church traditions that influenced artists like Kirk Franklin and Chance the Rapper. The continued eye contact imagery connects to prison culture's stare-down intimidation techniques documented in 2Pac's writings on institutional power dynamics. The 'realise' suggests an awakening similar to consciousness movements in hip-hop pioneered by KRS-One and Public Enemy. These elements combine cultural resistance traditions with personal confrontation, similar to how N.W.A. balanced systemic critique with individual threats, creating layered meaning that operates on both personal and political levels."
        },
        {
          lines: [
            "You gon' wait your turn, baby!",
            "Baby, you and I",
            "We been do or die,",
            "We been do or die"
          ],
          explanation: "The accumulated repetition now functions almost mantra-like, resembling both religious chants that influenced gospel-rap crossovers like Kanye's 'Jesus Walks' and hypnotic elements of southern production pioneered by DJ Screw. The 'wait your turn' hierarchy connects to broader conversations about paying dues in hip-hop, as discussed in documentaries like 'The Art of Rap.' The relationship framing through 'Baby, you and I' creates tension between romantic and competitive contexts similar to how Eminem's 'Kim' and 'Superman' blur these boundaries to disturbing effect. The 'do or die' mentality connects to both street code ethics documented by sociologists like Elijah Anderson and the commercial pressures of debut albums described by J. Cole in '2014 Forest Hills Drive.'"
        },
        {
          lines: [
            "But homegirl, they just words",
            "I said,",
            "Stare you in your eyes",
            "'Til you realise" 
          ],
          explanation: "The track's central paradox has fully developed by this point, with 'just words' functioning both as dismissal and profound statement—similar to how Lauryn Hill explored contradictions in 'The Miseducation.' The direct address as 'homegirl' maintains the dual relationship/competition framing while suggesting familiarity in the tradition of Snoop Dogg's conversational style. The unflinching gaze imagery now carries accumulated weight from hip-hop's visual culture, from album covers like Ice Cube's 'AmeriKKKa's Most Wanted' to the intense close-ups in music videos directed by Hype Williams. This section demonstrates how repetition can build meaning rather than diminish it, a technique mastered by producers like Metro Boomin."
        },
        {
          lines: [
            "That you gon' wait",
            "You gon' wait your turn, baby!",
            "Baby, you and I",
            "We been do or die,"
          ],
          explanation: "As the track approaches conclusion, the hook elements have developed almost ritualistic significance, similar to how Kendrick Lamar's repeated phrases in 'To Pimp A Butterfly' accumulate meaning throughout the album. The power dynamic established through 'wait your turn' connects to broader concepts of patience and delayed gratification examined in J. Cole's 'Middle Child' philosophy about industry positioning. The intimacy suggested through 'Baby, you and I' creates emotional complexity beyond simple aggression, similar to how 2Pac balanced vulnerability and strength throughout his discography. This section demonstrates the musical concept of development through repetition mastered by producers like 9th Wonder."
        },
        {
          lines: [
            "We been do or die",
            "But homegirl, they just words"
          ],
          explanation: "The track concludes with the central philosophical tension fully developed: these are 'just words,' yet their arrangement throughout the song demonstrates their considerable power—similar to how Nas examined the power and limitations of language in 'I Gave You Power.' The 'do or die' ethos connects to both street code ethics documented in the works of Kool G Rap and the artistic commitment philosophy expressed in Rakim's 'Follow the Leader.' This closing sentiment encapsulates the track's sophisticated exploration of language's dual nature—limitation and transcendence—creating intellectual depth comparable to the philosophical questions raised in Yasiin Bey's 'Mathematics' or Talib Kweli's 'Reflection Eternal.' The final 'just words' leaves listeners with unresolved tension between dismissing language and celebrating it, a contradiction that mirrors hip-hop's broader cultural position between marginalization and cultural dominance."
        }
      ],
      },
    ],
  },
];

export default function EPPage() {
  const params = useParams();
  const epId = params?.epId as string | undefined;
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedLyric, setSelectedLyric] = useState<number | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const ep = eps.find((e) => e.id === epId);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / windowHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!ep) {
    return <div>EP not found</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-100 to-white dark:from-slate-900 dark:to-slate-800">
      <InstructionPopup />
      <Container>
        <div className="max-w-6xl mx-auto py-8 pt-0">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* EP Cover with Tilt Effect - Now includes back button */}
            <div className="md:sticky md:top-16 md:self-start flex flex-col gap-6 w-full md:w-1/3">
              {/* Back button moved here */}
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Discography
              </button>
              
              <Tilt
                className="aspect-square rounded-lg overflow-hidden shadow-lg"
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                glareEnable={true}
                glareMaxOpacity={0.6}
                glareColor="#ffffff"
                glarePosition="all"
                transitionSpeed={250}
              >
                <Image
                  src={ep.coverImage}
                  alt={`Cover of ${ep.title}`}
                  fill
                  className="object-cover"
                />
              </Tilt>
              <div
                className="animate-gradient-x backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg p-6 w-full"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--gradient-start), var(--gradient-middle), var(--gradient-end))`,
                }}
              >
                <div
                  className="h-1 rounded"
                  style={{
                    backgroundColor: `var(--progress-bar-color)`,
                    width: `${scrollProgress}%`,
                  }}
                ></div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {ep.title}
                </h1>
                <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  By Klense
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{ep.releaseYear}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{ep.duration}</p>
              </div>
              
              {/* Listen Now Section */}
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4">Listen Now</h2>
                <div className="grid grid-cols-3 gap-4">
                  {/* Spotify, Apple Music, and YouTube Links */}
                  {ep.id === "1" && (
                    <>
                      <a
                        href="https://album.link/some-of-ink-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to Some Of Ink"
                        className="flex flex-col items-center justify-center p-2 bg-[#1DB954] text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                      >
                        <img
                          src="/assets/icons/icons8-spotify.svg"
                          alt="Spotify"
                          className="h-8 w-auto mb-1"
                        />
                        <span className="text-xs font-medium">Spotify</span>
                      </a>
                      <a
                        href="https://album.link/some-of-ink-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to Some Of Ink"
                        className="flex flex-col items-center justify-center p-2 bg-black text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                      >
                        <img
                          src="/assets/icons/icons8-apple-music.svg"
                          alt="Apple Music"
                          className="h-8 w-auto mb-1"
                        />
                        <span className="text-xs font-medium">Apple Music</span>
                      </a>
                      <a
                        href="https://album.link/some-of-ink-klense"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Listen to Some Of Ink"
                        className="flex flex-col items-center justify-center p-2 bg-[#FF0000] text-white rounded-md shadow hover:shadow-md hover:scale-105 transition-transform"
                      >
                        <img
                          src="/assets/icons/icons8-youtube.svg"
                          alt="YouTube"
                          className="h-8 w-auto mb-1"
                        />
                        <span className="text-xs font-medium">YouTube</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* EP Details */}
            <div className="flex-1 w-full">
              {/* Behind the EP */}
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Behind the EP</h2>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    The <strong>Some Of Ink EP</strong> takes its name from <strong>Son Of Ink</strong>, Klense's debut album. This latest project serves as a reimagining of select tracks from that album, blending the nostalgia of his early work with the growth and evolution he has experienced as an artist.
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    Among the highlights of the EP are reworked versions of <strong>Back Again</strong> (now titled <strong>Back Again, Again</strong>) and <strong>Ultimate</strong> (now titled <strong>Still Ultimate</strong>). These tracks have been meticulously refined to reflect Klense's current style and perspective, while still preserving the essence that made them resonate with listeners in the first place.
                  </p>
                </div>
              </div>

              {/* Tracklist Section */}
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Tracklist</h2>
              <div className="space-y-4">
                {ep.songs.map((song) => (
                  <div key={song.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <button
                      onClick={() => setSelectedTrack(selectedTrack === song.id ? null : song.id)}
                      className="w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                          {song.title}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                          {song.duration}
                        </span>
                      </div>
                    </button>
                    {selectedTrack === song.id && (
                      <div className="mt-4 space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 underline decoration-[var(--gradient-middle)] decoration-2 underline-offset-4">
                          Lyrics
                        </h3>
                        {song.lyrics.length > 0 ? (
                          song.lyrics.map((group, groupIndex) => (
                            <div
                              key={groupIndex}
                              className={`space-y-2 p-4 rounded-lg transition-all ${
                                selectedLyric === groupIndex
                                  ? "bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] text-[var(--text-primary)] shadow-lg"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                              onClick={() =>
                                setSelectedLyric(selectedLyric === groupIndex ? null : groupIndex)
                              }
                            >
                              <div className="space-y-2">
                                {group.lines.map((line, lineIndex) => (
                                  <p
                                    key={lineIndex}
                                    className={`text-sm sm:text-base font-medium leading-relaxed ${
                                      selectedLyric === groupIndex
                                        ? "text-[var(--text-primary)]"
                                        : "text-gray-800 dark:text-gray-200"
                                    }`}
                                  >
                                    {line || <br />}
                                  </p>
                                ))}
                              </div>
                              {selectedLyric === groupIndex && (
                                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
                                  {group.explanation.split("\n").map((line, index) => (
                                    <p
                                      key={index}
                                      className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic leading-relaxed"
                                    >
                                      {line}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 italic">Lyrics not available.</p>
                        )}
                        
                        {/* Track Breakdown - Added to match Album page */}
                        <button
                          onClick={() => {
                            const newSelectedNote = selectedNote === song.id ? null : song.id;
                            setSelectedNote(newSelectedNote);
                          }}
                          className="mt-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition"
                        >
                          {selectedNote === song.id ? "Hide Track Breakdown" : "Show Track Breakdown"}
                        </button>
                        {selectedNote === song.id && (
                          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg space-y-4">
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic leading-relaxed">
                              {ep.id === "1" && song.id === "1" ? (
                                <>
                                  <strong>Back Again, Again</strong> serves as a reimagined version of the original "Back Again" from Klense's debut album. This updated rendition preserves the core energy of the original while introducing new production elements and refined lyrics. The track encapsulates Klense's artistic growth since his early work, demonstrating how his technical abilities have evolved while maintaining his authentic voice.
                                </>
                              ) : ep.id === "1" && song.id === "2" ? (
                                <>
                                  <strong>Still Ultimate</strong> represents a fresh take on one of Klense's fan-favorite tracks. The reworked production creates a more immersive sonic landscape, while the updated lyrics reflect his current perspective. This track particularly showcases Klense's improved vocal delivery and more nuanced approach to wordplay. It is a reimagining of the original <strong>Ultimate</strong> from Klense's debut album.<strong>Son Of Ink </strong>(2021).

                                  <p className="mt-4">
                                  The track demonstrates Klense's ability to pay homage to hip-hop traditions while carving out his unique space. The track functions as both a sequel and a reimagining, allowing long-time fans to appreciate the evolution while new listeners can enjoy it as a standalone work. His references to personal history (including his former moniker) add depth for those familiar with his catalog.
                                  </p>

                                  <p className="mt-4">
                                  It particularly shines in its technical construction, with internal rhymes, extended metaphors, and thematic coherence that rewards multiple listens. For fans of technically proficient rap with layers of meaning, the reworked track offers a <strong>masterclass</strong> in how to refresh existing material while pushing forward artistically.
                                  </p>
                                </>
                              ) : ep.id === "1" && song.id === "3" ? (
                                <>
                                  <p className="mt-4">
                                  <strong>When Bars Become Blade, and Blade Becomes Philosophy.</strong>
                                  </p>
                                  <p className="mt-4">
                                  There comes a moment when lyrical skill transcends bravado—when wordplay stops being a sport and starts being scripture. Klense’s latest single, <strong>“Just Words,”</strong> lives squarely in that space.
                                  </p>
                                  <p className="mt-4">
                                  It’s dense. It’s surgical. It’s absurd, in the way only truth can be.
                                  </p>
                                  <p className="mt-4">
                                  Zoom past the punchlines, duck the cultural curveballs, and you’ll find something raw and radiant: an artist mid-transformation—unfolding, interrogating, becoming.
                                  </p>
                                  <p className="mt-4">
                                  From its very first breath, <strong>“Just Words”</strong> stakes its claim. This isn’t about proving penmanship. This is Klense pushing language to its breaking point. Every bar is a cipher. Every verse, a tightrope between satire and sincerity. He isn’t just constructing rhymes—he’s constructing mirrors. And sometimes, they crack.
                                  </p>
                                  <p className="mt-4">
                                  One moment, he’s clowning surface-level flows; the next, he’s peeling back the façade—probing into identity, censorship, and the quiet cost of being perceived. He doesn’t just rap about contradictions—he raps through them. With clarity. With courage. With style.
                                  </p>
                                  <p className="mt-4">
                                  Then there’s the hook:
                                  </p>
                                  <blockquote className="mt-4 italic pl-4 border-l-4 border-gray-300 dark:border-gray-700">
                                  “You gon’ wait your turn, baby!”
                                  </blockquote>
                                  <p className="mt-4">
                                  Catchy? Absolutely. But repetition gives it weight. It evolves. What begins as swagger becomes spell—a chant, a challenge, a crowning. It’s cheeky, sure. But beneath that smirk is a dare: Respect the craft, or be left behind.
                                  </p>
                                  <p className="mt-4">
                                  Lyrically, <strong>“Just Words”</strong> is an arsenal. Game of Thrones, sacred scripture, Lauryn Hill, dystopian newsrooms—it’s all here, stitched into bars that refuse to stay still. Wild imagery—talking pigs, folded editors, blue ticks and bloodlines—fires off like coded graffiti. Nothing is filler. Everything hits. Even the jokes leave bruises.
                                  </p>
                                  <p className="mt-4">
                                  But what truly makes this track breathe is its looseness. It doesn't strain to impress. It knows it's fire. Klense has spent years mastering the art of control—now, he’s showing us the beauty of letting go.
                                  </p>
                                  <p className="mt-4">
                                  This isn’t the sound of someone trying to be the best rapper alive. This is someone asking:
                                  </p>
                                  <blockquote className="mt-4 italic pl-4 border-l-4 border-gray-300 dark:border-gray-700">
                                  What happens when you stop performing and just start being?
                                  </blockquote>
                                  <p className="mt-4">
                                  Because with <strong>“Just Words,”</strong> Klense isn’t just writing lyrics—he’s writing legacy.
                                  </p>
                                  <p className="mt-4">
                                  And if this is just the warm-up? The game better stretch.
                                  </p>
                                  <p className="mt-4">

                                  </p>
                                  <strong>Just Words</strong> is a technical display of lyrical skill at every turn, tapping into the spirit of what made <strong>The Son Of Ink</strong> album so memorable as a start for Klense. The production is busy and intricate, complementing the dense wordplay and showcasing his growth as an artist while staying true to his roots.
                                </>
                              ) : (
                                <>
                                  <strong>{song.title}</strong> is a standout track that highlights Klense's evolution as both a producer and lyricist. The production creates a distinctive atmosphere that enhances the thematic elements, while the vocal performance demonstrates his versatility and technical skill. This track effectively balances nostalgia for his earlier work with his current artistic approach.
                                </>
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}