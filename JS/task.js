/**
 * Function determine how many different versions of 
 * gifts weighing exactly W grams can make Santa Claus
 * 
 * @param  {number} X - the weight of candy in grams
 * @param  {number} Y - the weight of tangerine in grams
 * @param  {number} Z - the weight of apple in grams
 * @param  {number} W - the weight of gift
 * @return {number} the number of gift options
 */
function getGiftOptions(X, Y, Z, W) {
	// variable to store the number of gift options
	var numberOfGiftOptions = 0;

	// calculate the maximum number of one kind in a gift
	// in order to optimize the algorithm
	var a = W / X, b = W / Y, c = W / Z;
	
	// use nested loops to go through all the options
	for(var i = 0; i <= a; i++)
	{
		for(var j = 0; j <= b; j++)
		{
			for(var k = 0; k <= c; k++)
			{
				// in case gift weigh exactly W grams
				if(i*X + j*Y + k*Z === W)
				{
					// increase the number of gift options
					numberOfGiftOptions++;
				}
			}
		}
	}

	// return the number of gift options
	return numberOfGiftOptions;
}

var X = 3;
var Y = 5;
var Z = 7;
var W = 41;

var result1 = getGiftOptions(X, Y, Z, W);
console.log('X :: ' + X + '; Y :: ' + Y + '; Z :: ' + Z + 
						  '; W :: ' + W + '; Versions of gifts :: ' + result1);

/**
 * Function determine the minimum time in seconds required for 
 * the preparation of N copies preparation by the two XeroX each 
 * of which spends a certain time for copying of a single list of paper
 * 
 * @param  {number} N - the number of copies of the same document
 * @param  {number} x - time for which the Xerox copies the list of paper
 * @param  {number} y - time for which another Xerox copies the list of paper
 * @return {number} the minimum time in seconds required for the preparation of N copies
 */
function getMinimumTimeDuplication(N, x, y) {
	var elapsedTime = 0;
	var remainingCopies = N;
	var fasterXerox, slowerXerox;
	var counter1, counter2;

	// in case if print speed is the same
	if(x === y)
	{
		counter1 = counter2 = fasterXerox = slowerXerox = x;
	}
	// determine faster and slower Xerox if its print speed is different 
	else
	{
		fasterXerox = counter1 = Math.min(x, y);
		slowerXerox = counter2 = Math.max(x, y);
	}

	// make a copy on the fastest Xerox in order to use both
	// in the future and reduce the number of remaining
	elapsedTime += fasterXerox;
	remainingCopies--;

	// while there are copies for duplication
	while(remainingCopies > 0)
	{
		// copy the part of the document per unit time
		counter1--;
		counter2--;
		elapsedTime++;

		// if the document is copied fully then load the next
		// one and reduce the number of remaining ones
		if(counter1 === 0)
		{
			counter1 = fasterXerox;
			remainingCopies--;
		}
		if(counter2 === 0)
		{
			counter2 = slowerXerox;
			remainingCopies--;
		}
	}

	// return the number of elapsed time
	return elapsedTime;
}

var N = 111;
var c1 = 19;
var c2 = 22;

var result2 = getMinimumTimeDuplication(N, c1, c2);
console.log(N + ' копий при скорости ксерокса ' + c1 
			  + ' и ' + c2 + ' займет ' + result2 + ' секунд.');

/**
 * Function determine how much friends has a particular person in the company.
 * Matrix N lines contain N numbers consisting of ones and zeros. And 
 * the unit standing in the i-th row and j-th column ensures that people 
 * with numbers i and j - friends, and 0 - expresses uncertainty.
 * 
 * @param  {number} N - number of people in the company
 * @param  {number} S - a specific number of person
 * @return {number} number of the certain friends of the person with
 *                  the S number, remembering transitive friendship
 */
function getNumberOfFriends(N, S) {
	// variable for the number of friends
	var numberOfFriends = 0;

	// create an array that will be used to put a specific number of friends in
	// as index, and also to check whether the found one was noticed earlier.
	// Initially put the index of a person with a specific number because they can't
	// be their own friend and also from this index searching friends will be started
	var friendsCollection = [S-1];
	var arr = getMatrix(N);

	/*var arr = [
					[0, 0, 0, 0, 0 ],
					[0, 0, 1, 0, 0 ],
					[0, 1, 0, 0, 1 ],
					[0, 0, 0, 0, 1 ],
					[0, 0, 1, 1, 0 ]];*/

	/*console.log(friendsCollection.length);
	console.table(arr);*/

	// looking for friends till friends of friends are found
	for(var i = 0; i < friendsCollection.length; i++)
	{
		// looking at what kind of relationships a particular person has with others
		for(var j = 0; j < N; j++)
		{
			// in case if relationships are friendly and found friend was not noticed earlier
			if(arr[j][friendsCollection[i]] && friendsCollection.indexOf(j) === -1)
			{
				// increase the number of friends
				numberOfFriends++;
				// put the index of found friend in array in order to
				// looking for friends of this friend and also to mark 
				// that this friend was noticed
				friendsCollection.push(j);
			}
			/*console.log('[' + j + '][' + friendsCollection[i] + '] :: ' 
							+ arr[j][S-1] + ' ' + friendsCollection);*/
		}
	}

	// return the number of friends
	return numberOfFriends;
}

var N = 100;
var S = 50;

var result3 = getNumberOfFriends(N, S);
console.log('Всего друзей :: ' + result3 + '. N :: ' + N + '; S :: ' + S);

function rand (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getMatrix(size) {
	var arr = [];
	var x, y;

	for(var i = 0; i < size; i++) 
	{
		arr[i] = [];
		for(var j = 0; j < size; j++) 
		{
			arr[i].push(0);
		}
	}

	for(i = 0; i < size - 1; i++) 
	{
		x = rand(0, size);
		y = rand(0, size);

		if(x !== y)
		{
			arr[x][y] = 1;
			arr[y][x] = 1;
		}
	}

	return arr;
}