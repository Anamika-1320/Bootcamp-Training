function AddNumbers(...nums: number[]) {
    var i;
    var sum: number = 0;

    for (i = 0; i < nums.length; i++) {
        sum = sum + nums[i];
    }
    console.log("Sum of the numbers is", sum)
}

AddNumbers(5, 5);
AddNumbers(5, 5, 5);