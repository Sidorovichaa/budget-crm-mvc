const budget = [];

/*===========CREATE RECORD=============*/
function createRecord(formData) {
    //Create id
    let id = 1;
    if (budget.length > 0) {
        const lastEl = budget[budget.length - 1];
        const lastElID = lastEl.id;
        id = lastElID + 1;
    };

    //Create record and add to budget
    const record = {
        id: id,
        type: formData.type,
        title: formData.title.trim(),
        value: +formData.value
    }

    budget.push(record);
    return record;
};

/*===========DELETE RECORD=============*/
function deleteRecord(id) {
    const index = budget.findIndex(function (element) {
        if (+id === element.id) return true                   // String to Number
    });

    //Remove from array budget
    budget.splice(index, 1);
};

/*===========CALCULATE TOTAL BUDGET=============*/
function calcBudget() {
    //calculate total income
    const totalIncome = budget.reduce(function (total, element) {
        if (element.type === 'inc') {
            return total + element.value;
        } else {
            return total;
        }
    }, 0);

    //calculate total expense
    const totalExpense = budget.reduce(function (total, element) {
        if (element.type === 'exp') {
            return total + element.value;
        } else {
            return total;
        }
    }, 0);

    //calculate total budget
    const totalBudget = totalIncome - totalExpense;
    let expensePercents = 0;
    if (totalIncome) {
        expensePercents = Math.round((totalExpense * 100) / totalIncome);
    }

    return {
        totalIncome,     // same as totalIncome: totalIncome,
        totalExpense,
        totalBudget,
        expensePercents,
    };
};

/*===========CREATE TEST DATA=============*/
function getTestData() {
    const testData = [
        { type: 'inc', title: 'Фриланс', value: 1500 },
        { type: 'inc', title: 'Зарплата', value: 2000 },
        { type: 'inc', title: 'Бизнес', value: 2000 },
        { type: 'inc', title: 'Рента', value: 1000 },
        { type: 'exp', title: 'Продукты', value: 300 },
        { type: 'exp', title: 'Кафе', value: 200 },
        { type: 'exp', title: 'Транспорт', value: 200 },
        { type: 'exp', title: 'Квартира', value: 500 },
    ];

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    const randomIndex = getRandomInt(testData.length);
    const randomData = testData[randomIndex];
    return randomData;
};

/*===========GET MONTH AND YEAR=============*/
function getMonthYear() {
    const now = new Date();
    const year = now.getFullYear();
    const timeFormatter = new Intl.DateTimeFormat('ru-RU', { month: 'long' });
    const month = timeFormatter.format(now);
    return { month, year };
};



export {
    createRecord,
    deleteRecord,
    calcBudget,
    getTestData,
    getMonthYear
};