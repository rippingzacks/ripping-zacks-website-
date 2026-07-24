// ============================================================
// RIPPING ZACKS — Lorcana Chase Cards (lorcana.html)
// Static reference data (from a July 2026 TCGplayer-linked
// pricing snapshot). Market Price is editable directly on this
// page and saved in this browser's local storage only.
// ============================================================

// Hardcoded sealed-product inventory per set — updated by request only, not
// editable in-browser. All sets default to 0 unless stated otherwise below.
const LORCANA_SET_INVENTORY = {
  "the first chapter": { boosterBoxes: 0, cases: 1 },
  "rise of the floodborn": { boosterBoxes: 0, cases: 0 },
  "into the inklands": { boosterBoxes: 0, cases: 0 },
  "ursula's return": { boosterBoxes: 0, cases: 0 },
  "shimmering skies": { boosterBoxes: 0, cases: 0 },
  "azurite sea": { boosterBoxes: 0, cases: 0 },
  "archazia's island": { boosterBoxes: 0, cases: 0 },
  "reign of jafar": { boosterBoxes: 0, cases: 0 },
  "fabled": { boosterBoxes: 4, cases: 1 },
  "whispers in the well": { boosterBoxes: 0, cases: 1 },
  "winterspell": { boosterBoxes: 0, cases: 1 },
  "wilds unknown": { boosterBoxes: 0, cases: 1 },
  "attack of the vine!": { boosterBoxes: 0, cases: 1 },
};

const LORCANA_SET_PHOTOS = {
  "the first chapter": 'assets/lorcana-sets/the-first-chapter.webp',
  "rise of the floodborn": 'assets/lorcana-sets/rise-of-the-floodborn.webp',
  "into the inklands": 'assets/lorcana-sets/into-the-inklands.webp',
  "ursula's return": 'assets/lorcana-sets/ursula-s-return.webp',
  "shimmering skies": 'assets/lorcana-sets/shimmering-skies.webp',
  "azurite sea": 'assets/lorcana-sets/azurite-sea.webp',
  "archazia's island": 'assets/lorcana-sets/archazia-s-island.webp',
  "reign of jafar": 'assets/lorcana-sets/reign-of-jafar.webp',
  "fabled": 'assets/lorcana-sets/fabled.webp',
  "whispers in the well": 'assets/lorcana-sets/whispers-in-the-well.webp',
  "winterspell": 'assets/lorcana-sets/winterspell.webp',
  "wilds unknown": 'assets/lorcana-sets/wilds-unknown.webp',
  "attack of the vine!": 'assets/lorcana-sets/attack-of-the-vine.webp',
};

