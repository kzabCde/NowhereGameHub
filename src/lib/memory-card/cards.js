const icons=['🍎','🍌','🍇','🍓','🍒','🥝','🍍','🥥'];
export function createDeck(){ const cards=[...icons,...icons].map((icon,i)=>({id:`${icon}-${i}`,icon,matched:false})); for(let i=cards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [cards[i],cards[j]]=[cards[j],cards[i]];} return cards; }
