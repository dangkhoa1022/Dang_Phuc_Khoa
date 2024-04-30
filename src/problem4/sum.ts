// Mthematical formula
// Explanation: Calculates the sum of integers from 1 to n using the mathematical formula sum = n(n+1)/2.
// Time complexity: O(1)
function sum_to_n_a(n: number): number {
	return (n * (n + 1)) / 2;
}

// For loop
// Explanation: Calculates the sum of integers from 1 to n by iterating from 1 to n and adding each number to the sum.
// Time complexity: O(n)
function sum_to_n_b(n: number): number {
	let sum = 0;
	for (let i = 1; i <= n; i++) {
		sum += i;
	}
	return sum;
}

// Recursion
// Explanation: Calculates the sum of integers from 1 to n recursively by summing n with the result of the function called with n-1.
// Time complexity: O(n)
function sum_to_n_c(n: number): number {
	if (n === 1) {
		return 1;
	}
	return n + sum_to_n_c(n - 1);
}

function runAllAlgorithms(n: number): void {
	console.log('Using mathematical formula:', sum_to_n_a(n));
	console.log('Using for loop:', sum_to_n_b(n));
	console.log('Using recursion:', sum_to_n_c(n));
}

const n = 10;
runAllAlgorithms(n);

//tsc sumToN.ts && node sumToN.js
