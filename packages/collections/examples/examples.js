import {flatMap, prop, pick} from '../dist/collections.js';

const students = [
    {id: 1, firstName: "Francine", lastName: "McQuorkel", age: 29},
    {id: 2, firstName: "Nikita", lastName: "Petrillo", age: 24},
    {id: 3, firstName: "Kristoforo", lastName: "Callaghan", age: 45},
    {id: 4, firstName: "Roz", lastName: "Cridlon", age: 45},
    {id: 5, firstName: "Garnette", lastName: "Bartle", age: 28},
    {id: 6, firstName: "Denis", lastName: "Bausmann", age: 53},
    {id: 7, firstName: "Blancha", lastName: "Hyrons", age: 22},
    {id: 8, firstName: "Celina", lastName: "Paylie", age: 22},
    {id: 9, firstName: "Peggie", lastName: "McCutheon", age: 22},
    {id: 10, firstName: "Karol", lastName: "Stollberger", age: 43}
];

// flatMap works with Arrays, Maps, and Sets
const groupWithSameAges = flatMap(
    (user) => (user.length > 1) ? [user.map(pick('age', 'firstName', 'lastName'))] : [],
    // Map object with students grouped by age
    Map.groupBy(students, prop('age'))
);
console.log(JSON.stringify(groupWithSameAges, null, 2));
/* Output:
[
  [
    {
      "age": 45,
      "firstName": "Kristoforo",
      "lastName": "Callaghan"
    },
    {
      "age": 45,
      "firstName": "Roz",
      "lastName": "Cridlon"
    }
  ],
  [
    {
      "age": 22,
      "firstName": "Blancha",
      "lastName": "Hyrons"
    },
    {
      "age": 22,
      "firstName": "Celina",
      "lastName": "Paylie"
    },
    {
      "age": 22,
      "firstName": "Peggie",
      "lastName": "McCutheon"
    }
  ]
]
*/