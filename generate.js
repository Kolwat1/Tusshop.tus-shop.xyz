const gameEl = document.getElementById('game');
const devicesEl = document.getElementById('devices');
const durationEl = document.getElementById('duration');
const estimationEl = document.getElementById('estimation');
const resultEl = document.getElementById('result');

function updateEstimation() {
  const price = parseInt(gameEl.selectedOptions[0].dataset.price);
  const devices = parseInt(devicesEl.value) || 1;
  const duration = parseInt(durationEl.value);
  estimationEl.value = price * devices * duration;
}

gameEl.addEventListener('change', updateEstimation);
devicesEl.addEventListener('input', updateEstimation);
durationEl.addEventListener('change', updateEstimation);
updateEstimation();

document.getElementById('genForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const userId = localStorage.getItem('userId');
  const game = gameEl.value;
  const devices = devicesEl.value;
  const duration = durationEl.value;
  const price = gameEl.selectedOptions[0].dataset.price;
  // เรียก backend
  const res = await fetch('http://localhost:3000/api/keys/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, game, devices, duration, price })
  });
  const data = await res.json();
  if (data.success) {
    resultEl.innerHTML = `<span style="color:green">สร้างคีย์สำเร็จ: ${data.key}<br>ยอดเงินคงเหลือ: ${data.balance}</span>`;
  } else {
    resultEl.innerHTML = `<span style="color:red">ผิดพลาด: ${data.message}</span>`;
  }
});
