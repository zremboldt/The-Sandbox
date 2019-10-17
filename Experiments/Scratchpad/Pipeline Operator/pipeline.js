var _ref, _ref2, _ref3, _WORLD, _ref4, _ref5, _ref6, _WORLD2, _ref7, _ref8, _ref9, _WORLD3;

function withPrefix(string, prefix = 'hello, ') {
  return prefix + string;
}

function withSuffix(string, suffix = " it's me!") {
  return string + suffix;
}

function capitalize(string) {
  return string[0].toUpperCase() + string.substring(1);
}

function lowerCase(string) {
  return string.toLowerCase();
} // prettier-ignore


let greeting = (_ref = (_ref2 = (_ref3 = (_WORLD = 'WORLD', lowerCase(_WORLD)), withPrefix(_ref3)), withSuffix(_ref2)), capitalize(_ref));
console.log(greeting); // prettier-ignore

let gangsta90sGreeting = (_ref4 = (_ref5 = (_ref6 = (_WORLD2 = 'WORLD', lowerCase(_WORLD2)), withPrefix(_ref6, 'Yo what up ')), withSuffix(_ref5, "! We tryin the Pipeline Operator!")), capitalize(_ref4));
console.log(gangsta90sGreeting); // prettier-ignore

let dottyGreeting = (_ref7 = (_ref8 = (_ref9 = (_WORLD3 = 'WORLD', withPrefix(_WORLD3, 'hello')), lowerCase(_ref9)), capitalize(_ref8)), _ref7.split('').join('.'));
console.log(dottyGreeting);