const LORCANA_PERMANENT_PHOTOS = {
  'all is found (song)': 'assets/lorcana/all-is-found-song.webp',
  'mickey mouse, inspirational warrior': 'assets/lorcana/mickey-mouse-inspirational-warrior.webp',
  'mirabel madrigal, musically talented': 'assets/lorcana/mirabel-madrigal-musically-talented.webp',
  'bolt, superdog': 'assets/lorcana/bolt-superdog.webp',
  'the glass slipper': 'assets/lorcana/the-glass-slipper.webp',
  'donald duck, flustered sorcerer': 'assets/lorcana/donald-duck-flustered-sorcerer.webp',
  'jafar, newly crowned': 'assets/lorcana/jafar-newly-crowned.webp',
  'show me more! (song)': 'assets/lorcana/show-me-more-song.webp',
  'tramp, enterprising dog': 'assets/lorcana/tramp-enterprising-dog.webp',
  'mad hatter, unruly eccentric': 'assets/lorcana/mad-hatter-unruly-eccentric.webp',
  'hiro hamada, armor designer': 'assets/lorcana/hiro-hamada-armor-designer.webp',
  'the return of hercules (song)': 'assets/lorcana/the-return-of-hercules-song.webp',
  'ratigan, nefarious criminal': 'assets/lorcana/ratigan-nefarious-criminal.webp',
  'belle, mechanic extraordinaire': 'assets/lorcana/belle-mechanic-extraordinaire.webp',
  "devil's eye diamond": 'assets/lorcana/devils-eye-diamond.webp',
  'tamatoa, happy as a clam': 'assets/lorcana/tamatoa-happy-as-a-clam.webp',
  'restoring atlantis (song)': 'assets/lorcana/restoring-atlantis-song.webp',
  'stitch, experiment 626': 'assets/lorcana/stitch-experiment-626.webp',
  'fantastical and magical (song)': 'assets/lorcana/fantastical-and-magical-song.webp',
  'wrong lever! (song)': 'assets/lorcana/wrong-lever-song.webp',
  'the sword of shan yu': 'assets/lorcana/the-sword-of-shan-yu.webp',
  'desperate plan (song)': 'assets/lorcana/desperate-plan-song.webp',
  "mother gothel, knows what's best": 'assets/lorcana/mother-gothel-knows-whats-best.webp',
  'mushu, your worst nightmare': 'assets/lorcana/mushu-your-worst-nightmare.webp',
  'kuzco, impulsive llama': 'assets/lorcana/kuzco-impulsive-llama.webp',
  'captain hook, the pirate king': 'assets/lorcana/captain-hook-the-pirate-king.webp',
  'wreck-it ralph, big lug': 'assets/lorcana/wreck-it-ralph-big-lug.webp',
  'lilo, causing an uproar': 'assets/lorcana/lilo-causing-an-uproar.webp',
  'perdita, determined mother': 'assets/lorcana/perdita-determined-mother.webp',
  'lady, decisive dog': 'assets/lorcana/lady-decisive-dog.webp',
  'jasmine, steady strategist': 'assets/lorcana/jasmine-steady-strategist.webp',
  'bambi, little prince': 'assets/lorcana/bambi-little-prince.webp',
  'rapunzel, high climber': 'assets/lorcana/rapunzel-high-climber.webp',
  'it means no worries (song)': 'assets/lorcana/it-means-no-worries-song.webp',
  'into the unknown (song)': 'assets/lorcana/into-the-unknown-song.webp',
  'winnie the pooh, hunny wizard': 'assets/lorcana/winnie-the-pooh-hunny-wizard.webp',
  'circle of life (song)': 'assets/lorcana/circle-of-life-song.webp',
  "powerline, world's greatest rock star": 'assets/lorcana/powerline-worlds-greatest-rock-star.webp',
  'lilo, best explorer ever': 'assets/lorcana/lilo-best-explorer-ever.webp',
  'scar, finally king': 'assets/lorcana/scar-finally-king.webp',
  'pongo, determined father': 'assets/lorcana/pongo-determined-father.webp',
  'mulan, considerate diplomat': 'assets/lorcana/mulan-considerate-diplomat.webp',
  'mickey mouse, steamboat pilot': 'assets/lorcana/mickey-mouse-steamboat-pilot.webp',
  'max goof, chart topper': 'assets/lorcana/max-goof-chart-topper.webp',
  'jasmine, fearless princess': 'assets/lorcana/jasmine-fearless-princess.webp',
  'i2i (song)': 'assets/lorcana/i2i-song.webp',
  'hades, infernal schemer': 'assets/lorcana/hades-infernal-schemer.webp',
  'genie, of the lamp': 'assets/lorcana/genie-of-the-lamp.webp',
  'dumbo, ninth wonder of the universe': 'assets/lorcana/dumbo-ninth-wonder-of-the-universe.webp',
  'cruella de vil, style icon': 'assets/lorcana/cruella-de-vil-style-icon.webp',
  'belle, accomplished mystic': 'assets/lorcana/belle-accomplished-mystic.webp',
  'beast, gracious prince': 'assets/lorcana/beast-gracious-prince.webp',
  'ariel, adventurous collector': 'assets/lorcana/ariel-adventurous-collector.webp',
  'spooky sight (song)': 'assets/lorcana/spooky-sight-song.webp',
  'demona, scourge of the wyvern clan': 'assets/lorcana/demona-scourge-of-the-wyvern-clan.webp',
  'simba, king in the making': 'assets/lorcana/simba-king-in-the-making.webp',
  'the black cauldron': 'assets/lorcana/the-black-cauldron.webp',
  'baloo, carefree bear': 'assets/lorcana/baloo-carefree-bear.webp',
  'the headless horseman, terror of sleepy hollow': 'assets/lorcana/the-headless-horseman-terror-of-sleepy-hollow.webp',
  'malicious, mean, and scary (song)': 'assets/lorcana/malicious-mean-and-scary-song.webp',
  'next stop, olympus (song)': 'assets/lorcana/next-stop-olympus-song.webp',
  'cinderella, dream come true': 'assets/lorcana/cinderella-dream-come-true.webp',
  'nick wilde, persistent investigator': 'assets/lorcana/nick-wilde-persistent-investigator.webp',
  'the sword of hercules': 'assets/lorcana/the-sword-of-hercules.webp',
  'goliath, clan leader': 'assets/lorcana/goliath-clan-leader.webp',
  "can't hold it back anymore (song)": 'assets/lorcana/cant-hold-it-back-anymore-song.webp',
  'lady tremaine, sinister socialite': 'assets/lorcana/lady-tremaine-sinister-socialite.webp',
  'judy hopps, lead detective': 'assets/lorcana/judy-hopps-lead-detective.webp',
  'the horned king, wicked ruler': 'assets/lorcana/the-horned-king-wicked-ruler.webp',
  'webby vanderquack, junior prospector': 'assets/lorcana/webby-vanderquack-junior-prospector.webp',
  'goofy, galumphing gumshoe': 'assets/lorcana/goofy-galumphing-gumshoe.webp',
  'elsa, ice artisan': 'assets/lorcana/elsa-ice-artisan.webp',
  'ohana means family (song)': 'assets/lorcana/ohana-means-family-song.webp',
  'eeyore, in the way': 'assets/lorcana/eeyore-in-the-way.webp',
  'freeze the vine (song)': 'assets/lorcana/freeze-the-vine-song.webp',
  'lilo, rock star': 'assets/lorcana/lilo-rock-star.webp',
  'raging storm (song)': 'assets/lorcana/raging-storm-song.webp',
  'anna, soothing sister': 'assets/lorcana/anna-soothing-sister.webp',
  'colors of the wind (song)': 'assets/lorcana/colors-of-the-wind-song.webp',
  'mulan, resourceful recruit': 'assets/lorcana/mulan-resourceful-recruit.webp',
  'tod, knows all the tricks': 'assets/lorcana/tod-knows-all-the-tricks.webp',
  'negaduck, public enemy number one': 'assets/lorcana/negaduck-public-enemy-number-one.webp',
  'the cold never bothered me (song)': 'assets/lorcana/the-cold-never-bothered-me-song.webp',
  'scrooge mcduck, reformed ebenezer': 'assets/lorcana/scrooge-mcduck-reformed-ebenezer.webp',
  'belle, snowfield strategist': 'assets/lorcana/belle-snowfield-strategist.webp',
  'tamatoa, seeker of shine': 'assets/lorcana/tamatoa-seeker-of-shine.webp',
  'angel, experiment 624': 'assets/lorcana/angel-experiment-624.webp',
  'darkwing duck, cool under pressure': 'assets/lorcana/darkwing-duck-cool-under-pressure.webp',
  "let's get dangerous (song)": 'assets/lorcana/lets-get-dangerous-song.webp',
  "you've got a friend in me (song)": 'assets/lorcana/youve-got-a-friend-in-me-song.webp',
  'what else can i do? (song)': 'assets/lorcana/what-else-can-i-do-song.webp',
  'isabela madrigal, caring cultivator': 'assets/lorcana/isabela-madrigal-caring-cultivator.webp',
  'frozone, super cool': 'assets/lorcana/frozone-super-cool.webp',
  'touch the sky (song)': 'assets/lorcana/touch-the-sky-song.webp',
  'jessie, lively cowgirl': 'assets/lorcana/jessie-lively-cowgirl.webp',
  'luisa madrigal, confident climber': 'assets/lorcana/luisa-madrigal-confident-climber.webp',
  'dunbroch family tapestry': 'assets/lorcana/dunbroch-family-tapestry.webp',
  'alien, true believer': 'assets/lorcana/alien-true-believer.webp',
  'milo thatch, getting his hands dirty': 'assets/lorcana/milo-thatch-getting-his-hands-dirty.webp',
  'the family scattered (song)': 'assets/lorcana/the-family-scattered-song.webp',
  'jack-jack parr, incredible potential': 'assets/lorcana/jack-jack-parr-incredible-potential.webp',
  'the leviathan, guardian of atlantis': 'assets/lorcana/the-leviathan-guardian-of-atlantis.webp',
  'mr. incredible, super strong': 'assets/lorcana/mr-incredible-super-strong.webp',
  'zipper, big helper': 'assets/lorcana/zipper-big-helper.webp',
  'kida, crystal scion': 'assets/lorcana/kida-crystal-scion.webp',
  'syndrome, out for revenge': 'assets/lorcana/syndrome-out-for-revenge.webp',
  'mrs. incredible, determined rescuer': 'assets/lorcana/mrs-incredible-determined-rescuer.webp',
  'mufasa, ruler of pride rock': 'assets/lorcana/mufasa-ruler-of-pride-rock.webp',
  "tigger, in the crow's nest": 'assets/lorcana/tigger-in-the-crows-nest.webp',
  'aurora, waking beauty': 'assets/lorcana/aurora-waking-beauty.webp',
  'stitch, carefree surfer': 'assets/lorcana/stitch-carefree-surfer.webp',
  'elsa, spirit of winter': 'assets/lorcana/elsa-spirit-of-winter.webp',
  'mickey mouse, wayward sorcerer': 'assets/lorcana/mickey-mouse-wayward-sorcerer.webp',
  'snow white, well wisher': 'assets/lorcana/snow-white-well-wisher.webp',
  'cinderella, ballroom sensation': 'assets/lorcana/cinderella-ballroom-sensation.webp',
  'alice, growing girl': 'assets/lorcana/alice-growing-girl.webp',
  'morph, space goo': 'assets/lorcana/morph-space-goo.webp',
  'ursula, deceiver of all': 'assets/lorcana/ursula-deceiver-of-all.webp',
  'robin hood, champion of sherwood': 'assets/lorcana/robin-hood-champion-of-sherwood.webp',
  'diablo, devoted herald': 'assets/lorcana/diablo-devoted-herald.webp',
  'ariel, sonic warrior': 'assets/lorcana/ariel-sonic-warrior.webp',
  'the wall, border fortress': 'assets/lorcana/the-wall-border-fortress.webp',
  'minnie mouse, musketeer champion': 'assets/lorcana/minnie-mouse-musketeer-champion.webp',
  'yen sid, powerful sorcerer': 'assets/lorcana/yen-sid-powerful-sorcerer.webp',
  'the queen, diviner': 'assets/lorcana/the-queen-diviner.webp',
  "we don't talk about bruno (song)": 'assets/lorcana/we-dont-talk-about-bruno-song.webp',
  'goofy, super goof': 'assets/lorcana/goofy-super-goof.webp',
  'cinderella, melody weaver': 'assets/lorcana/cinderella-melody-weaver.webp',
  'anna, true-hearted': 'assets/lorcana/anna-true-hearted.webp',
  'look at this family (song)': 'assets/lorcana/look-at-this-family-song.webp',
  "ariel's grotto, a secret place": 'assets/lorcana/ariels-grotto-a-secret-place.webp',
  'piglet, sturdy swordsman': 'assets/lorcana/piglet-sturdy-swordsman.webp',
  'snuggly duckling, disreputable pub': 'assets/lorcana/snuggly-duckling-disreputable-pub.webp',
  'sisu, empowered sibling': 'assets/lorcana/sisu-empowered-sibling.webp',
  'ursula, sea witch queen': 'assets/lorcana/ursula-sea-witch-queen.webp',
  'second star to the right (song)': 'assets/lorcana/second-star-to-the-right-song.webp',
  'jasmine, desert warrior': 'assets/lorcana/jasmine-desert-warrior.webp',
  "you're welcome (song)": 'assets/lorcana/you-re-welcome-song.webp',
  'clarabelle, light on her hooves': 'assets/lorcana/clarabelle-light-on-her-hooves.webp',
  'you came back (song)': 'assets/lorcana/you-came-back-song.webp',
  'tiana, restaurant owner': 'assets/lorcana/tiana-restaurant-owner.webp',
  'wreck-it ralph, ham hands': 'assets/lorcana/wreck-it-ralph-ham-hands.webp',
  'basil, disguised detective': 'assets/lorcana/basil-disguised-detective.webp',
  'baymax, personal healthcare companion': 'assets/lorcana/baymax-personal-healthcare-companion.webp',
  'the islands i pulled from the sea (song)': 'assets/lorcana/the-islands-i-pulled-from-the-sea-song.webp',
  'sugar rush speedway, finish line': 'assets/lorcana/sugar-rush-speedway-finish-line.webp',
  'we could be immortals (song)': 'assets/lorcana/we-could-be-immortals-song.webp',
  'yzma, conniving chemist': 'assets/lorcana/yzma-conniving-chemist.webp',
  'captain amelia, commander of the legacy': 'assets/lorcana/captain-amelia-commander-of-the-legacy.webp',
  "chip 'n' dale, recovery rangers": 'assets/lorcana/chip-n-dale-recovery-rangers.webp',
  'rafiki, ethereal guide': 'assets/lorcana/rafiki-ethereal-guide.webp',
  "maleficent's staff": 'assets/lorcana/maleficents-staff.webp',
  'raya, kumandran rider': 'assets/lorcana/raya-kumandran-rider.webp',
  'gadget hackwrench, brilliant bosun': 'assets/lorcana/gadget-hackwrench-brilliant-bosun.webp',
  'daisy duck, pirate captain': 'assets/lorcana/daisy-duck-pirate-captain.webp',
  'treasure mountain, azurite sea island': 'assets/lorcana/treasure-mountain-azurite-sea-island.webp',
  'lilo & stitch, fun-loving friends': 'assets/lorcana/lilo-stitch-fun-loving-friends.webp',
  'belle & beast, certain as the sun': 'assets/lorcana/belle-beast-certain-as-the-sun.webp',
  'mike wazowski, heroic climber': 'assets/lorcana/mike-wazowski-heroic-climber.webp',
  'pocahontas & meeko, adventurous friends': 'assets/lorcana/pocahontas-meeko-adventurous-friends.webp',
  'woody & buzz lightyear, best buddies': 'assets/lorcana/woody-buzz-lightyear-best-buddies.webp',
  'sulley & boo, scare buddies': 'assets/lorcana/sulley-boo-scare-buddies.webp',
  'the madrigal family, every generation': 'assets/lorcana/the-madrigal-family-every-generation.webp',
  'merida, wisp conjurer': 'assets/lorcana/merida-wisp-conjurer.webp',
  'aladdin & genie, mischievous pals': 'assets/lorcana/aladdin-genie-mischievous-pals.webp',
  'peter pan & tinker bell, fast friends': 'assets/lorcana/peter-pan-tinker-bell-fast-friends.webp',
  'winnie the pooh & piglet, hunny mages': 'assets/lorcana/winnie-the-pooh-piglet-hunny-mages.webp',
  'maleficent & diablo, evil incarnate': 'assets/lorcana/maleficent-diablo-evil-incarnate.webp',
  'tod & copper, best of friends': 'assets/lorcana/tod-copper-best-of-friends.webp',
  'carl fredricksen & russell, intrepid explorers': 'assets/lorcana/carl-fredricksen-russell-intrepid-explorers.webp',
  'mickey mouse & minnie mouse, adventuring duo': 'assets/lorcana/mickey-mouse-minnie-mouse-adventuring-duo.webp',
  'rapunzel & flynn rider, unlikely pair': 'assets/lorcana/rapunzel-flynn-rider-unlikely-pair.webp',
  'meilin lee, popular red panda': 'assets/lorcana/meilin-lee-popular-red-panda.webp',
  'dash parr & violet parr, super siblings': 'assets/lorcana/dash-parr-violet-parr-super-siblings.webp',
  "darkwing duck & launchpad, st. canard's finest": 'assets/lorcana/darkwing-duck-launchpad-st-canards-finest.webp',
  'scar, created by the vine': 'assets/lorcana/scar-created-by-the-vine.webp',
  'pocahontas, peacekeeper': 'assets/lorcana/pocahontas-peacekeeper.webp',
  'merida, formidable archer': 'assets/lorcana/merida-formidable-archer.webp',
  'moana, curious explorer': 'assets/lorcana/moana-curious-explorer.webp',
  'hades, looking for a deal': 'assets/lorcana/hades-looking-for-a-deal.webp',
  'mickey mouse, brave little prince': 'assets/lorcana/mickey-mouse-brave-little-prince.webp',
  'buzz lightyear, jungle ranger': 'assets/lorcana/buzz-lightyear-jungle-ranger.webp',
  'minnie mouse, sweetheart princess': 'assets/lorcana/minnie-mouse-sweetheart-princess.webp',
  'ariel, ethereal voice': 'assets/lorcana/ariel-ethereal-voice.webp',
  'simba, returned king': 'assets/lorcana/simba-returned-king.webp',
  'belle, strange but special': 'assets/lorcana/belle-strange-but-special.webp',
  'aurora, dreaming guardian': 'assets/lorcana/aurora-dreaming-guardian.webp',
  'tinker bell, giant fairy': 'assets/lorcana/tinker-bell-giant-fairy.webp',
  'mickey mouse, artful rogue': 'assets/lorcana/mickey-mouse-artful-rogue.webp',
  'genie, on the job': 'assets/lorcana/genie-on-the-job.webp',
  'aladdin, heroic outlaw': 'assets/lorcana/aladdin-heroic-outlaw.webp',
  'maui, hero to all': 'assets/lorcana/maui-hero-to-all.webp',
  'hades, king of olympus': 'assets/lorcana/hades-king-of-olympus.webp',
  'beast, relentless': 'assets/lorcana/beast-relentless.webp',
  'hercules, divine hero': 'assets/lorcana/hercules-divine-hero.webp',
  'shere khan, menacing predator': 'assets/lorcana/shere-khan-menacing-predator.webp',
  "arthur, wizard's apprentice": 'assets/lorcana/arthur-wizards-apprentice.webp',
  'lady tremaine, imperious queen': 'assets/lorcana/lady-tremaine-imperious-queen.webp',
  'sisu, divine water dragon': 'assets/lorcana/sisu-divine-water-dragon.webp',
  'madam mim, purple dragon': 'assets/lorcana/madam-mim-purple-dragon.webp',
  'namaari, morning mist': 'assets/lorcana/namaari-morning-mist.webp',
  'pete, bad guy': 'assets/lorcana/pete-bad-guy.webp',
  'finders keepers (song)': 'assets/lorcana/finders-keepers-song.webp',
  'prince naveen, ukulele player': 'assets/lorcana/prince-naveen-ukulele-player.webp',
  'king candy, sweet abomination': 'assets/lorcana/king-candy-sweet-abomination.webp',
  'revive (song)': 'assets/lorcana/revive-song.webp',
  'bad-anon, villain support center': 'assets/lorcana/bad-anon-villain-support-center.webp',
  "ratigan's party, seedy back room": 'assets/lorcana/ratigans-party-seedy-back-room.webp',
  'snow white, fair-hearted': 'assets/lorcana/snow-white-fair-hearted.webp',
  'olaf, happy passenger': 'assets/lorcana/olaf-happy-passenger.webp',
  'scar, vengeful lion': 'assets/lorcana/scar-vengeful-lion.webp',
  'donald duck, pie slinger': 'assets/lorcana/donald-duck-pie-slinger.webp',
  'robin hood, sharpshooter': 'assets/lorcana/robin-hood-sharpshooter.webp',
  'vanellope von schweetz, sugar rush princess': 'assets/lorcana/vanellope-von-schweetz-sugar-rush-princess.webp',
  'arthur, king victorious': 'assets/lorcana/arthur-king-victorious.webp',
  'archimedes, electrified owl': 'assets/lorcana/archimedes-electrified-owl.webp',
  'royal tantrum (song)': 'assets/lorcana/royal-tantrum-song.webp',
  "peter pan, pirate's bane": 'assets/lorcana/peter-pan-pirates-bane.webp',
  'gramma tala, spirit of the ocean': 'assets/lorcana/gramma-tala-spirit-of-the-ocean.webp',
  'mickey mouse, trumpeter': 'assets/lorcana/mickey-mouse-trumpeter.webp',
  'scrooge mcduck, richest duck in the world': 'assets/lorcana/scrooge-mcduck-richest-duck-in-the-world.webp',
  'and then along came zeus (song)': 'assets/lorcana/and-then-along-came-zeus-song.webp',
  "the sorcerer's hat": 'assets/lorcana/the-sorcerers-hat.webp',
  'maleficent, mistress of all evil': 'assets/lorcana/maleficent-mistress-of-all-evil.webp',
  'chernabog, evildoer': 'assets/lorcana/chernabog-evildoer.webp',
  'jafar, striking illusionist': 'assets/lorcana/jafar-striking-illusionist.webp',
  'kida, protector of atlantis': 'assets/lorcana/kida-protector-of-atlantis.webp',
  'captain hook, master swordsman': 'assets/lorcana/captain-hook-master-swordsman.webp',
  'pride lands, pride rock': 'assets/lorcana/pride-lands-pride-rock.webp',
  'rls legacy, solar galleon': 'assets/lorcana/rls-legacy-solar-galleon.webp',
  "belle's house, maurice's workshop": 'assets/lorcana/belles-house-maurices-workshop.webp',
  "kuzco's palace, home of the emperor": 'assets/lorcana/kuzcos-palace-home-of-the-emperor.webp',
};

