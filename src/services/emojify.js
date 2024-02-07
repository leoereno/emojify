import { getEmoji, getAllEmojis } from "../api/api";

function getRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }
  

export async function emojifyText(text) {
    const wordsFromText = text.split(' ');
    const emojis = await Promise.all(wordsFromText.map(async el => {
        let emoji = await getEmoji(el);
        console.log('loggin word - emoji', el, emoji);
        return emoji;
    }));
    //console.log("emojis table", emojis);

    let emojifiedText = "";

    wordsFromText.forEach((element, index) => {
        emojifiedText += `${element} ${emojis[index] || ""}`
    });
    console.log(emojifiedText);
    return emojifiedText;
}

export async function emojifyWithRandom(text, selectedAmmount){
    const wordsFromText = text.split(' ');
    const allEmojis = await getAllEmojis();
    //console.log(allEmojis);

    const emojis = wordsFromText.map(el => {
        const willHaveEmoji = getRandomNumber(0,2);
        const numberOfEmojis = willHaveEmoji > 0 ? getRandomNumber(1,3) : 0;
        
        let emojis = '';
        for(let i = 0; i < numberOfEmojis; i++){
            emojis += allEmojis[getRandomNumber(0, allEmojis.length)].character;
        }
        return el + emojis;
        //let emoji = allEmojis[getRandomNumber(0, allEmojis.length)].character;
        //return emoji;
    });
    return emojis.join(' ');
    // uncomment HERE
    // let emojifiedText = "";

    // wordsFromText.forEach((element, index) => {
    //     emojifiedText += `${element} ${emojis[index] || ""}`
    // });
    // console.log(emojifiedText);
    // return emojifiedText;
}
