$(document).ready(function() {

	$('.removeEmployee').hide();
	var empArray = [];
	var salary;
	var totSalary = 0;
	var removedEmployee;
	var individualSalaries;

// Document Functions

	function appendDom(empInfo) {
		salary = parseFloat(empInfo.empSalary);

	// store the salary value using the data method		
		$('#dataStore').data( "salaryValue", salary );
		individualSalaries = $('#dataStore').data( "salaryValue");

		$('#container').append('<div></div>');
		var $el = $('#container').children().last();
		$el.append('<p>' + 'Name: ' + empInfo.empFullName + ', ' +
					  	'ID Number: ' + empInfo.empIdNumber + ', ' +
						'Job Title: ' + empInfo.empTitle + ', ' +
						'Salary: $' + individualSalaries  + '</p>');

		//check
		console.log(individualSalaries);

		//calculate total salary
		totSalary += individualSalaries;
	}

	function adjSalary () {
		totSalary -= individualSalaries;
		//check
		console.log(individualSalaries);
	} 

	function removeEmployee () {
		adjSalary();
		$('#container').children().last().remove();	 
	}

	//Start Logic
	$('#employeeForm').on('submit', function(event) {
		event.preventDefault();

		var values = {};

		$.each($('#employeeForm').serializeArray(), function(i, field) {
			values[field.name] = field.value;
		});

		$('#employeeForm').find('input[type=text]').val('');

		appendDom(values);
		empArray.push(individualSalaries);

		return totSalary;
	});

	//activate salary button

	$('button').on('click', function(){
		//calculateTotalSalary();
		$('.totalSalary').text('Monthly salary cost: $ ' + totSalary);
		$('.removeEmployee').show();
    	$('.removeEmployee').css('display','block');
	});


	// activate remove employee button

	$('.removeEmployee').on('click', function(){
		removeEmployee();
	});

});