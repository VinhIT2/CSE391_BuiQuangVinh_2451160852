function startGame() {
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    const maxAttempts = 7;
    const guessedNumbers = [];

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        let input = prompt(`[Lượt ${attempt}/${maxAttempts}] Nhập một số từ 1 đến 100:`);
        
        if (input === null) {
            alert("Bạn đã thoát game.");
            return;
        }

        let guess = parseInt(input.trim(), 10);

        if (Number.isNaN(guess) || guess < 1 || guess > 100) {
            alert("Lỗi: Vui lòng chỉ nhập số hợp lệ từ 1 đến 100.");
            attempt--; 
            continue;
        }

        if (guessedNumbers.includes(guess)) {
            alert("Bạn đã đoán số này rồi! Thử số khác.");
            attempt--;
            continue;
        }

        guessedNumbers.push(guess);

        if (guess === targetNumber) {
            alert(`Đúng rồi! Bạn đoán đúng sau ${attempt} lần!`);
            return;
        } else if (guess > targetNumber) {
            alert("Thấp hơn");
        } else {
            alert("Cao hơn");
        }
    }

    alert(`Bạn đã thua! Hết lượt đoán. Đáp án đúng là: ${targetNumber}`);
}

startGame();