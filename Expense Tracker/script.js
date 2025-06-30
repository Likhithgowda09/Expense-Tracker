// Add event listener to the form for submission
document.getElementById('expense-form').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior (which reloads the page)
    event.preventDefault();

    // 1. Get user input values
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    // 2. Create an expense object
    const expense = {
        amount: amount,
        description: description,
        category: category
    };

    // 3. Store the expense object in local storage
    // We use the description as the key for simplicity as per the requirement.
    // NOTE: This will overwrite expenses with the same description.
    localStorage.setItem(expense.description, JSON.stringify(expense));

    // 4. Display the expense on the screen
    displayExpenseOnScreen(expense);

    // 5. Clear the form fields for the next entry
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').selectedIndex = 0; // Reset dropdown to the first option
});

/**
 * Function to display a single expense on the screen
 * @param {object} expense - The expense object to display
 */
function displayExpenseOnScreen(expense) {
    const expenseList = document.getElementById('expenseList');

    // Create a new list item element
    const li = document.createElement('li');
    
    // Add Bootstrap classes for styling
    // d-flex: enables flexbox layout
    // justify-content-between: pushes text to the left and buttons to the right
    // align-items-center: vertically aligns items in the center
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    // Create the text content for the list item
    const textNode = document.createTextNode(`${expense.amount} - ${expense.description} - ${expense.category}`);
    li.appendChild(textNode);

    // Create a container for the buttons to group them on the right
    const buttonGroup = document.createElement('div');

    // Create Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm mx-1'; // `mx-1` adds a small horizontal margin
    deleteBtn.appendChild(document.createTextNode('Delete'));
    
    // Add onclick event for the delete button
    deleteBtn.onclick = () => {
        // Remove the expense from local storage
        localStorage.removeItem(expense.description);
        // Remove the list item from the screen
        expenseList.removeChild(li);
    };

    // Create Edit Button
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-warning btn-sm mx-1';
    editBtn.appendChild(document.createTextNode('Edit'));

    // Add onclick event for the edit button
    editBtn.onclick = () => {
        // Remove the item from local storage to be re-added upon form submission
        localStorage.removeItem(expense.description);
        // Remove the list item from the screen
        expenseList.removeChild(li);
        
        // Populate the form fields with the values of the item being edited
        document.getElementById('amount').value = expense.amount;
        document.getElementById('description').value = expense.description;
        document.getElementById('category').value = expense.category;
    };

    // Append buttons to the button group
    buttonGroup.appendChild(deleteBtn);
    buttonGroup.appendChild(editBtn);

    // Append the button group to the list item
    li.appendChild(buttonGroup);
    
    // Append the new list item to the unordered list
    expenseList.appendChild(li);
}