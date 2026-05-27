const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

for (let i = 0; i < students.length; i++) {
    const s = students[i];
    s.avg = parseFloat((s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3).toFixed(2));
    
    if (s.avg >= 8.0) s.rank = "Giỏi";
    else if (s.avg >= 6.5) s.rank = "Khá";
    else if (s.avg >= 5.0) s.rank = "Trung bình";
    else s.rank = "Yếu";
}

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
for (let i = 0; i < students.length; i++) {
    const s = students[i];
    const stt = String(i + 1).padEnd(3);
    const name = s.name.padEnd(6);
    const avg = String(s.avg).padEnd(4);
    const rank = s.rank.padEnd(11);
    console.log(`| ${stt} | ${name} | ${avg} | ${rank} |`);
}

// 3. Đếm số lượng mỗi xếp loại
const rankCounts = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
let maxStudent = students[0];
let minStudent = students[0];
let sumMath = 0, sumPhys = 0, sumCS = 0;
let sumMaleAvg = 0, countMale = 0;
let sumFemaleAvg = 0, countFemale = 0;

for (let i = 0; i < students.length; i++) {
    const s = students[i];
    rankCounts[s.rank]++;

    if (s.avg > maxStudent.avg) maxStudent = s;
    if (s.avg < minStudent.avg) minStudent = s;

    sumMath += s.math;
    sumPhys += s.physics;
    sumCS += s.cs;

    if (s.gender === "M") {
        sumMaleAvg += s.avg;
        countMale++;
    } else {
        sumFemaleAvg += s.avg;
        countFemale++;
    }
}

console.log("\n--- THỐNG KÊ ---");
console.log("Số lượng xếp loại:", rankCounts);
console.log(`SV cao điểm nhất: ${maxStudent.name} (${maxStudent.avg})`);
console.log(`SV thấp điểm nhất: ${minStudent.name} (${minStudent.avg})`);
console.log(`Điểm TB môn - Toán: ${(sumMath / students.length).toFixed(1)}, Lý: ${(sumPhys / students.length).toFixed(1)}, CS: ${(sumCS / students.length).toFixed(1)}`);
console.log(`Điểm TB theo giới tính - Nam: ${(sumMaleAvg / countMale).toFixed(1)}, Nữ: ${(sumFemaleAvg / countFemale).toFixed(1)}`);