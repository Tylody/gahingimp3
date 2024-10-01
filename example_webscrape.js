const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");

async function scrapeSite(keyword) {
  const url = `https://www.google.com/search?q=${keyword}&tbm=isch`;
  const { data } = await axios.get(url); // creates new object containing data
  const $ = cheerio.load(data);
  const searchResults = [];
  $("a").each((_idx, el) => {
    const a_href = $(el).attr("href");
    searchResults.push(a_href);
  });
  return searchResults;
}

async function main() {
  const keyword = "site:genius.com big brother kanye west lyrics";
  const output_urls = await scrapeSite(keyword);

  let first_result = output_urls[4];
  first_result = first_result.slice(0, 6);
  console.log(first_result);
}

let string =
  "/url?q=https://genius.com/Kanye-west-big-brother-lyrics&sa=U&ved=2ahUKEwjp6IfGhuqIAxXgEUQIHZmFNPcQqoUBegQIAhAB&usg=AOvVaw0yJJzkQXo9w1-pG2EO1Quj";
string = string.slice(7, string.length);

const re = /[^&]*/;

output = re.exec(string);

console.log(output[0]);
