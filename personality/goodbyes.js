
const randG = [
    'I like big RAM and I cannot lie',
    'Have a nice day!',
    'See ya!',
    'Bye bye',
    'May the power of Thor always shine to you',
    'May the three body problems alway stay in your head'
];

module.exports = () => {
    return randG[Math.floor(Math.random() * randG.length)]
}