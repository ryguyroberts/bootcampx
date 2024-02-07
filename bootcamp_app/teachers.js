const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort = process.argv[2];

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON assistance_requests.teacher_id = teachers.id
JOIN students ON assistance_requests.student_id = students.id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teachers.name;
`, [cohort])
.then(teachers => {
  teachers.rows.forEach(teacher => {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  });
})
.catch(err => console.error('query error', err.stack));
