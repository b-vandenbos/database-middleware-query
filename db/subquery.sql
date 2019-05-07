-- DB - Statements (sub-queries)

SELECT * FROM customer
JOIN employee on customer.support_rep_id = employee.employee_id
WHERE support_rep_id IN(SELECT employee_id FROM employee WHERE employee_id = 5);