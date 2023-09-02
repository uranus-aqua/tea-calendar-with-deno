var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const _t = class _t {
  constructor(s2) {
    void 0 === _t.bM[0] && _t.init(), _t.cC(s2);
  }
  static dC(t2, s2) {
    const e = t2.split("&"), n = /* @__PURE__ */ new Map();
    return e[1].split("/").forEach((t3) => {
      n.set(String.fromCodePoint(s2--), t3);
    }), n.forEach((t3, s3) => {
      e[0] = e[0].replaceAll(s3, t3);
    }), e[0].split("");
  }
  static sN() {
    const t2 = this.dC(this.nD, 80);
    let s2 = 1584, e = 4;
    this.nY.set(s2 - 1, 24), t2.forEach((t3) => {
      const n = "z" === t3 ? 20 : Number(t3) + 10;
      e += n < 15 ? -n : n, this.nY.set(s2++, e + 20);
    });
  }
  static sM() {
    const t2 = this.dC(this.mD, 250), s2 = new Array(2439).fill([1, 0]).flat();
    this.mC = [...s2];
    const e = t2.map((t3) => parseInt(t3, 32));
    let n = 0;
    e.forEach((t3) => {
      n += t3, this.mC.splice(n, 0, this.mC[n - 1]);
    });
  }
  static sL() {
    const t2 = this.dC(this.lD, 75);
    let s2 = 1580;
    t2.forEach((t3, e) => {
      const n = parseInt(t3, 32), i = n < 14 ? 0 : -1;
      s2 += 3 + i, this.lP.set(s2, [e, n + 13 * i]);
    });
  }
  static gL(t2) {
    const s2 = this.mL.get(t2);
    if (s2)
      return s2;
    const e = this.lP.get(t2);
    let n = 12 * (t2 - 1582);
    n += e ? e[0] : ((t3) => {
      if (1582 === t3)
        return 0;
      const s3 = [];
      for (let e2 = 1; e2 < 4; e2++) {
        const n2 = this.lP.get(t3 - e2);
        n2 && s3.push(n2[0]);
      }
      return Math.max(...s3) + 1;
    })(t2);
    const i = e ? 13 : 12, r = this.mC.slice(n, n + i);
    let a = 0;
    return ((s3, e2) => {
      const n2 = new Array(e2);
      return s3.forEach((t3, s4) => {
        a += 29 + Number(t3), n2[s4] = a;
      }), this.mL.set(t2, n2), n2;
    })(r, i);
  }
  static gM(t2) {
    const s2 = this.mN.get(t2);
    if (s2)
      return s2;
    const e = this.bM.map((t3) => t3), n = this.lP.get(t2);
    return n && e.splice(n[1], 0, `${n[1]}bis`), this.mN.set(t2, e), e;
  }
  num() {
    return _t.rS;
  }
  static cC(t2) {
    const s2 = /* @__PURE__ */ new Date(t2 + "T12:00:00.000Z");
    if (isNaN(s2))
      return "N/A";
    let e = t2.length > 9 ? Number(t2.slice(0, 4)) : null;
    if (e > 2100 || e < 1583)
      return "N/A";
    const n = /* @__PURE__ */ new Date(`${e}-01-01T12:00:00.000Z`), i = Math.floor((s2 - n) / 864e5) + 1 - this.nY.get(e) + 1, r = i < 1;
    e -= r ? 1 : 0;
    const a = this.gL(e);
    let c, h, l;
    if (r) {
      const t3 = a.length;
      l = i + (a[t3 - 1] - a[t3 - 2]), c = l > 0 ? t3 - 1 : t3 - 2, l = l > 0 ? l : l + a[t3 - 2] - a[t3 - 3];
    } else
      c = Math.floor(i / 32), c += i < this.gL(e)[c] + 1 ? 0 : 1, l = 0 === c ? i : i - a[c - 1];
    h = this.gM(e)[c];
    const o = "string" == typeof h;
    h = o ? Number(h.slice(0, -3)) : h;
    const A = (e - 1563) % 60 || 60;
    this.rS = [A, h, l, o];
  }
  yearIn(t2 = null) {
    if (null !== t2)
      return s.yearIn(t2);
  }
  sino(t2 = null, e) {
    if (null !== t2)
      return s.sino(t2, e);
  }
};
__publicField(_t, "lD", "2IIn64o841o6KlE3kE3GmE4mHn6DBFJ2jCB4mE4l7Dl54n6DBJl5F52BKGl64n6Dl5AB4m6JoHGGl6A&Jk6AB3/FD/m63o8A/652B3/lE4/Aj/6CB/53/43/k5/42");
__publicField(_t, "mD", "½½ïÃ3å3¼¿ÏÒf5½½ÙëÍ8ÐÀðÚíÍíá8çÀñÂÂØàÂå52aÊ8ÑÙÒÚ8ÐèéÜØøùÅÄ¿8ç6çÃ1ñòÑÅÙÈfêÅÙÀ¾ÍÔ÷ÜÉ¿ÑôhôÜóÎÆÆÂÛãîÆ6çÃß×ãîÕÉÂäõÊ5½îÕÉÈêÚÀÒ×ÍÔÞ1É½×êÚÞÎ1ÉÐôaÝÀØ1óÓ¼ÆÂÈ1óÖÂòÅãîèÇÖÒêÚÀð×fhÀÞÎÅÊ5½fÆÞÎÏâ6çÂåÑÏÖÂäåßÏëßßÙÖèÇÖúÊ8hâÀìáâöÂÈàÀÂäåÑÏëÍÙëÊ8hôÜúêfÜØÎáÆöòïõÑÙèÙëÍéÜÌÄøââÜñ8çå3ñòÑï2aêÅÙÒÚ÷æÑ1Ý½ÚæãÎùîÄ¿8&ðÍÜì/ÆâÂÛÑ/×ÚæÑÎ/éÆèé/ÆØàÂ/28528/8½/É¿ã/Èß/ØÅá/Þ×/àÀä/1¿É/æ16ÄÎ/ÌÄÎ/ÖÈ/Êa/8¿/ÒÍ/45/ÆÛ/46/¾5/3¿¼/8Ý/ÅÆ/ÅÏ/3Ã/Ì8/25/ÆÀ/ÌÕ/fÔ/ÄÐ/ÂË/1Ã/ÓÉ/Ê1/a½/1½/ÀÈ/3Ë/¿Ç/ÅÇ/Á½/ff/À6/¼½/32/61/ÂÃ/Ä¼/8¼/Á¿/3½/48/¾3/1¼/¾1/41/66/23/43");
__publicField(_t, "nD", "928DEPB0NGMCA17EA039NKILKJB1zA117ELBCPFAAOAKMAKJLGELAAFMJFLADAPFEPDD2OOEGM0NGINAILAIFNIDCPAEM1070NGMCAMACMAKBLAJLKABLJ017LEBALFAKOBANDKALGANG12zDMAFLIEAPDC28FEIOCGMCAMAC128NKID1zIBNABCPBELBACMAKOBAJLKALGJFLA107LAFA&29/08/09/18/19/209/029/129/218/219/018/019/108/109/118/119");
__publicField(_t, "nY", /* @__PURE__ */ new Map());
__publicField(_t, "mC", new Array(6419));
__publicField(_t, "bM", new Array(12));
__publicField(_t, "lP", /* @__PURE__ */ new Map());
__publicField(_t, "mL", /* @__PURE__ */ new Map());
__publicField(_t, "mN", /* @__PURE__ */ new Map());
__publicField(_t, "rS", new Array(4));
_t.sN(), _t.sM(), _t.sL(), _t.bM = Array.from({ length: 12 }, (t2, s2) => s2 + 1);
let t = _t;
class s {
  static sY(t2, s2) {
    const e = new Date(s2 + 1983, 1), n = new Intl.DateTimeFormat(t2, { year: "numeric", calendar: "chinese" }).formatToParts(e).filter((t3) => "yearName" === t3.type)[0].value;
    return this.yS.set(`${t2}${s2}`, n), n;
  }
  static sS(t2) {
    const s2 = new Intl.NumberFormat("zh-Hans-TW-u-nu-hanidec").format;
    for (let e = 1; e < 13; e++)
      this.mS.set(e, `${e > 9 ? "十" : ""}${1 !== e || t2 ? 10 != e ? s2(e % 10) : "" : "正"}`);
    for (let t3 = 1; t3 < 31; t3++)
      this.dS.set(t3, `${t3 > 19 && t3 % 10 == 0 ? s2(Math.floor(t3 / 10)) : t3 > 20 ? "廿" : t3 > 10 ? "十" : "初"}${t3 % 10 == 0 ? "十" : s2(t3 % 10)}`);
  }
  static yearIn(s2) {
    const e = t.rS[0], n = this.yS.get(`${s2}${e}`) || this.sY(s2, e);
    return t.rS.with(0, n);
  }
  static sino(s2 = 0, e = true) {
    !this.dS.get(1) && this.sS(t.rS[3]);
    const n = ["年", "月"];
    return [`${this.yearIn("zh")[0]}${e ? n[0] : ""}`, `${t.rS[3] ? ["閏", "闰"][s2] : ""}${this.mS.get(t.rS[1])}${e ? n[1] : ""}`, `${this.dS.get(t.rS[2])}`];
  }
}
__publicField(s, "yS", /* @__PURE__ */ new Map());
__publicField(s, "mS", /* @__PURE__ */ new Map());
__publicField(s, "dS", /* @__PURE__ */ new Map());
export {
  s as Lang,
  t as Teac
};
//# sourceMappingURL=teac.js.map
