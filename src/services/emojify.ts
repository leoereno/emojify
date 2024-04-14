import { getEmoji, getAllEmojis } from "../api/api";
import { AmmountLabel } from "../types/AmmountLabel";

function getRandomNumber(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }
  

export async function emojifyText(text: string) {
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

export async function emojifyWithRandom(text: string, selectedAmmount: AmmountLabel){
    const wordsFromText = text.split(' ');
    const allEmojis = await getAllEmojis();

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
