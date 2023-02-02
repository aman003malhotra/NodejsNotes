const hobbies = ["sports", "cooking", 1, true]

for (let hobby of hobbies) {
    console.log(hobby)
}

// new array
console.log(hobbies.map(hobby => {return "Hobby " + hobby }));