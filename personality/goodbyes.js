
const randG = [
    'I like big RAM and I cannot lie',
    'Have a nice day!',
    'See ya!',
    'Bye bye',
    'May the power of Thor always shine to you',
    'May the three body problems alway stay in your head',
    "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn",
    "If I was in squid game I would push you on green light red light"
];

module.exports = () => {
    return randG[Math.floor(Math.random() * randG.length)]
}