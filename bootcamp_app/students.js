const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const limit = process.argv[3]
const values = [`%${cohortName}%`, limit];


pool.query(`
SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, values)
.then(res => {
  for (const row of res.rows) {
    console.log(`${row.name} has an id of ${row.student_id} and was in the ${row.cohort} cohort`)
  }
})
.catch(err => console.error('query error', err.stack));