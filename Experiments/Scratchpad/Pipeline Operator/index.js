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
}

// prettier-ignore
let greeting = 'WORLD'
  |> lowerCase
  |> withPrefix
  |> withSuffix
  |> capitalize

console.log(greeting);

// prettier-ignore
let gangsta90sGreeting = 'WORLD'
  |> lowerCase
  |> (str => withPrefix(str, 'Yo what up '))
  |> (str => withSuffix(str, "! We tryin the Pipeline Operator!"))
  |> capitalize

console.log(gangsta90sGreeting);

// prettier-ignore
let dottyGreeting = 'WORLD'
  |> (str => withPrefix(str, 'hello'))
  |> lowerCase
  |> capitalize
  |> (str => str.split('').join('.'))

console.log(dottyGreeting);