// Snapshot data — card name, set, rarity, market price at time of snapshot
const LORCANA_ITEMS = [
  { name: 'Elsa, Spirit of Winter', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mickey Mouse, Wayward Sorcerer', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Stitch, Carefree Surfer', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Simba, Returned King', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Belle, Strange but Special', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Aurora, Dreaming Guardian', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Tinker Bell, Giant Fairy', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mickey Mouse, Artful Rogue', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Genie, On the Job', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Aladdin, Heroic Outlaw', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Maui, Hero to All', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Hades, King of Olympus', set: 'The First Chapter', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Cinderella, Ballroom Sensation', set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Alice, Growing Girl', set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Snow White, Well Wisher', set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Beast, Relentless', set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Hercules, Divine Hero', set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Shere Khan, Menacing Predator', set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: "Arthur, Wizard's Apprentice", set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Lady Tremaine, Imperious Queen', set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Sisu, Divine Water Dragon', set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Madam Mim, Purple Dragon', set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Namaari, Morning Mist', set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Pete, Bad Guy', set: 'Rise of the Floodborn', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Morph, Space Goo', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Ursula, Deceiver of All', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Robin Hood, Champion of Sherwood', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: "Peter Pan, Pirate's Bane", set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Gramma Tala, Spirit of the Ocean', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Pride Lands, Pride Rock', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'RLS Legacy, Solar Galleon', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: "Belle's House, Maurice's Workshop", set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: "Kuzco's Palace, Home of the Emperor", set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mickey Mouse, Trumpeter', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Scrooge McDuck, Richest Duck in the World', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'And Then Along Came Zeus (song)', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: "The Sorcerer's Hat", set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Maleficent, Mistress of All Evil', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Chernabog, Evildoer', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Jafar, Striking Illusionist', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Kida, Protector of Atlantis', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Captain Hook, Master Swordsman', set: 'Into the Inklands', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Ariel, Sonic Warrior', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Diablo, Devoted Herald', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'The Wall, Border Fortress', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Minnie Mouse, Musketeer Champion', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Yen Sid, Powerful Sorcerer', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'The Queen, Diviner', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: "We Don't Talk About Bruno (song)", set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Goofy, Super Goof', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Cinderella, Melody Weaver', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Anna, True-Hearted', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Look at This Family (song)', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: "Ariel's Grotto, A Secret Place", set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Piglet, Sturdy Swordsman', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Snuggly Duckling, Disreputable Pub', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Sisu, Empowered Sibling', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Ursula, Sea Witch Queen', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Second Star to the Right (song)', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Jasmine, Desert Warrior', set: "Ursula's Return", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mufasa, Ruler of Pride Rock', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Clarabelle, Light on Her Hooves', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: "You're Welcome (song)", set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Finders Keepers (song)', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Prince Naveen, Ukulele Player', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'King Candy, Sweet Abomination', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Revive (song)', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Bad-Anon, Villain Support Center', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: "Ratigan's Party, Seedy Back Room", set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Snow White, Fair-Hearted', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Olaf, Happy Passenger', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Scar, Vengeful Lion', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Donald Duck, Pie Slinger', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Robin Hood, Sharpshooter', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Vanellope von Schweetz, Sugar Rush Princess', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Arthur, King Victorious', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Archimedes, Electrified Owl', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Royal Tantrum (song)', set: 'Shimmering Skies', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'You Came Back (song)', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Tiana, Restaurant Owner', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: "Tigger, In the Crow's Nest", set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Wreck-It Ralph, Ham Hands', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Basil, Disguised Detective', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Baymax, Personal Healthcare Companion', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'The Islands I Pulled From The Sea (song)', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Sugar Rush Speedway, Finish Line', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'We Could Be Immortals (song)', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Yzma, Conniving Chemist', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Captain Amelia, Commander of the Legacy', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: "Chip 'n' Dale, Recovery Rangers", set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Rafiki, Ethereal Guide', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: "Maleficent's Staff", set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Raya, Kumandran Rider', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Gadget Hackwrench, Brilliant Bosun', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Daisy Duck, Pirate Captain', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Treasure Mountain, Azurite Sea Island', set: 'Azurite Sea', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'All Is Found (song)', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Aurora, Waking Beauty', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mickey Mouse, Inspirational Warrior', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mirabel Madrigal, Musically Talented', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Bolt, Superdog', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'The Glass Slipper', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Donald Duck, Flustered Sorcerer', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Jafar, Newly Crowned', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Show Me More! (song)', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Tramp, Enterprising Dog', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mad Hatter, Unruly Eccentric', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Hiro Hamada, Armor Designer', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'The Return of Hercules (song)', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Ratigan, Nefarious Criminal', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Belle, Mechanic Extraordinaire', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: "Devil's Eye Diamond", set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Tamatoa, Happy as a Clam', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Restoring Atlantis (song)', set: "Archazia's Island", rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Stitch, Experiment 626', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Fantastical and Magical (song)', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Wrong Lever! (song)', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'The Sword of Shan Yu', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Desperate Plan (song)', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: "Mother Gothel, Knows What's Best", set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mushu, Your Worst Nightmare', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Kuzco, Impulsive Llama', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Captain Hook, The Pirate King', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Wreck-It Ralph, Big Lug', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Lilo, Causing an Uproar', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Perdita, Determined Mother', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Lady, Decisive Dog', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Jasmine, Steady Strategist', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Bambi, Little Prince', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Rapunzel, High Climber', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'It Means No Worries (song)', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Into the Unknown (song)', set: 'Reign of Jafar', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mickey Mouse, Brave Little Prince', set: 'Fabled', rarity: 'Iconic', price: 13200, owned: true, grade: 'PSA 10.0 GEM - MT' },
  { name: 'Minnie Mouse, Sweetheart Princess', set: 'Fabled', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Winnie the Pooh, Hunny Wizard', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Circle of Life (song)', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: "Powerline, World's Greatest Rock Star", set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Lilo, Best Explorer Ever', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Scar, Finally King', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Pongo, Determined Father', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mulan, Considerate Diplomat', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mickey Mouse, Steamboat Pilot', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Max Goof, Chart Topper', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Jasmine, Fearless Princess', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'I2I (song)', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Hades, Infernal Schemer', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Genie, Of the Lamp', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Dumbo, Ninth Wonder of the Universe', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Cruella De Vil, Style Icon', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Belle, Accomplished Mystic', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Beast, Gracious Prince', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Ariel, Adventurous Collector', set: 'Fabled', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Ariel, Ethereal Voice', set: 'Whispers in the Well', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Hades, Looking for a Deal', set: 'Whispers in the Well', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Spooky Sight (song)', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Demona, Scourge of the Wyvern Clan', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Simba, King in the Making', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'The Black Cauldron', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Baloo, Carefree Bear', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'The Headless Horseman, Terror of Sleepy Hollow', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Malicious, Mean, and Scary (song)', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Next Stop, Olympus (song)', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Cinderella, Dream Come True', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Nick Wilde, Persistent Investigator', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'The Sword of Hercules', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Goliath, Clan Leader', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: "Can't Hold It Back Anymore (song)", set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Lady Tremaine, Sinister Socialite', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Judy Hopps, Lead Detective', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'The Horned King, Wicked Ruler', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Webby Vanderquack, Junior Prospector', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Goofy, Galumphing Gumshoe', set: 'Whispers in the Well', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Moana, Curious Explorer', set: 'Winterspell', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Pocahontas, Peacekeeper', set: 'Winterspell', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Elsa, Ice Artisan', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Ohana Means Family (song)', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Eeyore, In the Way', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Freeze the Vine (song)', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Lilo, Rock Star', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Raging Storm (song)', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Anna, Soothing Sister', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Colors of the Wind (song)', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mulan, Resourceful Recruit', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Tod, Knows All the Tricks', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Negaduck, Public Enemy Number One', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'The Cold Never Bothered Me (song)', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Scrooge McDuck, Reformed Ebenezer', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Belle, Snowfield Strategist', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Tamatoa, Seeker of Shine', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Angel, Experiment 624', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Darkwing Duck, Cool Under Pressure', set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: "Let's Get Dangerous (song)", set: 'Winterspell', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Buzz Lightyear, Jungle Ranger', set: 'Wilds Unknown', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Merida, Formidable Archer', set: 'Wilds Unknown', rarity: 'Iconic', price: 0, owned: false },
  { name: "You've Got a Friend in Me (song)", set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'What Else Can I Do? (song)', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Isabela Madrigal, Caring Cultivator', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Frozone, Super Cool', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Touch the Sky (song)', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Jessie, Lively Cowgirl', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Luisa Madrigal, Confident Climber', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'DunBroch Family Tapestry', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Alien, True Believer', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Milo Thatch, Getting His Hands Dirty', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'The Family Scattered (song)', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Jack-Jack Parr, Incredible Potential', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'The Leviathan, Guardian of Atlantis', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mr. Incredible, Super Strong', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Zipper, Big Helper', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Kida, Crystal Scion', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Syndrome, Out for Revenge', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mrs. Incredible, Determined Rescuer', set: 'Wilds Unknown', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Lilo & Stitch, Fun-Loving Friends', set: 'Attack of the Vine!', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Belle & Beast, Certain as the Sun', set: 'Attack of the Vine!', rarity: 'Iconic', price: 0, owned: false },
  { name: 'Mike Wazowski, Heroic Climber', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Pocahontas & Meeko, Adventurous Friends', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Woody & Buzz Lightyear, Best Buddies', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Sulley & Boo, Scare Buddies', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'The Madrigal Family, Every Generation', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Merida, Wisp Conjurer', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Aladdin & Genie, Mischievous Pals', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Peter Pan & Tinker Bell, Fast Friends', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Winnie the Pooh & Piglet, Hunny Mages', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Maleficent & Diablo, Evil Incarnate', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Tod & Copper, Best of Friends', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Carl Fredricksen & Russell, Intrepid Explorers', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Mickey Mouse & Minnie Mouse, Adventuring Duo', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Rapunzel & Flynn Rider, Unlikely Pair', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Meilin Lee, Popular Red Panda', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Dash Parr & Violet Parr, Super Siblings', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: "Darkwing Duck & Launchpad, St. Canard's Finest", set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
  { name: 'Scar, Created by the Vine', set: 'Attack of the Vine!', rarity: 'Enchanted', price: 0, owned: false },
];

let lorcanaSearchTerm = '';

function lorcanaKeyFor(name) {
  return (name || '').trim().toLowerCase();
}

function buildLorcanaCard(item) {
  const key = lorcanaKeyFor(item.name);
  const isOwned = !!item.owned;
  const photoSrc = LORCANA_PERMANENT_PHOTOS[key];

  const card = document.createElement('article');
  card.className = 'card-slab';
  if (isOwned) card.classList.add('in-stock');

  if (photoSrc) {
    const art = document.createElement('div');
    art.className = 'card-art';
    const img = document.createElement('img');
    img.src = photoSrc;
    img.alt = item.name || '';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
    art.appendChild(img);
    card.appendChild(art);
  }

  const label = document.createElement('div');
  label.className = 'card-slab-label';
  label.style.cssText = 'display:flex; justify-content:space-between; align-items:center;';
  const raritySpan = document.createElement('span');
  raritySpan.textContent = item.rarity || '';
  raritySpan.style.cssText = item.rarity === 'Iconic'
    ? 'color:var(--cobalt); font-weight:700;'
    : 'color:var(--citrus); font-weight:700;';
  label.appendChild(raritySpan);

  const statusBadge = document.createElement('span');
  statusBadge.textContent = isOwned ? 'Own' : 'Still looking';
  statusBadge.style.cssText = `font-family:var(--mono); font-weight:700; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.04em; color:${isOwned ? 'var(--mint)' : 'var(--citrus)'};`;
  label.appendChild(statusBadge);

  card.appendChild(label);

  const body = document.createElement('div');
  body.className = 'card-body';

  const h3 = document.createElement('h3');
  h3.textContent = item.name || 'Untitled';
  body.appendChild(h3);

  const setLine = document.createElement('p');
  setLine.textContent = item.set || '';
  setLine.style.cssText = 'font-family:var(--mono); font-size:0.78rem; color:var(--ink-faint); margin-bottom:14px;';
  body.appendChild(setLine);

  const priceRow = document.createElement('div');
  priceRow.className = 'card-footer';
  const priceDisplay = document.createElement('div');
  priceDisplay.className = 'card-price';
  const priceNum = parseFloat(item.price) || 0;
  priceDisplay.textContent = '$' + priceNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  priceDisplay.style.cssText = 'background:var(--paper); border:1px solid var(--line); border-radius:6px; padding:6px 10px; width:100%; font-family:var(--mono); color:var(--ink); text-align:center; font-weight:700;';
  priceRow.appendChild(priceDisplay);
  body.appendChild(priceRow);

  card.appendChild(body);
  return card;
}

function buildLorcanaSetBanner(setName) {
  const key = setName.trim().toLowerCase();
  const photoSrc = LORCANA_SET_PHOTOS[key];
  const inventory = LORCANA_SET_INVENTORY[key] || { boosterBoxes: 0, cases: 0 };
  const hasStock = inventory.boosterBoxes > 0 || inventory.cases > 0;

  const banner = document.createElement('div');
  banner.className = 'lorcana-set-banner';
  banner.style.cssText = 'grid-column: 1 / -1; display:flex; align-items:center; flex-wrap:wrap; gap:16px; margin:28px 0 6px; padding:14px 16px; border-radius:14px; border:2px solid transparent;';
  if (hasStock) {
    banner.style.borderColor = 'var(--mint)';
    banner.style.background = 'rgba(76,175,88,0.08)';
  }

  if (photoSrc) {
    const img = document.createElement('img');
    img.src = photoSrc;
    img.alt = setName;
    img.style.cssText = 'width:64px; height:64px; object-fit:contain; border-radius:8px;';
    banner.appendChild(img);
  }

  const h2 = document.createElement('h2');
  h2.textContent = setName;
  h2.style.cssText = 'font-family:var(--display); font-size:1.3rem; margin:0; margin-right:auto;';
  banner.appendChild(h2);

  function buildQtyDisplay(labelText, qty) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; align-items:center; gap:6px;';

    const lbl = document.createElement('span');
    lbl.textContent = labelText;
    lbl.style.cssText = 'font-family:var(--mono); font-size:0.72rem; color:var(--ink-faint); text-transform:uppercase; letter-spacing:0.04em;';
    wrap.appendChild(lbl);

    const value = document.createElement('span');
    value.textContent = String(qty);
    value.style.cssText = `font-family:var(--mono); font-weight:700; font-size:0.9rem; color:${qty > 0 ? 'var(--mint)' : 'var(--ink-faint)'};`;
    wrap.appendChild(value);

    return wrap;
  }

  banner.appendChild(buildQtyDisplay('Booster Boxes:', inventory.boosterBoxes));
  banner.appendChild(buildQtyDisplay('Cases:', inventory.cases));

  return banner;
}

function renderLorcanaGrid() {
  const grid = document.getElementById('lorcana-grid');
  const count = document.getElementById('lorcana-count');
  if (!grid || !count) return;

  const term = lorcanaSearchTerm.trim().toLowerCase();
  const visible = term
    ? LORCANA_ITEMS.filter(i =>
        (i.name || '').toLowerCase().includes(term) ||
        (i.set || '').toLowerCase().includes(term))
    : LORCANA_ITEMS;

  count.textContent = visible.length + (visible.length === 1 ? ' card' : ' cards');
  grid.innerHTML = '';

  if (!visible.length && term) {
    const empty = document.createElement('p');
    empty.style.color = 'var(--ink-faint)';
    empty.textContent = 'No cards match your search.';
    grid.appendChild(empty);
    return;
  }

  let lastSet = null;
  visible.forEach(item => {
    if (item.set !== lastSet) {
      grid.appendChild(buildLorcanaSetBanner(item.set));
      lastSet = item.set;
    }
    grid.appendChild(buildLorcanaCard(item));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderLorcanaGrid();

  const search = document.getElementById('lorcana-search');
  if (search) {
    search.addEventListener('input', () => {
      lorcanaSearchTerm = search.value;
      renderLorcanaGrid();
    });
  }
});
