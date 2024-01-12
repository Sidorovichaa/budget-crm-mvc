import * as model from './model.js';
import * as view from './view.js';

/*===========START=============*/

init();

/*===========CONTROLLER FUNCTIONS=============*/

function init() {
    displayMonth();
    insertTestData();
    view.renderBudget(model.calcBudget());           //display the budget on the page 
    addEventListeners();
};

function addEventListeners() {
    view.elements.form.addEventListener('submit', createRecord);

    document.body.addEventListener('click', function (e) {
        if (e.target.closest("button.item__remove")) {
            deleteRecord(e);
        }
    });
}

function createRecord(e) {
    e.preventDefault();
    if (!view.checkEmptyFields()) return;             //Check form
    const formData = view.getFormData();              //Get form data
    const record = model.createRecord(formData);      //Create record and add to budget
    view.renderRecord(record);                        //Render record on page
    view.renderBudget(model.calcBudget());            //Calculate budget and display
    view.clearForm();
    insertTestData();
}

function deleteRecord(e) {
    const id = view.removeRecord(e);                   //from layout
    model.deleteRecord(id);                            //from data
    view.renderBudget(model.calcBudget());
}

function insertTestData() {
    const randomData = model.getTestData();
    view.renderTestData(randomData);
};

function displayMonth() {
    const date = model.getMonthYear();
    view.renderMonth(date.month, date.year);
};