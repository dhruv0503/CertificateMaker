// One button left for both dashboard that is change password - 2 form fields both passwords. one is for old password one for new
// const response = await axios.post('http://localhost:5000/api/changePassword', {oldPassword , newPassword}, {header auth bullshit neeche se copy mr le})

//User Dashboard Done
//Both Dashboard should display earliest to latest
//Admin Dashboard ?? Exactly the same thing but no filtering with userId 
// Only 2 more buttons are needed for Admin Dashboard

// One Creates more Users - Signup for multiple Users. Need a file upload. When file uploaded just refresh the page and show Users added as a flash card. Also display the password.

// On file submit an api needs to be called : 


// const response = await axios.post("http://localhost:5000/api/users/addUsers", file, {
//     headers : {
//         Authorization : `Bearer ${localStorage.getItem('token')}`
//     }
// })

// const password = response.data[0].password;

//Another One creates the certificates - Same file upload bullshit. Show a flash card saying Certificates created successfully.

// const response = await axios.post('http://localhost:5000/api/certificates/upload', file, {header bullshit again})

//reload the page such that the api for all certificates gets called again.