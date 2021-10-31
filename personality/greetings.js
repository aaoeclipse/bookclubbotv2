
const randG = [
    'Wadup',
    'Whats craking',
    'Yoyoyo',
    'Whats popin',
    'what\'s up my dude',
    'life is hard, but your are harder',
    "*YAWN* I was sleeping... I'm kidding I don't sleep, I just cease to exists for a moment",
    "Whats shizzling",
    "Yo"
];

module.exports = () => {
    return randG[Math.floor(Math.random() * randG.length)]
}