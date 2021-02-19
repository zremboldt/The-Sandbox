const birds = [
  {
    "id": 0,
    "name": "Magpie",
    "biome": "Gardens & meadows",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/magpie.jpg"
  },
  {
    "id": 1,
    "name": "Chaffinch",
    "biome": "Gardens & meadows",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/chaffinch.jpg"
  },
  {
    "id": 2,
    "name": "Wood Pigeon",
    "biome": "Gardens & meadows",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/wood-pigeon.jpg"
  },
  {
    "id": 3,
    "name": "Yellowhammer",
    "biome": "Gardens & meadows",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/yellowhammer.jpg"
  },
  {
    "id": 4,
    "name": "Bullfinch",
    "biome": "Gardens & meadows",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/bullfinch.jpg"
  },
  {
    "id": 5,
    "name": "Wren",
    "biome": "Gardens & meadows",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/wren.jpg"
  },
  {
    "id": 6,
    "name": "Sparrow",
    "biome": "Gardens & meadows",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/sparrow.jpg"
  },
  {
    "id": 7,
    "name": "Bluetit",
    "biome": "Gardens & meadows",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/bluetit.jpg"
  },
  {
    "id": 8,
    "name": "Long-Tailed Tit",
    "biome": "Gardens & meadows",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/long-tailed-tit.jpg"
  },
  {
    "id": 9,
    "name": "Whitethroat",
    "biome": "Gardens & meadows",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/whitethroat.jpg"
  },
  {
    "id": 10,
    "name": "European Greenfinch",
    "biome": "Gardens & meadows",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/european-greenfinch.jpg"
  },
  {
    "id": 11,
    "name": "European Robin",
    "biome": "Gardens & meadows",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/european-robin.jpg"
  },
  {
    "id": 12,
    "name": "Junco",
    "biome": "Gardens & meadows",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/junco.jpg"
  },
  {
    "id": 13,
    "name": "Starling",
    "biome": "Gardens & meadows",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/starling.jpg"
  },
  {
    "id": 14,
    "name": "Collared Dove",
    "biome": "Gardens & meadows",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/collared-dove.jpg"
  },
  {
    "id": 15,
    "name": "Blackbird",
    "biome": "Gardens & meadows",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/blackbird.jpg"
  },
  {
    "id": 16,
    "name": "Eurasian Wigeon",
    "biome": "Rivers & lakes",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/eurasian-wigeon.jpg"
  },
  {
    "id": 17,
    "name": "Mandarin Duck",
    "biome": "Rivers & lakes",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/mandarin-duck.jpg"
  },
  {
    "id": 18,
    "name": "Moorhen",
    "biome": "Rivers & lakes",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/moorhen.jpg"
  },
  {
    "id": 19,
    "name": "Bittern",
    "biome": "Rivers & lakes",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/bittern.jpg"
  },
  {
    "id": 20,
    "name": "Flamingo",
    "biome": "Rivers & lakes",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/flamingo.jpg"
  },
  {
    "id": 21,
    "name": "Malachite Kingfisher",
    "biome": "Rivers & lakes",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/malachite-kingfisher.jpg"
  },
  {
    "id": 22,
    "name": "Pintail",
    "biome": "Rivers & lakes",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/pintail.jpg"
  },
  {
    "id": 23,
    "name": "Painted Stork",
    "biome": "Rivers & lakes",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/painted-stork.jpg"
  },
  {
    "id": 24,
    "name": "Mallard Duck",
    "biome": "Rivers & lakes",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/mallard-duck.jpg"
  },
  {
    "id": 25,
    "name": "Eurasian Kingfisher",
    "biome": "Rivers & lakes",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/eurasian-kingfisher.jpg"
  },
  {
    "id": 26,
    "name": "Mute Swan",
    "biome": "Rivers & lakes",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/mute-swan.jpg"
  },
  {
    "id": 27,
    "name": "Heron",
    "biome": "Rivers & lakes",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/heron.jpg"
  },
  {
    "id": 28,
    "name": "Tufted Duck",
    "biome": "Rivers & lakes",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/tufted-duck.jpg"
  },
  {
    "id": 29,
    "name": "Grebe",
    "biome": "Rivers & lakes",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/grebe.jpg"
  },
  {
    "id": 30,
    "name": "Crested Auklet",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/crested-auklet.jpg"
  },
  {
    "id": 31,
    "name": "Ring-Billed Gull",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/ring-billed-gull.jpg"
  },
  {
    "id": 32,
    "name": "Rhinoceros Auklet",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/rhinoceros-auklet.jpg"
  },
  {
    "id": 33,
    "name": "Pigeon Guillemot",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/pigeon-guillemot.jpg"
  },
  {
    "id": 34,
    "name": "Cormorant",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/cormorant.jpg"
  },
  {
    "id": 35,
    "name": "Oystercatcher",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/oystercatcher.jpg"
  },
  {
    "id": 36,
    "name": "Red-Throated Diver",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/red-throated-diver.jpg"
  },
  {
    "id": 37,
    "name": "Tufted Puffin",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/tufted-puffin.jpg"
  },
  {
    "id": 38,
    "name": "Common Tern",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/common-tern.jpg"
  },
  {
    "id": 39,
    "name": "Loon",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/loon.jpg"
  },
  {
    "id": 40,
    "name": "Blue-Footed Booby",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/blue-footed-booby.jpg"
  },
  {
    "id": 41,
    "name": "Pelican",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/pelican.jpg"
  },
  {
    "id": 42,
    "name": "European Herring Gull",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/european-herring-gull.jpg"
  },
  {
    "id": 43,
    "name": "Horned Puffin",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/horned-puffin.jpg"
  },
  {
    "id": 44,
    "name": "Thick Billed Murre",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/thick-billed-murre.jpg"
  },
  {
    "id": 45,
    "name": "Razorbill",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/razorbill.jpg"
  },
  {
    "id": 46,
    "name": "Cassins Auklet",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/cassins-auklet.jpg"
  },
  {
    "id": 47,
    "name": "Black Guillemot",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/black-guillemot.jpg"
  },
  {
    "id": 48,
    "name": "Shelduck",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/shelduck.jpg"
  },
  {
    "id": 49,
    "name": "Least Auklet",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/least-auklet.jpg"
  },
  {
    "id": 50,
    "name": "Great Black-Backed Gull",
    "biome": "Sea birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/great-black-backed-gull.jpg"
  },
  {
    "id": 51,
    "name": "Gannet",
    "biome": "Sea birds",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/gannet.jpg"
  },
  {
    "id": 52,
    "name": "Broad-Billed Hummingbird",
    "biome": "Desert birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/broad-billed-hummingbird.jpg"
  },
  {
    "id": 53,
    "name": "Gilded Flicker",
    "biome": "Desert birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/gilded-flicker.jpg"
  },
  {
    "id": 54,
    "name": "Elf Owl",
    "biome": "Desert birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/elf-owl.jpg"
  },
  {
    "id": 55,
    "name": "Cactus Pygmy Owl",
    "biome": "Desert birds",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/cactus-pygmy-owl.jpg"
  },
  {
    "id": 56,
    "name": "Roadrunner",
    "biome": "Desert birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/roadrunner.jpg"
  },
  {
    "id": 57,
    "name": "Gambel's Quail",
    "biome": "Desert birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/gambels-quail.jpg"
  },
  {
    "id": 58,
    "name": "Noisy Miner",
    "biome": "Australian birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/noisy-miner.jpg"
  },
  {
    "id": 59,
    "name": "Kookaburra",
    "biome": "Australian birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/kookaburra.jpg"
  },
  {
    "id": 60,
    "name": "Emu",
    "biome": "Australian birds",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/emu.jpg"
  },
  {
    "id": 61,
    "name": "Fruit Dove",
    "biome": "Australian birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/fruit-dove.jpg"
  },
  {
    "id": 62,
    "name": "Magpie Goose",
    "biome": "Australian birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/magpie-goose.jpg"
  },
  {
    "id": 63,
    "name": "Galah",
    "biome": "Australian birds",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/galah.jpg"
  },
  {
    "id": 64,
    "name": "Helmeted Guineafowl",
    "biome": "Savanna birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/helmeted-guineafowl.jpg"
  },
  {
    "id": 65,
    "name": "Saddle-Billed Stork",
    "biome": "Savanna birds",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/saddle-billed-stork.jpg"
  },
  {
    "id": 66,
    "name": "Wattled Crane",
    "biome": "Savanna birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/wattled-crane.jpg"
  },
  {
    "id": 67,
    "name": "Red-Billed Hornbill",
    "biome": "Savanna birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/red-billed-hornbill.jpg"
  },
  {
    "id": 68,
    "name": "Brown Quail",
    "biome": "Savanna birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/brown-quail.jpg"
  },
  {
    "id": 69,
    "name": "Vulturine Guineafowl",
    "biome": "Savanna birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/vulturine-guineafowl.jpg"
  },
  {
    "id": 70,
    "name": "Ostrich",
    "biome": "Savanna birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/ostrich.jpg"
  },
  {
    "id": 71,
    "name": "Motmot",
    "biome": "Savanna birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/motmot.jpg"
  },
  {
    "id": 72,
    "name": "Egyptian Goose",
    "biome": "Savanna birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/egyptian-goose.jpg"
  },
  {
    "id": 73,
    "name": "Secretary Bird",
    "biome": "Savanna birds",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/secretary-bird.jpg"
  },
  {
    "id": 74,
    "name": "Short-Eared Owl",
    "biome": "Savanna birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/short-eared-owl.jpg"
  },
  {
    "id": 75,
    "name": "Blue-Winged Parrotlet",
    "biome": "Savanna birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/blue-winged-parrotlet.jpg"
  },
  {
    "id": 76,
    "name": "Lilac-Breasted Roller",
    "biome": "Savanna birds",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/lilac-breasted-roller.jpg"
  },
  {
    "id": 77,
    "name": "European Roller",
    "biome": "Savanna birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/european-roller.jpg"
  },
  {
    "id": 78,
    "name": "Buzzard",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/buzzard.jpg"
  },
  {
    "id": 79,
    "name": "Atlantic Puffin",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/atlantic-puffin.jpg"
  },
  {
    "id": 80,
    "name": "Albatross",
    "biome": "Ice & snow",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/albatross.jpg"
  },
  {
    "id": 81,
    "name": "Blue-Eyed Shag",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/blue-eyed-shag.jpg"
  },
  {
    "id": 82,
    "name": "Fulmar",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/fulmar.jpg"
  },
  {
    "id": 83,
    "name": "Snowy Owl",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/snowy-owl.jpg"
  },
  {
    "id": 84,
    "name": "Arctic Tern",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/arctic-tern.jpg"
  },
  {
    "id": 85,
    "name": "Eider",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/eider.jpg"
  },
  {
    "id": 86,
    "name": "Arctic Redpoll",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/arctic-redpoll.jpg"
  },
  {
    "id": 87,
    "name": "Snow Petrel",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/snow-petrel.jpg"
  },
  {
    "id": 88,
    "name": "Giant Petrel",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/giant-petrel.jpg"
  },
  {
    "id": 89,
    "name": "Little Auk",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/little-auk.jpg"
  },
  {
    "id": 90,
    "name": "Ptarmigan",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/ptarmigan.jpg"
  },
  {
    "id": 91,
    "name": "Magellanic Penguin",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/magellanic-penguin.jpg"
  },
  {
    "id": 92,
    "name": "Gentoo Penguin",
    "biome": "Ice & snow",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/gentoo-penguin.jpg"
  },
  {
    "id": 93,
    "name": "King Penguin",
    "biome": "Ice & snow",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/king-penguin.jpg"
  },
  {
    "id": 94,
    "name": "Adelie Penguin",
    "biome": "Ice & snow",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/adelie-penguin.jpg"
  },
  {
    "id": 95,
    "name": "Macaroni Penguin",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/macaroni-penguin.jpg"
  },
  {
    "id": 96,
    "name": "Snares Crested Penguin",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/snares-crested-penguin.jpg"
  },
  {
    "id": 97,
    "name": "African Penguin",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/african-penguin.jpg"
  },
  {
    "id": 98,
    "name": "Emperor Penguin",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/emperor-penguin.jpg"
  },
  {
    "id": 99,
    "name": "Little Penguin",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/little-penguin.jpg"
  },
  {
    "id": 100,
    "name": "Rockhopper Penguin",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/rockhopper-penguin.jpg"
  },
  {
    "id": 101,
    "name": "Chinstrap Penguin",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/chinstrap-penguin.jpg"
  },
  {
    "id": 102,
    "name": "Humboldt Penguin",
    "biome": "Ice & snow",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/humboldt-penguin.jpg"
  },
  {
    "id": 103,
    "name": "Raggiana Bird of Paradise",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/raggiana-bird-of-paradise.jpg"
  },
  {
    "id": 104,
    "name": "Grey Parrot",
    "biome": "Rainforest birds",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/grey-parrot.jpg"
  },
  {
    "id": 105,
    "name": "Crimson Topaz Hummingbird",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/crimson-topaz-hummingbird.jpg"
  },
  {
    "id": 106,
    "name": "Moustached Babbler",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/moustached-babbler.jpg"
  },
  {
    "id": 107,
    "name": "Broadbill",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/broadbill.jpg"
  },
  {
    "id": 108,
    "name": "Wilson's Bird of Paradise",
    "biome": "Rainforest birds",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/wilsons-bird-of-paradise.jpg"
  },
  {
    "id": 109,
    "name": "Quetzal",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/quetzal.jpg"
  },
  {
    "id": 110,
    "name": "Great Hornbill",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/great-hornbill.jpg"
  },
  {
    "id": 111,
    "name": "Harpy Eagle",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/harpy-eagle.jpg"
  },
  {
    "id": 112,
    "name": "Hermit Hummingbird",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/hermit-hummingbird.jpg"
  },
  {
    "id": 113,
    "name": "Red-Fan Parrot",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/red-fan-parrot.jpg"
  },
  {
    "id": 114,
    "name": "Toucan",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/toucan.jpg"
  },
  {
    "id": 115,
    "name": "Oriental Dwarf Kingfisher",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/oriental-dwarf-kingfisher.jpg"
  },
  {
    "id": 116,
    "name": "Flowerpecker",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/flowerpecker.jpg"
  },
  {
    "id": 117,
    "name": "Blue-and-Yellow Macaw",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/blue-and-yellow-macaw.jpg"
  },
  {
    "id": 118,
    "name": "Hyacinth Macaw",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/hyacinth-macaw.jpg"
  },
  {
    "id": 119,
    "name": "Red-and-Green Macaw",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/red-and-green-macaw.jpg"
  },
  {
    "id": 120,
    "name": "Spectacled Owl",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/spectacled-owl.jpg"
  },
  {
    "id": 121,
    "name": "White Cockatoo",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/white-cockatoo.jpg"
  },
  {
    "id": 122,
    "name": "Lory",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/lory.jpg"
  },
  {
    "id": 123,
    "name": "Mealy Amazon",
    "biome": "Rainforest birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/mealy-amazon.jpg"
  },
  {
    "id": 124,
    "name": "Cassowary",
    "biome": "Rainforest birds",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/cassowary.jpg"
  },
  {
    "id": 125,
    "name": "Green Woodpecker",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/green-woodpecker.jpg"
  },
  {
    "id": 126,
    "name": "Crossbill",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/crossbill.jpg"
  },
  {
    "id": 127,
    "name": "Cuckoo",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/cuckoo.jpg"
  },
  {
    "id": 128,
    "name": "Pheasant",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/pheasant.jpg"
  },
  {
    "id": 129,
    "name": "Wood Warbler",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/wood-warbler.jpg"
  },
  {
    "id": 130,
    "name": "Blue Jay",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/blue-jay.jpg"
  },
  {
    "id": 131,
    "name": "Lewis' Woodpecker",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/lewis-woodpecker.jpg"
  },
  {
    "id": 132,
    "name": "Long-Eared Owl",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/long-eared-owl.jpg"
  },
  {
    "id": 133,
    "name": "Eurasian Crane",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/eurasian-crane.jpg"
  },
  {
    "id": 134,
    "name": "Northern Goshawk",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/northern-goshawk.jpg"
  },
  {
    "id": 135,
    "name": "Cardinal",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/cardinal.jpg"
  },
  {
    "id": 136,
    "name": "Tawny Owl",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/tawny-owl.jpg"
  },
  {
    "id": 137,
    "name": "Great Spotted Woodpecker",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/great-spotted-woodpecker.jpg"
  },
  {
    "id": 138,
    "name": "Black Woodpecker",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/black-woodpecker.jpg"
  },
  {
    "id": 139,
    "name": "Pileated Woodpecker",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/pileated-woodpecker.jpg"
  },
  {
    "id": 140,
    "name": "Grouse",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/grouse.jpg"
  },
  {
    "id": 141,
    "name": "Song Thrush",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/song-thrush.jpg"
  },
  {
    "id": 142,
    "name": "Clark's Nutcracker",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/clarks-nutcracker.jpg"
  },
  {
    "id": 143,
    "name": "European Goldfinch",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/european-goldfinch.jpg"
  },
  {
    "id": 144,
    "name": "Kea",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/kea.jpg"
  },
  {
    "id": 145,
    "name": "Sharp-Shinned Hawk",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/sharp-shinned-hawk.jpg"
  },
  {
    "id": 146,
    "name": "Mockingbird",
    "biome": "Forest & woodlands",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/mockingbird.jpg"
  },
  {
    "id": 147,
    "name": "Silver Campine Rooster",
    "biome": "Farm birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/silver-campine-rooster.jpg"
  },
  {
    "id": 148,
    "name": "Rouen Duck",
    "biome": "Farm birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/rouen-duck.jpg"
  },
  {
    "id": 149,
    "name": "Embden Goose",
    "biome": "Farm birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/embden-goose.jpg"
  },
  {
    "id": 150,
    "name": "Indian Game Hen",
    "biome": "Farm birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/indian-game-hen.jpg"
  },
  {
    "id": 151,
    "name": "Barn Owl",
    "biome": "Farm birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/barn-owl.jpg"
  },
  {
    "id": 152,
    "name": "Bourbon Red Turkey",
    "biome": "Farm birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/bourbon-red-turkey.jpg"
  },
  {
    "id": 153,
    "name": "Bronze Turkey",
    "biome": "Farm birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/bronze-turkey.jpg"
  },
  {
    "id": 154,
    "name": "Yokohama Rooster",
    "biome": "Farm birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/yokohama-rooster.jpg"
  },
  {
    "id": 155,
    "name": "Welsummer Rooster",
    "biome": "Farm birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/welsummer-rooster.jpg"
  },
  {
    "id": 156,
    "name": "White Leghorn Rooster",
    "biome": "Farm birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/white-leghorn-rooster.jpg"
  },
  {
    "id": 157,
    "name": "Silkie Hen",
    "biome": "Farm birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/silkie-hen.jpg"
  },
  {
    "id": 158,
    "name": "Gray Partridge",
    "biome": "Farm birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/gray-partridge.jpg"
  },
  {
    "id": 159,
    "name": "Budgerigar",
    "biome": "Pet birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/budgerigar.jpg"
  },
  {
    "id": 160,
    "name": "Peach-Faced Lovebird",
    "biome": "Pet birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/peach-faced-lovebird.jpg"
  },
  {
    "id": 161,
    "name": "Indian Ring-Necked Parakeet",
    "biome": "Pet birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/indian-ring-necked-parakeet.jpg"
  },
  {
    "id": 162,
    "name": "Yellow Collared Lovebird",
    "biome": "Pet birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/yellow-collared-lovebird.jpg"
  },
  {
    "id": 163,
    "name": "Splendid Grass Parakeet",
    "biome": "Pet birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/splendid-grass-parakeet.jpg"
  },
  {
    "id": 164,
    "name": "Gouldian Finch",
    "biome": "Pet birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/gouldian-finch.jpg"
  },
  {
    "id": 165,
    "name": "Canary",
    "biome": "Pet birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/canary.jpg"
  },
  {
    "id": 166,
    "name": "Palm Cockatoo",
    "biome": "Pet birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/palm-cockatoo.jpg"
  },
  {
    "id": 167,
    "name": "Cockatiel",
    "biome": "Pet birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/cockatiel.jpg"
  },
  {
    "id": 168,
    "name": "Rooster",
    "biome": "Pet birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/rooster.jpg"
  },
  {
    "id": 169,
    "name": "Chick",
    "biome": "Pet birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/chick.jpg"
  },
  {
    "id": 170,
    "name": "Hen",
    "biome": "Pet birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/hen.jpg"
  },
  {
    "id": 171,
    "name": "Falcon",
    "biome": "Birds of prey",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/falcon.jpg"
  },
  {
    "id": 172,
    "name": "Kestrel",
    "biome": "Birds of prey",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/kestrel.jpg"
  },
  {
    "id": 173,
    "name": "Condor",
    "biome": "Birds of prey",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/condor.jpg"
  },
  {
    "id": 174,
    "name": "Red Kite",
    "biome": "Birds of prey",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/red-kite.jpg"
  },
  {
    "id": 175,
    "name": "Bald Eagle",
    "biome": "Birds of prey",
    "favorite": true,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/bald-eagle.jpg"
  },
  {
    "id": 176,
    "name": "Osprey",
    "biome": "Birds of prey",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/osprey.jpg"
  },
  {
    "id": 177,
    "name": "Merlin",
    "biome": "Birds of prey",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/merlin.jpg"
  },
  {
    "id": 178,
    "name": "Burrowing Owl",
    "biome": "Night birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/burrowing-owl.jpg"
  },
  {
    "id": 179,
    "name": "Great Horned Owl",
    "biome": "Night birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/great-horned-owl.jpg"
  },
  {
    "id": 180,
    "name": "Nighthawk",
    "biome": "Night birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/nighthawk.jpg"
  },
  {
    "id": 181,
    "name": "Spotted Owl",
    "biome": "Night birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/spotted-owl.jpg"
  },
  {
    "id": 182,
    "name": "European Nightjar",
    "biome": "Night birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/european-nightjar.jpg"
  },
  {
    "id": 183,
    "name": "Owlet-Nightjar",
    "biome": "Night birds",
    "favorite": false,
    "image": "https://199-birds.s3.us-east-2.amazonaws.com/images/owlet-nightjar.jpg"
  }
];

export default birds;