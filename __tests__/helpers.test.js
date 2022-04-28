const { clear } = require("console");
const { format_date, format_plural } = require("../utils/helpers");

// test to formate the date
test("format_date() returns a date string", () => {
  const date = new Date("2022-04-28 16:12:03");

  expect(format_date(date)).toBe("4/28/2022");
});

// test to return a pluarized word i.e if 1 comment = comment 
test("format_plural() returns a pluralized word", () => {
  const word1 = format_plural("tiger", 2);
  const word2 = format_plural("lion", 1);

  expect(word1).toBe("tigers");
  expect(word2).toBe("lion");
});
