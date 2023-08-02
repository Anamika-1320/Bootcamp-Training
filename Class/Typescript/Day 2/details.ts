function printDetails(eid: number, ename: string, emob: number, gender: string = 'Other') {
    console.log('Employee ID:', eid)
    console.log('Employee Name:', ename)
    console.log('Mobile No.:', emob)
    console.log('Gender:', gender)
}

printDetails(102, 'Ajay', 7625935829, 'Male');
