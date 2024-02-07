SELECT assignments.id AS id, assignments.id AS name, assignments.chapter AS chapter, COUNT(assistance_requests.*) AS total_requests
FROM assistance_requests
JOIN assignments ON assignments.id = assignment_id
GROUP BY assignments.id
ORDER BY total_requests DESC;