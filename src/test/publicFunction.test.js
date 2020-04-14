import * as F from '../components/resource/publicFunction';

test("reparseDate", ()=> {
    expect(F.reparseDate(new Date())).toBe("2020-03-26");
})

test("isDataArrow", ()=> {
    expect(F.isDataAllow("title", "content", 1, new Date())).toBeTruthy();
})

test("getIsExpired" ,()=> {
    expect(F.getIsExpiration({response:{status: 404}})).toBeFalsy();
})