export const rooms = [
  { _id: 'r1', number: 'A-101', floor: 1, capacity: 3, occupied: 3, status: 'Occupied' },
  { _id: 'r2', number: 'A-102', floor: 1, capacity: 3, occupied: 2, status: 'Available' },
  { _id: 'r3', number: 'A-103', floor: 1, capacity: 2, occupied: 0, status: 'Maintenance' },
  { _id: 'r4', number: 'B-201', floor: 2, capacity: 4, occupied: 4, status: 'Occupied' },
  { _id: 'r5', number: 'B-202', floor: 2, capacity: 4, occupied: 1, status: 'Available' },
  { _id: 'r6', number: 'B-203', floor: 2, capacity: 2, occupied: 2, status: 'Occupied' },
  { _id: 'r7', number: 'C-301', floor: 3, capacity: 3, occupied: 0, status: 'Available' },
  { _id: 'r8', number: 'C-302', floor: 3, capacity: 2, occupied: 1, status: 'Available' },
];
export const complaints = [
  { _id: 'c1', student: 'Rahul Patel', type: 'Plumbing', room: 'A-101', date: '2026-10-05', status: 'Pending' },
  { _id: 'c2', student: 'Aman Shah', type: 'Electrical', room: 'B-201', date: '2026-10-04', status: 'In Progress' },
  { _id: 'c3', student: 'Karan Mehta', type: 'Wi-Fi', room: 'B-203', date: '2026-10-02', status: 'Resolved' },
  { _id: 'c4', student: 'Dev Joshi', type: 'Cleaning', room: 'A-102', date: '2026-10-01', status: 'Pending' },
  { _id: 'c5', student: 'Neel Desai', type: 'Furniture', room: 'C-302', date: '2026-09-29', status: 'In Progress' },
  { _id: 'c6', student: 'Yash Trivedi', type: 'Mess Food', room: 'B-202', date: '2026-09-27', status: 'Resolved' },
];
export const notices = [
  { _id: 'n1', title: 'Water supply maintenance', description: 'Water supply will be off on Sunday from 10 AM to 2 PM for tank cleaning. Please store water in advance.', date: '2026-10-08', priority: 'High' },
  { _id: 'n2', title: 'Mess timing change', description: 'From Monday, dinner will be served between 7:30 PM and 9:30 PM instead of 7:00 PM to 9:00 PM.', date: '2026-10-06', priority: 'Medium' },
  { _id: 'n3', title: 'Diwali vacation', description: 'The hostel will remain open during Diwali. Students going home must inform the warden office by 15 October.', date: '2026-10-03', priority: 'Medium' },
  { _id: 'n4', title: 'Common room renovation', description: 'The ground floor common room gets new seating and a projector. Expected completion in two weeks.', date: '2026-09-30', priority: 'Low' },
];
export const visitors = [
  { _id: 'v1', name: 'Mahesh Patel', visiting: 'Rahul Patel', date: '2026-10-07' },
  { _id: 'v2', name: 'Sunita Shah', visiting: 'Aman Shah', date: '2026-10-07' },
  { _id: 'v3', name: 'Rakesh Mehta', visiting: 'Karan Mehta', date: '2026-10-06' },
  { _id: 'v4', name: 'Jyoti Joshi', visiting: 'Dev Joshi', date: '2026-10-05' },
];
export const profile = {
  name: 'Aarav Sharma', role: 'Student', email: 'aarav.sharma@example.com', phone: '+91 98765 43210',
  room: 'A-102', course: 'B.Tech Computer Engineering', year: '3rd Year', guardian: 'Rajesh Sharma',
  guardianPhone: '+91 98250 12345', joined: '2024-07-15', address: 'Vallabh Vidyanagar, Anand, Gujarat',
};
