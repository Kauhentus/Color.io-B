export const randomInt = (start : number, stop : number) => Math.floor(Math.random() * (stop - start + 1) + start);

export const randomFloat = (start : number, stop : number) => Math.random() * (stop - start + 1) + start;

export const isValidHttpUrl = (string : string) => {
    let url;
    
    try {
url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
}

export const chunkIntoN = <T>(array: T[], n: number) => {
    const collection = [];
    for(let i = 0; i < array.length; i += n){
        collection.push(array.slice(i, i + n));
    }
    return collection;
}