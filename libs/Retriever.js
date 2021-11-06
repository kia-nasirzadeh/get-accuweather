// requiring modules:
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const cheerioEq = require('cheerio-eq');
const loading = require('loading-cli');
const appProperties = require('./../appProperties.js');
const fs = require('fs');
const forEach = require('async-foreach').forEach;
const PutResultInJson = require('./putResultInJson.js');
const Report = require('./Report.js');


// person.js
'use strict';

module.exports = class Retriever {
    constructor() {}
    async init(callback) {
        this.browser = await puppeteer.launch({
            headless: true
        });
        callback(this);
    }
    getUrlFilePath() {
        return appProperties.getProp('urlsPath');
    }
    getUrlFileArray() {
        console.log('loading ... reading url file');
        let fileContents = fs.readFileSync(this.getUrlFilePath(), {
            encoding: 'utf8'
        });
        let fileContentsArray = fileContents.split('\n');
        // #TODO: check os before spliting cause sometimes we should split them by \r\n :
        return fileContentsArray;
    }
    async buildMonthLinksObj(url) {
        let browser = this.browser;
        let page = await browser.newPage();
        let monthLinks = [];

        await page.goto(url, {
            waitUntil: 'load',
            timeout: 0
        });
        const html = await page.content();
        const $ = cheerio.load(html);
        $('.monthly-daypanel').each((i, el) => {
            let dayLink = $(el).attr('href');
            if (dayLink !== undefined) {
                dayLink = "https://www.accuweather.com" + dayLink;
                monthLinks.push(dayLink);
            }
        })
        return monthLinks;
    }
    async retreiveDay_fromUrl(dayLink) {
        let day = {};
        let browser = this.browser;

        const load = loading({
            "text": "retrieving a single day page",
            "interval": 50,
            "stream": process.stdout,
            "frames": ["🕐 ", "🕑 ", "🕒 ", "🕓 ", "🕔 ", "🕕 ", "🕖 ", "🕗 ", "🕘 ", "🕙 ", "🕚 "]
        }, "").start();

        const page = await browser.newPage();
        let t1 = Date.now();
        await page.goto(dayLink, {
            waitUntil: 'load',
            timeout: 0
        });
        let diffTime = Date.now() - t1;
        load.stop();
        console.log(`day retrieved in ${diffTime} milliseconds`);

        const html = await page.content();
        const $ = cheerio.load(html);

        let dayObj = {}
        cheerioEq($, '.half-day-card-content:eq(0) .panel-item').each((i, v) => {
            let key = v.childNodes[0].nodeValue;
            let totalTxt = $(v).text();
            let val = totalTxt.substring(key.length);
            dayObj[key] = val;
        });

        let nightObj = {}
        cheerioEq($, '.half-day-card-content:eq(1) .panel-item').each((i, v) => {
            let key = v.childNodes[0].nodeValue;
            let totalTxt = $(v).text();
            let val = totalTxt.substring(key.length);
            nightObj[key] = val;
        });

        day = {
            shortDate: $('.short-date > div:eq(0)').text().replace(/\n/g, '').replace(/\t/g, ''),
            dayName: $('div.subnav-pagination > div').text(),
            day_RealFeel: $(".half-day-card-header > .real-feel > div:eq(0)").text().replace(/\n/g, '').replace(/\t/g, '').substring(9),
            day_RealFeelShade: $('.half-day-card-header > .real-feel > div:eq(1)').text().replace(/\n/g, '').replace(/\t/g, '').substring(15),
            night_RealFeel: cheerioEq($, ".half-day-card-header:eq(1) > .real-feel > div:eq(0)").text().substring(19, 21),
            maxTemp: cheerioEq($, '.half-day-card-header:eq(0) .temperature').text().replace(/\n/g, '').replace(/\t/g, '').split(/H/).shift(),
            minTemp: cheerioEq($, '.half-day-card-header:eq(1) .temperature').text().replace(/\n/g, '').replace(/\t/g, '').split(/L/).shift(),
            day_climateName: $('.phrase:eq(0)').text(),
            night_climateName: $('.phrase:eq(1)').text(),
            day_sunrise: cheerioEq($, '.sunrise-sunset div.panel.left div.spaced-content:eq(1) span:eq(1)').text(),
            day_sunset: cheerioEq($, '.sunrise-sunset div.panel.left div.spaced-content:eq(2) span:eq(1)').text(),
            night_sunrise: cheerioEq($, '.sunrise-sunset div.panel.right div.spaced-content:eq(1) span:eq(1)').text(),
            night_sunset: cheerioEq($, '.sunrise-sunset div.panel.right div.spaced-content:eq(2) span:eq(1)').text(),
            dayProps: dayObj,
            nightProps: nightObj
        }
        return day;
    }
    async retriveDays_fromUrls(urls) {
        let results = [];
        let mainClass = this;
        let getday = this.retreiveDay_fromUrl;

        async function fillResults() {
            for (const url of urls) {
                let day = await getday.bind(mainClass)(url);
                results.push(day);
            }
        }
        await fillResults();
        return results;
    }
    async retriveDays_fromFile(outputPath = false) {
        Report.fillStartPropertiesNow();
        let urls = this.getUrlFileArray();
        let results = [];
        let mainClass = this;
        let getday = this.retreiveDay_fromUrl;

        async function fillResults() {
            for (const url of urls) {
                let day = await getday.bind(mainClass)(url);
                results.push(day);
            }
        }
        await fillResults();

        if (!outputPath) console.log(results);
        else this.putInJson(results, outputPath);
        
        let browser = this.browser;
        await browser.close();
        Report.fillEndPropertiesNow();
        Report.showReport();
        return true;
    }
    async retrieveMonth_fromURL(url) {
        console.log('getting all this month days links ...');
        let daysUrls = await this.buildMonthLinksObj(url);
        console.log('this month days links retreived successfully');
        let results = [];
        console.log('getting days of this month synchronously ...');
        results = await this.retriveDays_fromUrls(daysUrls);
        console.log('all of the month days has been retreived successfully');
        if (this.isCurrentParallelMonthGettingProcessIsDone == false) this.isCurrentParallelMonthGettingProcessIsDone = true;
        return results;
    }
    async retrieveMonth_fromFile(outputPath = false) {
        Report.fillStartPropertiesNow();
        let monthUrls = this.getUrlFileArray();
        let results = [];
        let mainClass = this;
        let overallScrapedCheckout = 0;

        async function checkIfAllDone() {
            if (overallScrapedCheckout == monthUrls.length) {
                if (!outputPath) console.log(results);
                else this.putInJson(results, outputPath);
                
                let browser = this.browser;
                await browser.close();
                Report.fillEndPropertiesNow();
                Report.showReport();
                return true;
            }
        }
        
        async function retrieveMonth_fromURL_andPushItToResults(monthUrl) {
            let month = await mainClass.retrieveMonth_fromURL(monthUrl);
            results.push(month);
            overallScrapedCheckout += 1;
            checkIfAllDone.bind(this)();
        }

        forEach(monthUrls, function (monthUrl, index, monthUrls) { // a prallel design to start retrieving all months at once
            retrieveMonth_fromURL_andPushItToResults.bind(mainClass)(monthUrl)
        });
    }
    putInJson (results, outputPath) {
        const putResultInJson = new PutResultInJson(results, outputPath);
        putResultInJson.putInJson();
    }
}