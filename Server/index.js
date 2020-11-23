const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch();
    console.log("Browser created !");

    const pageChapter = await browser.newPage();
    console.log("Page manga created !");

    //const pageImg = await browser.newPage();

    pageChapter.goto('https://chap.manganelo.com/manga-di117828/chapter-58');

    await pageChapter.waitForSelector('.container-chapter-reader');
    console.log("Manga chapter loaded !");

    await pageChapter.goto('https://s8.mkklcdnv8.com/mangakakalot/r2/rt918148/vol5_chapter_58_suspects/6.jpg', {"waitUntil" : "networkidle0"});

    //await pageChapter.waitForSelector('img');
    console.log("Manga image loaded !");


    await pageChapter.pdf({ path: 'page.pdf', format: 'A4' });

    console.log("PDF created !");
    
    
    browser.close(); 
})();

// https://chap.manganelo.com/manga-di117828/chapter-58     manga
// https://s8.mkklcdnv8.com/mangakakalot/r2/rt918148/vol5_chapter_58_suspects/1.jpg  page
