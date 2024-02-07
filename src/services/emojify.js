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
        let emoji = allEmojis[getRandomNumber(0, allEmojis.length)].character;
        return emoji;
    });
    //console.log("emojis table", emojis);

    let emojifiedText = "";

    wordsFromText.forEach((element, index) => {
        emojifiedText += `${element} ${emojis[index] || ""}`
    });
    console.log(emojifiedText);
    return emojifiedText;
}
