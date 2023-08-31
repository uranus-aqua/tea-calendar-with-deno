/**
 * @copyright 2023 KUO Wei-Shiung
 * @license MIT
 */

/** TEAC: Traditional East-Asian Calendar */

/**
 * Core module
 *
 * @class Teac
 * @typedef {Teac}
 */
            
export class Teac {
    /**
     * Creates an instance of Teac.
     *
     * @constructor
     * @param {*} t
     */
    constructor(t){
        if (typeof(Teac.basicMonthNames[0])==='undefined') Teac.init();
        Teac.calc(t);
    }

    /**
     * Compressed data 
     *
     * @static
     * @type {string}
     */
    static leapsData = '2IIn64o841o6KlE3kE3GmE4mHn6DBFJ2jCB4mE4l7Dl54n6DBJl5F52BKGl64n6Dl5AB4m6JoHGGl6A&Jk6AB3/FD/m63o8A/652B3/lE4/Aj/6CB/53/43/k5/42';
    static moonData = '½½ïÃ3å3¼¿ÏÒf5½½ÙëÍ8ÐÀðÚíÍíá8çÀñÂÂØàÂå52aÊ8ÑÙÒÚ8ÐèéÜØøùÅÄ¿8ç6çÃ1ñòÑÅÙÈfêÅÙÀ¾ÍÔ÷ÜÉ¿ÑôhôÜóÎÆÆÂÛãîÆ6çÃß×ãîÕÉÂäõÊ5½îÕÉÈêÚÀÒ×ÍÔÞ1É½×êÚÞÎ1ÉÐôaÝÀØ1óÓ¼ÆÂÈ1óÖÂòÅãîèÇÖÒêÚÀð×fhÀÞÎÅÊ5½fÆÞÎÏâ6çÂåÑÏÖÂäåßÏëßßÙÖèÇÖúÊ8hâÀìáâöÂÈàÀÂäåÑÏëÍÙëÊ8hôÜúêfÜØÎáÆöòïõÑÙèÙëÍéÜÌÄøââÜñ8çå3ñòÑï2aêÅÙÒÚ÷æÑ1Ý½ÚæãÎùîÄ¿8&ðÍÜì/ÆâÂÛÑ/×ÚæÑÎ/éÆèé/ÆØàÂ/28528/8½/É¿ã/Èß/ØÅá/Þ×/àÀä/1¿É/æ16ÄÎ/ÌÄÎ/ÖÈ/Êa/8¿/ÒÍ/45/ÆÛ/46/¾5/3¿¼/8Ý/ÅÆ/ÅÏ/3Ã/Ì8/25/ÆÀ/ÌÕ/fÔ/ÄÐ/ÂË/1Ã/ÓÉ/Ê1/a½/1½/ÀÈ/3Ë/¿Ç/ÅÇ/Á½/ff/À6/¼½/32/61/ÂÃ/Ä¼/8¼/Á¿/3½/48/¾3/1¼/¾1/41/66/23/43';
    static newYearsData= '928DEPB0NGMCA17EA039NKILKJB1zA117ELBCPFAAOAKMAKJLGELAAFMJFLADAPFEPDD2OOEGM0NGINAILAIFNIDCPAEM1070NGMCAMACMAKBLAJLKABLJ017LEBALFAKOBANDKALGANG12zDMAFLIEAPDC28FEIOCGMCAMAC128NKID1zIBNABCPBELBACMAKOBAJLKALGJFLA107LAFA&29/08/09/18/19/209/029/129/218/219/018/019/108/109/118/119';
    
    /**
     * decompression of data
     *
     * @static
     * @param {string, number} t: compressed string; number: max character code.
     * @returns {array}
     */
    static decompress(t, maxCode){
        const a = t.split('&');
        const dictionary = new Map();
        const dictToArray = a[1].split('/');
        dictToArray.forEach(e=>{
            dictionary.set(String.fromCodePoint(maxCode--), e);
        });
        dictionary.forEach((value, key)=>{
            a[0] = a[0].replaceAll(key, value);
        });
        return a[0].split('');
    }
    
    /**
     * Gregorian day number of each Teac New Year day 
     *
     * @static
     * @type {map}
     */
    static newYears = new Map();
    static setNewYears(){
        const a = this.decompress(this.newYearsData, 80);
        let y = 1584, v = 4;
        
        //TEAC's New Year day in 1583: 24 January
        this.newYears.set(y-1, 24);
        
        a.forEach(e=>{
            const f = e === 'z'?20:Number(e) + 10;
            v += f < 15? -f: f;
            this.newYears.set(y++, v + 20);
        });
    }
    
