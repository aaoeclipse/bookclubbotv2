
const randG = [
    'Wadup',
    'Whats craking',
    'Yoyoyo',
    'Whats popin',
    'what\'s up my dude',
    'life is hard, but your are harder'
];

module.exports = () => {
    return randG[Math.floor(Math.random() * randG.length)]
}