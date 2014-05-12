var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      /* solve using filter() & all() / any() */

      var mushrooms = function(x) {
        return x === 'mushrooms';
      };

      var productsICanEat = _.filter(products, function(product) {
        return !(_(product.ingredients).any(mushrooms) || product.containsNuts);
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    /* try chaining range() and reduce() */

    var multipleOf3Or5 = function(x) {
      return x % 3 === 0 || x % 5 === 0 ? x : 0;
    };

    var sum = _.range(1000).reduce(function(aggregator, item) {
      return aggregator += multipleOf3Or5(item);
    }, 0);

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    // var ingredientCount = {};

    /* chain() together map(), flatten() and reduce() */

    var count = 0;
    var ingredientCount = _(products).chain()
                            .map(function(product) {return product.ingredients;})
                            .flatten()
                            .reduce(function(aggregator, item) {
                              aggregator[item] = aggregator[item] + 1 || 1;
                              return aggregator;
                            }, {})
                            .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

//   /*********************************************************************************/
//   /* UNCOMMENT FOR EXTRA CREDIT */

//   it("should find the largest prime factor of a composite number", function () {

//     var isPrime = function(x) {
//       for (var i = x - 1; i > 1; i--) {
//         if (x % i === 0) {
//           return false;
//         }
//       }
//       return true;
//     };

//     expect(isPrime(7)).toBe(true);

//     // Made object of window so as to use in another jasmine test further down the file.
//     // divisor can be element of divisors to test by. Refactored for speed.
//     window.isFactor = function(divisor, dividend) {
//       if (typeof divisor === 'number') {
//         return dividend % divisor === 0;
//       }
//       if (Array.isArray(divisor)) {
//         var result = true;
//         _.each(divisor, function(num) {
//           if (result == false) {
//             return;
//           }
//           if (dividend % num !== 0) {
//             result = false;
//           }
//         });
//         return result;
//       }
//     };

//     expect(isFactor(_.range(1,5), 12)).toEqual(true)

//     expect(isFactor(7, 21)).toBe(true);

//     var largestPrimeFactor = function(num) {
//       var nums = _.range(2, Math.round(num / 2) + 1);
//       return _.chain(nums)
//         .filter(function(item) { return isFactor(item, num);})
//         .filter(isPrime)
//         .value()
//         .pop() || undefined;
//     };

//     expect(largestPrimeFactor(100)).toBe(25);
//     expect(largestPrimeFactor(3)).toBe(undefined);
  
//   });

//   it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
//     var isPalindrome = function(str) {
//       if (typeof str != 'string') {
//         str = str.toString();
//       }
//       if (str.length <= 1) {
//         return true;
//       } if (str.charAt(0) != str.charAt(str.length - 1)) {
//         return false;
//       }
//       return isPalindrome(str.substr(1, str.length - 2));
//     };

//     expect(isPalindrome('neveroddoreven')).toBe(true);
//     expect(isPalindrome(123454321)).toBe(true);

//     var productsOfRanges = function(range1, range2) {
//       var results = [];
//       _(range1).forEach(function(num1) {
//         results.push(_(range2).map(function(num2) {
//           return num1 * num2;
//         }));
//       });
//       return _.uniq(_(results).flatten());
//     };

//     var zeroThroughThree = _.range(4);
//     var twoThroughFour = _.range(2, 5);
//     expect(productsOfRanges(zeroThroughThree, twoThroughFour)).toEqual([0, 2, 3, 4, 6, 8, 9, 12 ]);

//     var largestPalindrome = function(arr) {
//       arr = arr.sort(function(a,b){return b - a;});
//       var result = -1;
//       for (var i = 0; i < arr.length; i++) {
//         if (isPalindrome(arr[i])){
//           return arr[i];
//         }
//       }
//       return -1;
//     };

//     var zeroThroughTwentytwo = _.range(23);
//     expect(largestPalindrome(zeroThroughTwentytwo)).toEqual(22);

//     // This solution works but is too slow.
//     // var largestThreeDigitsProductsPalindrome = function() {
//     //   return largestPalindrome(productsOfRanges(_.range(100, 1000), _.range(100, 1000)));
//     // }

//     var largestThreeDigitsProductsPalindrome = function() {
//       var multipler = 999;
//       var answer;
//       for (var i = multipler; i >= 0; i--) {
//         for (var j = i; j >= 0; j--) {
//           if ((i * j) < answer) {
//             break;
//           }
//           if (isPalindrome(i * j)) {
//             answer = i * j;
//           }
//         }
//       }
//       return answer;
//     };

//     expect(largestThreeDigitsProductsPalindrome()).toEqual(906609);
    


//   });

//   it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

//     var isPrime = function(x) {
//       for (var i = x - 1; i > 1; i--) {
//         if (x % i === 0) {
//           return false;
//         }
//       }
//       return true;
//     };


    
//   });

//   it("should find the difference between the sum of the squares and the square of the sums", function () {
    
//   });

//   it("should find the 10001st prime", function () {

//   });
  
// });