    /**
     * length of months, base on irregular months' intervals
     * every year's information is stored in a string, and to be decoded when needed
     *
     * @static
     * @type {Map}
     */
    static monthsLengthCode = new Array(6419);
    static setAllMonths(){
        const dataString = this.decompress(this.moonData, 250);
        const regulars = new Array(2439).fill([1, 0]).flat();
        this.monthsLengthCode = [...regulars];
        const irregulars = dataString.map(e => parseInt(e, 32));           
        let position = 0;
        irregulars.forEach(e=> {
            position += e;
            this.monthsLengthCode.splice(position, 0, this.monthsLengthCode[position -1]);
        });
    }
    
    /**
     * regular month names
     *
     * @static
     * @type {array}
     */
    static basicMonthNames = new Array(12);

    /**
     * leap months
     * key = year 
     *
     * @static
     * @type {map}
     */
    static leaps = new Map();
    static setLeaps(){
        const decompressed = this.decompress(this.leapsData, 75);
        let y = 1580;
        decompressed.forEach((e, k)=>{
            const v = parseInt(e, 32);
            //if v > 13, there's only one year separating it to the previous year having 13 months
            const factor = v < 14?0:-1;
            y += 3 + factor;
            //keep the key for calculate single year's months
            this.leaps.set(y, [k, v + 13 * factor]);
        });
    }

    /**
     * the distance between the first day of each month of year and the TEAC's New Year
     * 
     * @static
     * @type {map}
     */
    static monthLadder = new Map();
    static getMonthLadder(y){
        const m = this.monthLadder.get(y);
        if (m) return m;
        const leapsBefore = a =>{
            if (a === 1582) return 0;
            const arr = [];
            for (let i = 1; i < 4; i++){
                const v = this.leaps.get(a - i);
                v?arr.push(v[0]):null; 
            }
            return Math.max(...arr) + 1;
        };
        const leap = this.leaps.get(y);
        let monthNumber = (y - 1582) * 12;
        monthNumber += leap?leap[0]:leapsBefore(y);
        const yearLength = leap?13:12;
        const dataArray = this.monthsLengthCode.slice(monthNumber, monthNumber + yearLength);
        let days = 0;
        const monthsLengthOfTargetYear = (data, length) =>{
            const a = new Array(length);
            data.forEach((e, k)=>{
                days += 29 + Number(e);
                a[k] = days;
            });
            this.monthLadder.set(y, a);
            return a;
        };
        const a = monthsLengthOfTargetYear(dataArray, yearLength);
        return a;
    }

    /**
     * set months' name of the target year
     *
     * @static
     * @type {map}
     */
    static monthNames = new Map();
    static getMonthNames(y){
        const r = this.monthNames.get(y);
        if (r) return r;
        const m = this.basicMonthNames.map(e=>e);
        const leap = this.leaps.get(y);
        // insert the leap month, if there's one
        leap?m.splice(leap[1], 0, `${leap[1]}bis`):null;
        this.monthNames.set(y, m);
        return m;
    }   
    /**
     * the array to be outputted
     *
     * @static
     * @type {array}
     */
    static result = new Array(4);

    /**
     * numeric output (default): an array of numbers and boolean value (for leap month)
     *
     * @param {*} t = date string, initial input 
     * @returns {array} e.g., [40, 2, 15, true]
     */
    num(){
        return Teac.result;    
    }

    /**
     * main calculation
     *
     * @static
     * @param {string} t
     * @returns {string}
     */
    static calc(t){
        const d = new Date(t + 'T12:00:00.000Z');
        if (isNaN(d)) return 'N/A';

        //Gregorian Calendar's Year
        let y = t.length > 9? Number(t.slice(0, 4)):null;
        
        //exclude the eventual out-of-rang.
        if(y > 2100 || y < 1583) return 'N/A';
        
        //day number (the Gregorian Calendar's New Year day of the target year = 1)
        const solarNewyear = new Date(`${y}-01-01T12:00:00.000Z`);
        const solarYearDay = Math.floor((d - solarNewyear)/86400000) + 1;

        //TEAC's New Year: its day number according to the Gregorian Calendar
        const newYear = this.newYears.get(y);

        //the target before or after the TEAC New Year
        const tYearDay = solarYearDay - newYear + 1;
        const applyPreviousYear = tYearDay < 1;
        y -= applyPreviousYear?1:0;
        const kalends = this.getMonthLadder(y);
        let monthIndex, tMonth, tDay;

        if(applyPreviousYear){
            const yearLength = kalends.length;
            const lastMonthLenth = kalends[yearLength -1] - kalends[yearLength -2];
            tDay = tYearDay + lastMonthLenth;
            monthIndex = tDay > 0?yearLength -1:yearLength -2;
            tDay = tDay > 0?tDay:tDay + kalends[yearLength -2] - kalends[yearLength -3];
        }else{
            //the minimun of the possible months
            monthIndex = Math.floor(tYearDay/32);
            //then the precision.
            monthIndex += tYearDay < this.getMonthLadder(y)[monthIndex] + 1?0:1;
            //the number of day of Month
            tDay = monthIndex === 0?tYearDay:tYearDay - kalends[monthIndex -1];
        }
        //the corresponding month name
        tMonth = this.getMonthNames(y)[monthIndex];            
        
        //only the leap month's name is in string format, the others are numbers.  
        const leap = typeof tMonth === 'string';
        tMonth = leap?Number(tMonth.slice(0, -3)):tMonth;

        //the year number in the sexagenary cycle
        const tYear = (y - 1563)%60||60;

        //the array for the output or the eventual translation
        this.result = [tYear, tMonth, tDay, leap];
    }
    
