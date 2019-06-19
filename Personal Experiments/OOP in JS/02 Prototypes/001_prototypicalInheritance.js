// Inheritance

// Inheritance is one of the core concepts of OOP that enables an object to take on the properties and methods of another object.
// This makes it easy to reuse code in different parts of an application.

// Classical inheritance Example:
// Circle and Square both need to have the same method: `computeOptimalLocation()`
// So we could create a new Class called Shape and then Circle and Square could inherit methods and properties from Shape.

// Prototypical inheritance:
// Whenever you hear the word prototype, just think parent. Prototype sounds confusing but it’s really simple.
// A prototype is just an object in memory! There’s nothing special about it.
// A prototype contains properties and methods, and shares them with all of its children.

// Every object in JS (except the root object) has a prototype (parent).
// Every object inherits all of the members defined in its prototype.

// Every object contains a constructor property which references the fn that was used to construct or create that object.

// Whenever we try to access a member (property or method) on an object, JS engine will first check for that member on the object itself and if it doesn’t find it, it looks at the prototype for that object. If it doesn’t find it there it keeps looking up the chain all the way up to the root prototype.
// So this is prototypical inheritance in action.
