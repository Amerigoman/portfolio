/**
 * 1. Candies
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

/**
 * 2. Secretary Jeniffer
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

/**
 * 3. Sloboda friends 
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
	// as index and also to check whether the found one was noticed earlier.
	// Initially put the index of a person with a specific number because they can't
	// be their own friend and also from this index searching friends will be started
	var friendsCollection = [S-1];
	// an array for storage matrix
	var matrix = [];
	var inputData;
	var temp;

	// organize data entry for each person
	for(var k = 0; k < N; k++)
	{
		// read the data for one person
		inputData = prompt('Enter the data (separated by a space) for the person with ' + 
						   'a specific number of person ' + (k+1) + ' :');
		// split string by a separator and put the data into an array
		temp = inputData.split(' ');

		// go through each element 
		for(var m = 0; m < N; m++)
		{
			// and converted into a number
			temp[m] = +temp[m];
		}

		// put the an array of data into the end of the matrix
		matrix.push(temp);
	}

	// looking for friends till friends of friends are found
	for(var i = 0; i < friendsCollection.length; i++)
	{
		// looking at what kind of relationships a particular person has with others
		for(var j = 0; j < N; j++)
		{
			// in case if relationships are friendly and found friend was not noticed earlier
			if(matrix[friendsCollection[i]][j] && friendsCollection.indexOf(j) === -1)
			{
				// increase the number of friends
				numberOfFriends++;
				// put the index of found friend in array in order to
				// looking for friends of this friend and also to mark 
				// that this friend was noticed
				friendsCollection.push(j);
			}
		}
	}

	// return the number of friends
	return numberOfFriends;
}