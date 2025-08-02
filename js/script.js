const startDate = new Date('2024-09-02T16:15:00');
const millisecondsElement = document.getElementById("milliseconds");
const yearsBox = document.getElementById("yearsBox");
const monthsBox = document.getElementById("monthsBox");
const daysBox = document.getElementById("daysBox");
const totalDaysBox = document.getElementById("totalDaysBox");
const totalHoursBox = document.getElementById("totalHoursBox");
const totalMinutesBox = document.getElementById("totalMinutesBox");
const totalSecondsBox = document.getElementById("totalSecondsBox");

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  // Cálculo para Anos, Meses e Dias
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  if (seconds < 0) {
    minutes--;
    seconds += 60;
  }
  if (minutes < 0) {
    hours--;
    minutes += 60;
  }
  if (hours < 0) {
    days--;
    hours += 24;
  }
  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Cálculo para contagem total de dias, horas, minutos e segundos
  const totalSeconds = Math.floor(diff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  // Atualiza as caixas com a contagem total, agora com formatação
  millisecondsElement.textContent = diff.toLocaleString('pt-BR');
  yearsBox.textContent = `${years} ${years === 1 ? 'ano' : 'anos'}`;
  monthsBox.textContent = `${months} ${months === 1 ? 'mês' : 'meses'}`;
  daysBox.textContent = `${days} ${days === 1 ? 'dia' : 'dias'}`;
  
  // As linhas abaixo foram alteradas para usar .toLocaleString()
  totalDaysBox.textContent = `${totalDays.toLocaleString('pt-BR')} ${totalDays === 1 ? 'dia' : 'dias'}`;
  totalHoursBox.textContent = `${totalHours.toLocaleString('pt-BR')} horas`;
  totalMinutesBox.textContent = `${totalMinutes.toLocaleString('pt-BR')} minutos`;
  totalSecondsBox.textContent = `${totalSeconds.toLocaleString('pt-BR')} segundos`;
}

setInterval(updateTimer, 1);

// Corações subindo (mantido como está)
const heartContainer = document.getElementById("heart-container");
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 90 + "%";
  heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
  heartContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}, 400);

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-audio');
  
  // Tenta dar play no áudio
  function playAudio() {
    audio.volume = 0.5; // Ajuste o volume se desejar (0.0 a 1.0)
    audio.play().catch(error => {
      // Se o autoplay for bloqueado, mostra um erro no console
      console.log('Autoplay bloqueado pelo navegador. Tente interagir com a página.');
    });
  }

  // Tenta tocar o áudio assim que a página for carregada
  playAudio();
  
  // Adiciona um evento para tentar tocar o áudio em qualquer clique na página
  document.body.addEventListener('click', () => {
    playAudio();
  }, { once: true }); // O { once: true } garante que o evento será executado apenas uma vez
});