    /**
     * compositions with the "Lang" module
     *
     * @class Teac
     * @typedef {Teac}
     */
    yearIn(lang = null){
        if (lang !== null){
            return Lang.yearIn(lang);
        }
    }

    sino(type = null, literal){
        if (type !== null){
            return Lang.sino(type, literal);
        }
    }

    /**
     * initiation: decompress the data string and make the regular month names (in numbers)
     *
     * @static
     */
    static {
        this.setNewYears();
        this.setAllMonths();
        this.setLeaps();
        this.basicMonthNames = Array.from({ length: 12 }, (_v, i) => i + 1);
    }
}
/**
 * Language module
 *
 */
export class Lang{
    /**
     * convert the TEAC's year from number format to string in Chinese, Korean, or pinying
     * Basic strings
     *
     * @static
     * @type {map}
     */
    static yearString = new Map();
    static monthString = new Map();
    static dayString = new Map();

    /**
     * set the sexagenary year name by retrieve the string from the JavaScript's Standard built-in objects 'Intl'.
     *
     * @static
     * @param {string} language code
     * @param {number} y = TEAC year in numeric format
     * @returns {string}
     */
    static setYearString(lang, y){
        const d = new Date(y + 1983, 1);
        const options = { year: "numeric", calendar: "chinese" };
        const dateFormat = new Intl.DateTimeFormat(lang, options);
        const t = dateFormat.formatToParts(d).filter(e => e.type === 'yearName')[0].value;
        this.yearString.set(`${lang}${y}`, t);
        return t;
    }
    
    /**
     * string of month and day
     *
     * @static
     * @param {boolean}
     */
    static setMonthDayString(isLeap){
        const hann = new Intl.NumberFormat("zh-Hans-TW-u-nu-hanidec").format;
        for(let m = 1; m < 13; m++){
            this.monthString.set(m, `${m>9?'十':''}${(m ===1&&!isLeap?'正':(m!=10?hann(m%10):''))}`);
        }
        for(let n = 1; n < 31; n++){
            this.dayString.set(n, `${n>19&&n%10===0?hann(Math.floor(n/10)):(n>20?'廿':(n>10?'十':'初'))}${n%10===0?'十':hann(n%10)}`);
        }
    }

    /**
     * convert the sexagenary year number to year name string in Chinese ('zh'), Korean ('ko') or pingying('en', 'fr', etc.).
     * 
     * @static
     * @param {string} lang, 'zh', 'ko' or other ISO language code
     * @returns {string} e.g., ['癸卯', 2, 15, true]
     */
    static yearIn(lang){
        const y = Teac.result[0];
        const t = this.yearString.get(`${lang}${y}`)||this.setYearString(lang, y);
        const r = Teac.result.with(0, t);
        return r;
    }

    /**
     * convert the result to Chinese
     * array of three elements
     *
     * @static
     * @param {number} [type=0] 0 for the traditional Chinese; 1 for the simplified;
     * @param {boolean} [literal=true]  if false, output without "年" and "月".
     * @returns {array} e.g., ['癸卯年', '閏二月', '十五']
     */
    static sino(type = 0, literal = true){
        this.dayString.get(1)?null:this.setMonthDayString(Teac.result[3]);
        const bis = ['閏','闰'];
        const lit = ['年', '月'];
        const y = `${this.yearIn('zh')[0]}${literal?lit[0]:''}`;
        const m = `${Teac.result[3]?bis[type]:''}${this.monthString.get(Teac.result[1])}${literal?lit[1]:''}`;
        const d = `${this.dayString.get(Teac.result[2])}`;
        return [y, m, d];
    }
}       
