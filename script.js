const formElement = document.querySelector('form');

formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    var intervalId = null;
    const confirmPopup = confirm('Do you want to submit the Form?');
    const messagePopup = document.getElementById('message');

    const submitting = () => {
        intervalId = setInterval(function () {
            const loader = document.createElement('div');
            loader.classList.add('loader');
            messagePopup.appendChild(loader);
        }, 1000);
    };

    const successSubmission = () => {
        clearInterval(intervalId);
    }


    if (confirmPopup) {
        messagePopup.classList.toggle('hidden');
        submitting();
    }


    // Get form values
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const address = document.getElementById('address').value;
    const state = document.getElementById('state').value;
    const country = document.getElementById('country').value;
    const pincode = document.getElementById('pincode').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const foodItems = Array.from(
        document.querySelectorAll('input[name="food[]"]:checked'))
        .map(item => item.value);

    // Create an object to store form data
    const formData = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        state: state,
        country: country,
        pincode: pincode,
        gender: gender,
        foodItems: foodItems
    };

    // Save the form data object to local storage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Create a new row in the table and append form values
    const table = document.getElementById('tbody');
    const newRow = table.insertRow(-1); //add after the existing Row.
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);
    const cell8 = newRow.insertCell(7);

    const stored = JSON.parse(localStorage.getItem('formData'));

    cell1.innerHTML = stored.firstName;
    cell2.innerHTML = stored.lastName;
    cell3.innerHTML = stored.address;
    cell4.innerHTML = stored.state;
    cell5.innerHTML = stored.country;
    cell6.innerHTML = stored.pincode;
    cell7.innerHTML = stored.gender;
    cell8.innerHTML = stored.foodItems.join(', ');

    // Clear the form
    document.getElementById('form').reset();
    setTimeout(() => {
        alert('Form Submitted Successfully');
        successSubmission();
        messagePopup.classList.toggle('hidden');
    }, 2000);

});