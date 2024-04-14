const api_key : string = process.env.REACT_APP_API_KEY as string; 
const random_emoji_uri = `https://emoji-api.com/emojis?access_key=${api_key}`

function getRandomNumber(min: number, max:number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

export async function getEmoji(word: string) {
    const response = await fetch(`https://emoji-api.com/emojis?search=${word}&access_key=${api_key}`);

    if(response.ok){
        console.log(response.ok)
        const responseObject = await response.json();
        //console.log(responseObject[0]?.character);
        return responseObject[0]?.character;
    }
    return null;
}

export async function getAllEmojis(){
    const response = await fetch(random_emoji_uri);
    if(response.ok){
        const responseObject = await response.json();
        return responseObject;
    }
}