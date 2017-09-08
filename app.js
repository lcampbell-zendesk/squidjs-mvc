require("babel-core/register");
require("babel-polyfill");
import bar from './bar';

async function foo() {
  var v = await bar();
  console.log(v);
}

foo();
